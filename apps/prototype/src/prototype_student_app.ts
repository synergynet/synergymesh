import {SynergyMeshApp} from 'common/src/synergymesh_app';
import {DragListener} from 'common/src/listeners/drag_listener';
import {RotateTranslateScaleListener} from 'common/src/listeners/rotate_translate_scale_listener';
  
 /**
 * Abstract class which defines what all SynergyMesh apps should do.
 * (e.g. load content, connect to other instances, etc.)
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
		circleOne.attr('cx', this.vizWidth/4);
		circleOne.attr('cy', this.vizHeight/2);
		circleOne.attr('id', 'circle-one');
		new DragListener(circleOne);
		
		// Add circle two. 
		let circleTwo = this.svg.append('circle');    
		circleTwo.attr('r', PrototypeStudentApp.RADIUS);                          
		circleTwo.attr('cx', (this.vizWidth/4) * 3);
		circleTwo.attr('cy', this.vizHeight/2);
		circleTwo.attr('id', 'circle-two');
		new DragListener(circleTwo);		
		
		// Add rectangle one. 
		let rectangleOne = this.svg.append('rect');
		rectangleOne.attr('width', PrototypeStudentApp.RECTANGLE_WIDTH);    
		rectangleOne.attr('height', PrototypeStudentApp.RECTANGLE_HEIGHT);                           
		rectangleOne.attr('x', (this.vizWidth/2) - (PrototypeStudentApp.RECTANGLE_WIDTH/2));
		rectangleOne.attr('y', (this.vizHeight/4) - (PrototypeStudentApp.RECTANGLE_HEIGHT/2));
		rectangleOne.attr('id', 'rectangle-one');
		new RotateTranslateScaleListener(rectangleOne);
		
		// Add rectangle one. 
		let rectangleTwo = this.svg.append('rect');		
		rectangleTwo.attr('width', PrototypeStudentApp.RECTANGLE_WIDTH);    
		rectangleTwo.attr('height', PrototypeStudentApp.RECTANGLE_HEIGHT);          
		rectangleTwo.attr('x', (this.vizWidth/2) - (PrototypeStudentApp.RECTANGLE_WIDTH/2));
		rectangleTwo.attr('y', ((this.vizHeight/4) * 3) - (PrototypeStudentApp.RECTANGLE_HEIGHT/2));
		rectangleTwo.attr('id', 'rectangle-two');    
		new RotateTranslateScaleListener(rectangleTwo);
		
	}
	
}
