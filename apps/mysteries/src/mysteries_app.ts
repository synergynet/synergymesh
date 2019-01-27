import * as $ from 'jquery';
import {TextItem} from '../../../common/src/items/text_item';
import {NetworkFlickManager} from '../../../common/src/listeners/network_flick_manager';
import {TouchManager} from '../../../common/src/listeners/touch_manager';
import {SynergyMeshApp} from '../../../common/src/synergymesh_app';
import {Networking} from '../../../common/src/utils/networking';
import {Random} from '../../../common/src/utils/random';
import {Transformations} from '../../../common/src/utils/transformations';

/**
 * Interface for objects representing the imported mysteries JSON.
 */
export interface IMystery {

	/**
	 * The titles to use in the mystery.
	 */
	titles: string[];

	/**
	 * The clues to use in the mystery.
	 */
	clues: string[];

	/**
	 * The images to use in the mystery.
	 */
	images: IMysteryImage[];

}

/**
 * Interface for objects representing the various content items in a mystery task.
 */
export interface IMysteryContent {

	/**
	 * The unique ID of the content item.
	 */
	id: string;

	/**
	 * The type of the content item.
	 */
	type: string;

	/**
	 * The content.
	 */
	content: string;

	/**
	 * Flag indicating whether the content should be shown on the first connected device if networked.
	 */
	default: boolean;

	/**
	 * The width of the content item (if required).
	 */
	width?: number;

	/**
	 * The height of the content item (if required).
	 */
	height?: number;

}

/**
 * Interface for objects representing the various content items in a mystery task.
 */
export interface IMysteryImage {

	/**
	 * The name of the image file.
	 */
	fileName: string;

	/**
	 * The width of the image.
	 */
	width: number;

	/**
	 * The height of the image.
	 */
	height: number;

}

 /**
 * Mysteries student app.
 */
export class MysteriesApp extends SynergyMeshApp {
	
	
	//// Private Constants. ////
	
	/** The directory holding the files defining content for the app. */
	private static CONTENTS_DIR_NAME: string = 'contents/';
	
	/** The networking events for this app. */
	private static EVENTS = {
		
		/** The networking event for requesting content. */
		REQUEST_CONTENT: 'request_content',
		
		/** The networking event for sending content. */
		CONTENT_INFORMATION: 'content_information'
		
	}
	
	/** The maximum width of the clues. */
	private static MAX_WIDTH_CLUE: number = 275;
	
	/** The maximum width of the clues. */
	private static MAX_WIDTH_TITLE: number = 500
	
	/** The networking message entries for this app. */
	private static MESSAGES = {
		
		/** The id of a client requesting a content list. */
		REQUESTER: 'requester',
		
		/** The array of content items on the client. */
		CONTENT_LIST: 'content_list',
		
		/** The id of the content item being transferred. */
		CONTENT_NAME: 'content_name'
		
	}
	
	
	//// Private Global Variables. ////
	
	/** Array for holding the list of content currently in the app. */
	private currentContent: string[] = [];
	
	/** Flag for checking if the app has already checked for partners. */
	private firstConnect: boolean = true;
	
	/** Object for storing all content definitions. */
	private content: IMysteryContent[] = [];
	
	
	//// Protected Methods. ////

