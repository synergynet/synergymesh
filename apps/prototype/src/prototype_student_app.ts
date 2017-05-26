import {SynergyMeshApp} from 'common/src/synergymesh_app';
import {DragListener} from 'common/src/listeners/drag_listener';
import {RotateTranslateScaleListener} from 'common/src/listeners/rotate_translate_scale_listener';
import {TextItem} from 'common/src/items/text_item';
import {Transformations} from 'common/src/utils/transformations';
  
 /**
 * App for testing out new SynergyMesh features.
 */
export class PrototypeStudentApp extends SynergyMeshApp {
		
	/** Circles' radius. */
	private static RADIUS: number = 50;
		
	/** Rectangles' width. */
	private static RECTANGLE_WIDTH: number = 100;
		
	/** Rectangles' height. */
	private static RECTANGLE_HEIGHT: number = 50;

	/**
	 * Initialise a PrototypeStudentApp object.
	 */
	public constructor() {
		
		// Establish the environment.
		super();
		
	}
	
	/**
	 * Add the contents specific to this app.
	 */
	protected addContents() {
		
		// Add circle one. 
		let circleOne = this.svg.append('circle');   
		circleOne.attr('r', PrototypeStudentApp.RADIUS);                   
		Transformations.setTranslationX(circleOne, this.vizWidth/4);
		Transformations.setTranslationY(circleOne, this.vizHeight/2);
		circleOne.attr('id', 'circle-one');
		new DragListener(circleOne);
		
		// Add circle two. 
		let circleTwo = this.svg.append('circle');    
		circleTwo.attr('r', PrototypeStudentApp.RADIUS);
		Transformations.setTranslationX(circleTwo, (this.vizWidth/4) * 3);
		Transformations.setTranslationY(circleTwo, this.vizHeight/2);
		circleTwo.attr('id', 'circle-two');
		new DragListener(circleTwo);		
		
		// Add rectangle one. 
		let rectangleOne = this.svg.append('rect');
		rectangleOne.attr('width', PrototypeStudentApp.RECTANGLE_WIDTH);    
		rectangleOne.attr('height', PrototypeStudentApp.RECTANGLE_HEIGHT);                           
		Transformations.setTranslationX(rectangleOne, (this.vizWidth/2) - (PrototypeStudentApp.RECTANGLE_WIDTH/2));
		Transformations.setTranslationY(rectangleOne, (this.vizHeight/4) - (PrototypeStudentApp.RECTANGLE_HEIGHT/2));
		rectangleOne.attr('id', 'rectangle-one');
		new RotateTranslateScaleListener(rectangleOne);
		
		// Add rectangle one. 
		let rectangleTwo = this.svg.append('rect');		
		rectangleTwo.attr('width', PrototypeStudentApp.RECTANGLE_WIDTH);    
		rectangleTwo.attr('height', PrototypeStudentApp.RECTANGLE_HEIGHT);          
		Transformations.setTranslationX(rectangleTwo, (this.vizWidth/2) - (PrototypeStudentApp.RECTANGLE_WIDTH/2));
		Transformations.setTranslationY(rectangleTwo, ((this.vizHeight/4) * 3) - (PrototypeStudentApp.RECTANGLE_HEIGHT/2));
		rectangleTwo.attr('id', 'rectangle-two');    
		new RotateTranslateScaleListener(rectangleTwo);
		
		// Create text item.
		let textItem =
			new TextItem(this.svg, '<b>Hello World!</b> This is a really long string!', 100, 80, 'demo-text', 'demo-text-bg', 'demo-text-text');
		Transformations.setTranslation(textItem.asItem(), this.vizWidth/2, this.vizHeight/2);
		Transformations.setScale(textItem.asItem(), 2);
		Transformations.setRotation(textItem.asItem(), 45);
		new DragListener(textItem.asItem(), true);		
		
	}
	
}
