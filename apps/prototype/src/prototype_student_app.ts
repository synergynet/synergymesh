import {SynergyMeshApp} from 'common/src/synergymesh_app';
import {DragListener} from 'common/src/listeners/drag_listener';
  
 /**
 * Abstract class which defines what all SynergyMesh apps should do.
 * (e.g. load content, connect to other instances, etc.)
 */
export class PrototypeStudentApp extends SynergyMeshApp {

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
		circleOne.attr('cx', this.vizWidth/4);
		circleOne.attr('cy', this.vizHeight/2);
		circleOne.attr('id', 'circle-one');
		new DragListener(circleOne);
		
		// Add circle two. 
		let circleTwo = this.svg.append('circle');                       
		circleTwo.attr('cx', (this.vizWidth/4) * 3);
		circleTwo.attr('cy', this.vizHeight/2);
		circleTwo.attr('id', 'circle-two');
		new DragListener(circleTwo);
		
	}
	
}