	/**
	 * Add the contents specific to this app.
	 */
	protected addContents() {
		
		// Get self.
		let self = this;
		
		// Establish app details.
		this.appName = 'Mysteries';
		
		// Get content from the selection.
		let targetContentSelector = <HTMLInputElement>document.getElementById('mystery_selector');
		let targetContent = this.testMode ? 'charlie' : targetContentSelector.value;
		
		// Get mystery mode from the selection.
		let mysteryModeSelector = <HTMLInputElement>document.getElementById('mystery_mode');
		let mysteryMode = this.testMode ? 'standalone' : mysteryModeSelector.value;
		
		// Store select from local storage.
		localStorage['mystery_selector'] = targetContent;
		localStorage['mystery_mode'] = mysteryMode;
		
		// Get the contents.
		let webDir = this.testMode ? '' : 'web/';
		$.getJSON(this.rootPath + webDir + MysteriesApp.CONTENTS_DIR_NAME + targetContent + '.json', function(json: IMystery) {

			// Ensure there is an appropriate number of titles.
			if (mysteryMode == 'networked') {
				if (json.titles.length < 2) {
					json.titles.push(json.titles[0]);
				}
			} else {
				if (json.titles.length > 1) {
					json.titles = [json.titles[0]];
				}
			}
			
			// Store title content.
			for (let contentKey in json.titles) {
				let contentItem = <IMysteryContent>{
					content: json.titles[contentKey],
					default: +contentKey % 2 == 0,
					id: 'title' + contentKey,
					type: 'title'
				};
				self.content.push(contentItem);
			}	

			// Store clue contents.
			for (let contentKey in json.clues) {
				let contentItem = <IMysteryContent>{
					content: json.clues[contentKey],
					default: +contentKey % 2 == 0,
					id: 'clue' + contentKey,
					type: 'clue'
				};
				self.content.push(contentItem);
			}	

			// Store image contents
			for (let contentKey in json.images) {
				let contentItem = <IMysteryContent>{
					content: json.images[contentKey].fileName,
					default: +contentKey % 2 == 0,
					height: json.images[contentKey].height,
					id: 'image' + contentKey,
					type: 'image',
					width: json.images[contentKey].width
				};
				self.content.push(contentItem);
			}			
				
			// Announce presence to server if networked and enable teacher controls.
			if (mysteryMode == 'networked') {
				self.establishNetworking(self.onClientListUpdate.bind(self));
				self.addTeacherControlListeners();
			}
			
			// Check whether to run standalone or networked.
			if (mysteryMode == 'networked') {
				
				// Establish function to be called when sending network flicked elements.
				let onSend = function(objectToSend: JSON, ele: d3.Selection<any>) {
					
					// Get name of sent content.
					let name = ele.attr('name');
					
					// Remove name from current content.
					self.currentContent.splice(self.currentContent.indexOf(name), 1);
					
					// Include name in transmitted message.
					objectToSend[MysteriesApp.MESSAGES.CONTENT_NAME] = name;
					
					// Return the modfied object to send.
					return objectToSend;
				};		
				
				// Establish function to be called when receiving network flicked elements.
				let onReceive = 
					function (objectReceived: JSON, ele: d3.Selection<any>, touchManager: TouchManager, networkflickManager: NetworkFlickManager) {
					
					//  Get if item text or an image.
					let isText = document.getElementById(ele.attr('id')).classList.contains('is-text');			
					
					// Add scale limits to newly arrived items.
					if (isText) {
						touchManager.applyScaleLimits(0.5, 2);				
					} else {
						touchManager.applyScaleLimits(0.3, 1.5);
					}
					
					// Add item name to current content list.
					self.currentContent.push(objectReceived[MysteriesApp.MESSAGES.CONTENT_NAME]);
						
				};	
				
				// Establish network flick listener.
				NetworkFlickManager.registerForNetworkFlick(self, onReceive, onSend); 
				
				
				// Add listener for content list request.
				Networking.listenForMessage(MysteriesApp.EVENTS.REQUEST_CONTENT, function(data) {
					
					// Get client making the request.
					let requester = '/#' + data[MysteriesApp.MESSAGES.REQUESTER];		
					
					// Send the current content list.						
					let messageToSend = <JSON>{};
					messageToSend[MysteriesApp.MESSAGES.CONTENT_LIST] = self.currentContent;
					Networking.sendMessageToSpecificClient(MysteriesApp.EVENTS.CONTENT_INFORMATION, requester, messageToSend);
					
				});
				
				// Add listener for content list.
				Networking.listenForMessage(MysteriesApp.EVENTS.CONTENT_INFORMATION, function(data) {
					
					// Get content not on the other client.
					let otherContent = <string[]>data[MysteriesApp.MESSAGES.CONTENT_LIST];
					for (let contentItem of self.content) {
						let isPresent = false;
						for (let otherContentId of otherContent) {
							if (contentItem.id == otherContentId) {
								isPresent = true;
								break;
							}
						}
						if (!isPresent) {
							self.currentContent.push(contentItem.id);
						}
					}
					
					// Generate the content.
					for (let contentId of self.currentContent) {
						self.buildItem(contentId);					
					}
					
				});
				
			} else {
				
				// Loop through and add all contents.
				for (let contentItem of self.content) {
					self.buildItem(contentItem.id);
				}
				
			}
				
		});
		
		// Signal app is ready.
		this.ready();
						
	}
	
	/**
	 * Function to be called when the page is first loaded.
	 */
	protected preStart() {
			
		// Apply selects from local storage.
		if (localStorage['mystery_selector'] != null && !this.testMode) {
			let mysterySelector = <HTMLInputElement>(document.getElementById('mystery_selector'));
			mysterySelector.value = localStorage['mystery_selector'];
		}
		if (localStorage['mystery_mode'] != null&& !this.testMode) {
			let mysteryModeSelector = <HTMLInputElement>(document.getElementById('mystery_mode'));
			mysteryModeSelector.value = localStorage['mystery_mode'];
		}
		
	}
	
	
	//// Private Methods. ////
	
