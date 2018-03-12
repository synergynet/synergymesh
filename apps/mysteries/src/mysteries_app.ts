import {Networking} from 'common/src/utils/networking';
import {NetworkFlickManager} from 'common/src/listeners/network_flick_manager';
import {QueryStrings} from 'common/src/utils/query_strings';
import {Random} from 'common/src/utils/random';
import {SynergyMeshApp} from 'common/src/synergymesh_app';
import {TextItem} from 'common/src/items/text_item';
import {TouchManager} from 'common/src/listeners/touch_manager';
import {Transformations} from 'common/src/utils/transformations';
  
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
	private content: JSON;
	
	
	//// Protected Methods. ////

	/**
	 * Add the contents specific to this app.
	 */
	protected addContents() {
		
		// Get self.
		let self = this;
		
		// Establish app details.
		this.appName = 'Mysteries';
		
		// Get the content target and mystery type from the query string.
		let queryStrings = QueryStrings.getQueryStrings();
		let targetContent = 'dinner_disaster';
		let mode = 'standalone';
		if ('content' in queryStrings) {
			targetContent = queryStrings['content'];
		}
		if ('mode' in queryStrings) {
			mode = queryStrings['mode'];
		}
		
		// Get the contents.
		$.getJSON(this.rootPath + MysteriesApp.CONTENTS_DIR_NAME + targetContent + '.json', function(json) {
			
			// Store content.
			self.content = json;
			
			// Check whether to run standalone or networked.
			if (mode == 'networked') {	
				
				// Announce presence to server.
				self.establishNetworking(self.onClientListUpdate.bind(self));
				self.addTeacherControlListeners();
				
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
					for (let contentKey in self.content) {
						if (otherContent.indexOf(contentKey) == -1) {
							self.currentContent.push(contentKey);
						}
					}
					
					// Generate the content.
					for (let contentId of self.currentContent) {
						self.buildItem(contentId);					
					}
					
				});
				
			} else {
				
				// Loop through and add all contents.
				for (let contentKey of Object.keys(self.content)) {
					self.buildItem(contentKey);
				}
				
			}
				
			// Get the title and add it.
			for (let definitionKey in self.content) {
				let def = self.content[definitionKey];
				if (def['content_type'] == 'title') {
					let textItem = new TextItem(self.svg, def['content'], MysteriesApp.MAX_WIDTH_TITLE, 'title', 'title-bg', 'title-text');
					Transformations.setTranslation(textItem.asItem(), self.vizWidth/2, (textItem.getHeight() * 2) + 5);
					Transformations.setScale(textItem.asItem(), 1.2);
					break;
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
		
		// Check if in networked mode.
		let networkedMode = false;
		let queryStrings = QueryStrings.getQueryStrings();
		if ('mode' in queryStrings) {
			if (queryStrings['mode'] == 'networked') {
				networkedMode = true;
			}
		}
		
		// Show session input if in networked mode else remove it.
		let displaycontrols = document.getElementById('session_controls');
		if (networkedMode) {
			displaycontrols.style.display = 'block';
		} else {
			displaycontrols.parentNode.removeChild(displaycontrols);
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
		let definition = this.content[id];
		
		// Check object type.
		switch (definition['content_type']) {
			case 'clue': {
			
				// Add a clue.
				this.addClue(id, definition['content']);
				break;
			
			} 
			case 'image': {
			
				// Add an image.
				this.addImage(id, definition['content'], definition['width'], definition['height']);
				break;
			
			}
		}
				 
	}
	
	/**
	 * Function to be called when the client list is update to determine the content.
	 */
	private onClientListUpdate() {
		
		// Check that this the first client update.
		if (this.firstConnect) {
			
			// Check number of partners.
			if (Networking.clients[this.role][this.appName].length < 2) {
			
				// Establish default content.
				for (let contentKey in this.content) {
					if (this.content[contentKey]['default']) {
						this.buildItem(contentKey);			
						this.currentContent.push(contentKey);	
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
		imageEle.attr('xlink:href', this.rootPath + 'images/' + imageUrl);
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
	
}
