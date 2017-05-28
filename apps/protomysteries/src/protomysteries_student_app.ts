import {SynergyMeshApp} from 'common/src/synergymesh_app';
import {DragListener} from 'common/src/listeners/drag_listener';
import {Random} from 'common/src/utils/random';
import {TextItem} from 'common/src/items/text_item';
import {Transformations} from 'common/src/utils/transformations';
import {Networking} from 'common/src/utils/networking';
import {ProtomysteriesShared} from 'apps/protomysteries/src/protomysteries_shared';
  
 /**
 * Protomysteries student app.
 */
export class ProtomysteriesStudentApp extends SynergyMeshApp {
	
	/** Used to ignore duplicates of the same message. */
	private lastMessageId: number = 0; 

	/**
	 * Initialise a ProtomysteriesStudentApp object.
	 */
	public constructor() {
		
		// Establish the environment.
		super();
		
	}
	
	/**
	 * Add the contents specific to this app.
	 */
	protected addContents() {
		
		// Announce presence to server.
		ProtomysteriesShared.sendMessage('announce');
		
		// Add title.
		let textItem = new TextItem(this.svg, 'Can you work out what Mike should have to eat?', 500, 30, 'title', 'title-bg', 'title-text');
		Transformations.setTranslation(textItem.asItem(), this.vizWidth/2, 75);
		
		// Text for clues.
		let clueOneText = 'The new cook at school, Mrs Baker, has mixed up the trays with the children’s school dinners on.';
		let clueTwoText = '"YUCK!" cried Ruby, making a face at the slice of pizza in front of her. "I can\'t stand pepperoni!"';
		let clueThreeText = '"Don\'t look at me," moaned Jack. "I hate any food with cheese on it." At that, he pushed away his cheeseburger.';
		let clueFourText = '"Hey, anybody want these chicken wings?" asked Grace. "I don\'t like anything with meat in it."';
		let clueFiveText = 'Mike scooped up a spoonful of his yogurt and grumbled, "Everybody knows I\'m allergic to this stuff."';
		let clueSixText = '"Well, yogurt is the only thing I like on the menu," replied Tanya. ' + 
			'"And there\'s no way I\'m going to eat THIS!" At that, she poked her salad with a fork.';
		
		// Add clues.
		this.addClue('clue1', 'clue', clueOneText, 260, 75);
		this.addClue('clue2', 'clue', clueTwoText, 250, 75);
		this.addClue('clue3', 'clue', clueThreeText, 250, 100);
		this.addClue('clue4', 'clue', clueFourText, 275, 75);
		this.addClue('clue5', 'clue', clueFiveText, 250, 100);
		this.addClue('clue6', 'clue', clueSixText, 250, 125);

		// Add images. 
		this.addImage('image1', '../burger.png', 313, 201);
		this.addImage('image2', '../fries.png', 242, 247);
		this.addImage('image3', '../grace.png', 176, 180);
		this.addImage('image4', '../jack.png', 158, 190);
		this.addImage('image5', '../mike.png', 181, 210);
		this.addImage('image6', '../pizza.png', 232, 204);
		this.addImage('image7', '../ruby.png', 180, 200);
		this.addImage('image8', '../salad.png', 319, 207);
		this.addImage('image9', '../tanya.png', 180, 208);
		this.addImage('image10', '../yogurt.png', 260, 278);
		
		// Add freeze and unfreeze listeners.
		this.addNetworkingListeners();
						
	}
	
	/**
	 * Add a text item at a random rotation and scale in the centre of the screen.
	 * 
	 * @param {string} id The id to give the element.
	 * @param {string} className The class prefix to give the elements of the text item.
	 * @param {string} text The text to show in the clue.
	 * @param {number} width The width of the clue.
	 * @param {number} height The height of the clue.
	 */
	private addClue(id: string, className: string, text: string, width: number, height: number): void {
		let textItem = new TextItem(this.svg, text, width, height, id, className + '-bg', className + 'text');
		Transformations.setTranslation(textItem.asItem(), this.vizWidth/2, this.vizHeight/2);
		Transformations.setScale(textItem.asItem(), Random.getRandomArbitrary(1.25, 1.75));
		Transformations.setRotation(textItem.asItem(), Random.getRandomInt(-45, 45));
		new DragListener(textItem.asItem(), true);		
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
		let imageEle = this.svg.append('image');   
		imageEle.attr('xlink:href', imageUrl);
		imageEle.attr('width', width);
		imageEle.attr('height', height);
		Transformations.setTranslationX(imageEle, this.vizWidth/2);
		Transformations.setTranslationY(imageEle, this.vizHeight/2);
		Transformations.setScale(imageEle, Random.getRandomArbitrary(0.5, 1));
		Transformations.setRotation(imageEle, Random.getRandomInt(-45, 45));
		imageEle.attr('id', id);
		new DragListener(imageEle);
	}
	
	/**
	 * Add listeners for messages from the server.
	 */
	private addNetworkingListeners(): void {
		
		// Create self object for referencing elsewhere.
		let self = this;
		
		// Build hidden freeze block. 
		let freezeBlock = this.svg.append('rect');
		freezeBlock.attr('id', 'freeze-block');
		freezeBlock.attr('width', this.vizWidth);
		freezeBlock.attr('height', this.vizHeight);
		freezeBlock.style('visibility', 'hidden');
		
		// Check this browser can support Server-Sent Events.
		if (!!(<any>window).EventSource) {
			
			// Establish listener to server.
			let source = new EventSource('../server/output.php'); 
			source.addEventListener('message', function(e) {
				
				// Check message came from the same server this is hosted on.
				let host = Networking.getFullHost();
				if (e.origin == host ) {
					
					// Parse the JSON in the message.
					let data = JSON.parse(e.data); 
					
					// Check that this message hasn't been processed before.
					if (+data['id'] > self.lastMessageId) {	
					
						// TODO Tidy so this block below is a callback function in a shared createListener function.
					
						// Check the contents of the message.
						if (data['msg'] == 'freeze') {				
						
							// Show freeze block and bring it to the front.
							freezeBlock.each(function(){
								this.parentNode.appendChild(this);
							});
							freezeBlock.style('visibility', 'visible');
							
						} else if (data['msg']== 'unfreeze') {		
						
							// Hide the freeze block.	
							freezeBlock.style('visibility', 'hidden');
											
						}
						
						// Update the record of which message was last processed.
						self.lastMessageId = +data['id'];
					}
				}
			});
			
		} else {
		  	alert('Your browser does not support SynergyMesh\'s networking features.');
		}
		
	}
	
}
