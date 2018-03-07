import {NetworkFlickManager} from 'common/src/listeners/network_flick_manager';
import {Random} from 'common/src/utils/random';
import {SynergyMeshApp} from 'common/src/synergymesh_app';
import {TextItem} from 'common/src/items/text_item';
import {TouchManager} from 'common/src/listeners/touch_manager';
import {Transformations} from 'common/src/utils/transformations';
  
 /**
 * Protomysteries student app.
 */
export class ProtomysteriesStudentApp extends SynergyMeshApp {

	/**
	 * Add the contents specific to this app.
	 */
	protected addContents() {
		
		// Establish app details.
		this.appName = 'Proto Mysteries';
		
		// Announce presence to server.
		this.establishNetworking();
		this.addTeacherControlListeners();
		
		// Establish network flick listener.
		NetworkFlickManager.registerForNetworkFlick();
		
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
		
		// Signal app is ready.
		this.ready();
						
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
		
		// Create item.
		let textItem = new TextItem(this.svg, text, width, height, id, className + '-bg', className + '-text');
		
		// Randomly place.
		Transformations.setTranslation(textItem.asItem(), this.vizWidth/2, this.vizHeight/2);
		Transformations.setScale(textItem.asItem(), Random.getRandomArbitrary(1.25, 1.75));
		Transformations.setRotation(textItem.asItem(), Random.getRandomInt(-45, 45));
				
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
