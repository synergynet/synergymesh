import {Networking} from 'common/src/utils/networking';
import {NetworkFlickManager} from 'common/src/listeners/network_flick_manager';
import {Random} from 'common/src/utils/random';
import {SynergyMeshApp} from 'common/src/synergymesh_app';
import {TextItem} from 'common/src/items/text_item';
import {TouchManager} from 'common/src/listeners/touch_manager';
import {Transformations} from 'common/src/utils/transformations';
  
 /**
 * Protomysteries student app.
 */
export class ProtomysteriesApp extends SynergyMeshApp {
	
	
	//// Private Constants. ////
	
	/** The default content for the app. */
	private static CONTENTS_FILE_NAME: string = 'contents.json';
	
	/** The default content for the app. */
	private static DEFAULT_CONTENT: string[] = ['clue1', 'clue2', 'clue3', 'image1', 'image2', 'image3', 'image4', 'image5'];
	
	
	//// Private Global Variables. ////
	
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
		this.appName = 'Proto-Mysteries';
		
		// Get the contents.
		$.getJSON(this.rootPath + ProtomysteriesApp.CONTENTS_FILE_NAME, function(json) {
			
			// Store content.
			self.content = json;
			
			// Announce presence to server.
			self.establishNetworking(self.onClientListUpdate.bind(self));
			self.addTeacherControlListeners();
			
			// Establish network flick listener.
			NetworkFlickManager.registerForNetworkFlick(self, function (objectReceived: JSON, ele: d3.Selection<any>, 
				touchManager: TouchManager, networkflickManager: NetworkFlickManager) {
				
				//  Get if item text or an image.
				let isText = document.getElementById(ele.attr('id')).classList.contains('is-text');			
				
				// Add scale limits to newly arrived items.
				if (isText) {
					touchManager.applyScaleLimits(0.5, 2);				
				} else {
					touchManager.applyScaleLimits(0.3, 1.5);
				}
					
			});
			
			// Get the title and add it.
			for (let definitionKey in self.content) {
				if (self.content[definitionKey]['content_type'] == 'title') {
					self.buildItem(definitionKey);
					break;
				}
			}
			
		});
		
		// Signal app is ready.
		this.ready();
						
	}
	
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
			case 'title': {
				
				// Add title.
				let textItem = 
					new TextItem(this.svg, definition['content'], definition['width'], definition['height'], 'title', 'title-bg', 'title-text');
				Transformations.setTranslation(textItem.asItem(), this.vizWidth/2, (definition['height'] * 2) + 5);
				break;
				
			} 
			case 'clue': {
			
				// Add a clue.
				this.addClue(id, definition['content'], definition['width'], definition['height']);
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
				for (let contentId of ProtomysteriesApp.DEFAULT_CONTENT) {
					this.buildItem(contentId);					
				}
				
			} else {
			
				// TODO Request content list from partner.
				
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
	 * @param {number} width The width of the clue.
	 * @param {number} height The height of the clue.
	 */
	private addClue(id: string, text: string, width: number, height: number): void {
		
		// Create item.
		let textItem = new TextItem(this.svg, text, width, height, id, 'clue-bg', 'clue-text');
		
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
		
		// Add Image
		let imageEle = rootNode.append('image');   
		imageEle.attr('xlink:href', this.rootPath + imageUrl);
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
