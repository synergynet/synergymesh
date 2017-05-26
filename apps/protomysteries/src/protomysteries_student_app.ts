import {SynergyMeshApp} from 'common/src/synergymesh_app';
import {DragListener} from 'common/src/listeners/drag_listener';
import {Random} from 'common/src/utils/random';
import {TextItem} from 'common/src/items/text_item';
import {Transformations} from 'common/src/utils/transformations';
  
 /**
 * Protomysteries student app.
 */
export class ProtomysteriesStudentApp extends SynergyMeshApp {

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
		
		// Add title.
		let textItem = new TextItem(this.svg, 'Can you work out what Mike should have to eat?', 500, 30, 'title', 'title-bg', 'title-text');
		Transformations.setTranslation(textItem.asItem(), this.vizWidth/2, 300);

		// TODO Hard coded text clues and images + header.
		
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
		this.addImage('image1', '../burger.png');
		this.addImage('image2', '../fries.png');
		this.addImage('image3', '../grace.png');
		this.addImage('image4', '../jack.png');
		this.addImage('image5', '../mike.png');
		this.addImage('image6', '../pizza.png');
		this.addImage('image7', '../ruby.png');
		this.addImage('image8', '../salad.png');
		this.addImage('image9', '../tanya.png');
		this.addImage('image10', '../yogurt.png');
				
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
	 */
	private addImage(id: string, imageUrl: string): void {
		let imageEle = this.svg.append('image');   
		imageEle.attr('xlink:href', imageUrl);
		Transformations.setTranslationX(imageEle, this.vizWidth/2);
		Transformations.setTranslationY(imageEle, this.vizHeight/2);
		Transformations.setScale(imageEle, Random.getRandomArbitrary(0.5, 1));
		Transformations.setRotation(imageEle, Random.getRandomInt(-45, 45));
		imageEle.attr('id', id);
		new DragListener(imageEle);
	}
	
}
