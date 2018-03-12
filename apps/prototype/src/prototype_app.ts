import {SynergyMeshApp} from 'common/src/synergymesh_app';
import {TouchManager} from 'common/src/listeners/touch_manager';
import {TextItem} from 'common/src/items/text_item';
import {Transformations} from 'common/src/utils/transformations';
  
 /**
 * App for testing out new SynergyMesh features.
 */
export class PrototypeApp extends SynergyMeshApp {
		
	/** Circles' radius. */
	private static RADIUS: number = 50;
		
	/** Rectangles' width. */
	private static RECTANGLE_WIDTH: number = 100;
		
	/** Rectangles' height. */
	private static RECTANGLE_HEIGHT: number = 50;

	/**
	 * Add the contents specific to this app.
	 */
	protected addContents() {
		
		// Add circle one. 
		let circleOne = this.svg.append('circle');   
		circleOne.attr('r', PrototypeApp.RADIUS);                   
		Transformations.setTranslationX(circleOne, this.vizWidth/4);
		Transformations.setTranslationY(circleOne, this.vizHeight/2);
		circleOne.attr('id', 'circle-one');
		new TouchManager(circleOne);
		
		// Add circle two. 
		let circleTwo = this.svg.append('circle');    
		circleTwo.attr('r', PrototypeApp.RADIUS);
		Transformations.setTranslationX(circleTwo, (this.vizWidth/4) * 3);
		Transformations.setTranslationY(circleTwo, this.vizHeight/2);
		circleTwo.attr('id', 'circle-two');
		new TouchManager(circleTwo);		
		
		// Add rectangle one. 
		let rectangleOne = this.svg.append('rect');
		rectangleOne.attr('width', PrototypeApp.RECTANGLE_WIDTH);    
		rectangleOne.attr('height', PrototypeApp.RECTANGLE_HEIGHT);                           
		Transformations.setTranslationX(rectangleOne, (this.vizWidth/2) - (PrototypeApp.RECTANGLE_WIDTH/2));
		Transformations.setTranslationY(rectangleOne, (this.vizHeight/4) - (PrototypeApp.RECTANGLE_HEIGHT/2));
		rectangleOne.attr('id', 'rectangle-one');
		new TouchManager(rectangleOne);
		
		// Add rectangle one. 
		let rectangleTwo = this.svg.append('rect');		
		rectangleTwo.attr('width', PrototypeApp.RECTANGLE_WIDTH);    
		rectangleTwo.attr('height', PrototypeApp.RECTANGLE_HEIGHT);          
		Transformations.setTranslationX(rectangleTwo, (this.vizWidth/2) - (PrototypeApp.RECTANGLE_WIDTH/2));
		Transformations.setTranslationY(rectangleTwo, ((this.vizHeight/4) * 3) - (PrototypeApp.RECTANGLE_HEIGHT/2));
		rectangleTwo.attr('id', 'rectangle-two');    
		new TouchManager(rectangleTwo);
		
		// Create text item.
		let textItem =
			new TextItem(this.svg, 'Hello World! This is a really long string!', 100, 'demo-text', 'demo-text-bg', 'demo-text-text');
		Transformations.setTranslation(textItem.asItem(), this.vizWidth/2, this.vizHeight/2);
		Transformations.setScale(textItem.asItem(), 2);
		Transformations.setRotation(textItem.asItem(), 45);
		let rts = new TouchManager(textItem.asItem());	
		rts.applyScaleLimits(0.5, 2);		
		
		// Signal app is ready.
		this.ready();
		
	}
	
}