	/**
	 * Method for building an item from a content definition.
	 * 
	 * @param {string} id The id of the definition.
	 */
	private buildItem (id: string): void {	
		
		// Get definition.
		let contentItem: IMysteryContent = null;
		for (let content of this.content) {
			if (id == content.id) {
				contentItem = content;
				break;
			}
		}
		
		// Check object type.
		switch (contentItem.type) {
			case 'clue': {
			
				// Add a clue.
				this.addClue(id, contentItem.content);
				break;
			
			} 
			case 'image': {
			
				// Add an image.
				this.addImage(id, contentItem.content, contentItem.width, contentItem.height);
				break;
			
			}
			case 'title': {
			
				// Add a title.
				this.addTitle(contentItem['content']);
				break;
			
			}
		}
				 
	}
	
	/**
	 * Function to be called when the client list is updated to determine the content.
	 */
	private onClientListUpdate() {
		
		// Check that this is the first client update.
		if (this.firstConnect) {
			
			// Check number of partners.
			if (Networking.clients[this.role][this.appName].length < 2) {
			
				// Establish default content.
				for (let contentItem of this.content) {
					if (contentItem.default) {
						this.buildItem(contentItem.id);			
						this.currentContent.push(contentItem.id);	
					}	
				}
				
			} else {
			
				// Get partner.
				for (let client of Networking.clients[this.role][this.appName]) {
					if (client != Networking.clientId) {
						
						// Request content list from partner.
						let messageToSend = <JSON>{};
						messageToSend[MysteriesApp.MESSAGES.REQUESTER] = Networking.clientId;
						Networking.sendMessageToSpecificClient(MysteriesApp.EVENTS.REQUEST_CONTENT, client, messageToSend);
						break;
						
					}
				}
				
			}
		
			// Switch flag to stop content being initialised again.
			this.firstConnect = false;
			
		}
		
	}
	
	/**
	 * Add a text item at a random rotation and scale in the centre of the screen.
	 * 
	 * @param {string} id The id to give the element.
	 * @param {string} text The text to show in the clue.
	 */
	private addClue(id: string, text: string): void {
		
		// Create item.
		let textItem = new TextItem(this.svg, text, MysteriesApp.MAX_WIDTH_CLUE, id, 'clue-bg', 'clue-text');
		textItem.asItem().attr('name', id);
		
		// Randomly place.
		Transformations.setTranslation(textItem.asItem(), this.vizWidth/2, this.vizHeight/2);
		Transformations.setScale(textItem.asItem(), Random.getRandomArbitrary(1.25, 1.75));
		Transformations.setRotation(textItem.asItem(), Random.getRandomInt(-45, 45));
		
		// Tag with class for identification as a text item.
		document.getElementById(id).classList.add('is-text');
				
		// Add behaviour.
		let tm = new TouchManager(textItem.asItem());
		tm.applyScaleLimits(0.5, 2);
		new NetworkFlickManager(textItem.asItem(), this, tm);
		
	}
	
	/**
	 * Add an image item at a random rotation and scale in the centre of the screen.
	 * 
	 * @param {string} id The id to give the element.
	 * @param {string} imageURL The location of the image file.
	 * @param {number} width The width of the image.
	 * @param {number} height The height of the image.
	 */
	private addImage(id: string, imageUrl: string, width: number, height: number): void {
		
		// Create root node.
		let rootNode = this.svg.append('g');
		rootNode.attr('id', id);
		rootNode.attr('name', id);
		
		// Add Image
		let imageEle = rootNode.append('image');   
		let webDir = this.testMode ? '' : 'web/';
		imageEle.attr('xlink:href', this.rootPath + webDir + 'images/' + imageUrl);
		imageEle.attr('width', width);
		imageEle.attr('height', height);
		Transformations.setTranslation(imageEle, -width/2, -height/2);;
		
		// Randomly place.
		Transformations.setTranslationX(rootNode, this.vizWidth/2);
		Transformations.setTranslationY(rootNode, this.vizHeight/2);
		Transformations.setScale(rootNode, Random.getRandomArbitrary(0.5, 1));
		Transformations.setRotation(rootNode, Random.getRandomInt(-45, 45))
				
		// Add behaviour.
		let tm = new TouchManager(rootNode);
		tm.applyScaleLimits(0.3, 1.5);
		new NetworkFlickManager(rootNode, this, tm);
		
	}
	
	/**
	 * Add a title item at top of the screen.
	 * 
	 * @param {string} text The text to show in the title.
	 */
	private addTitle(text: string): void {
		
		// Create item.
		let textItem = new TextItem(this.svg, text, MysteriesApp.MAX_WIDTH_TITLE, 'title', 'title-bg', 'title-text');
		
		// Place at the top.
		Transformations.setTranslation(textItem.asItem(), this.vizWidth/2, (textItem.getHeight() * 2) + 5);
		Transformations.setScale(textItem.asItem(), 1.2);

		
	}
	
}
