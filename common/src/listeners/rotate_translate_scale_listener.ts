/**
 * Utility class which provides methods useful for adding a two-finger gesture listener 
 * to items that allows for rotating, translating and scaling.
 */
export class RotateTranslateScaleListener {
	
	/** The element to be moved. */
	private ele;
	
	/** The current rotation of the element. */
	private rotation = 0;
	
	/** The current scale of the element. */
	private scale = 0;
	
	/** The current x translation of the element. */
	private xTranslation = 0;
	
	/** The current y translation of the element. */
	private yTranslation = 0;
	
	 /**
	 * Add a rotate/translate/scale listener to the supplied item.
	 *
	 * @param {d3.Selection<any>} ele The element to add the drag listener to.
	 * @param {boolean} bringToFront flag to indicate whether the item should come to the front on press.
	 */
	constructor(ele: d3.Selection<any>, bringToFront: boolean = true) {
		
		// Create self object for referencing elsewhere.
		let self = this;
		
		// Create drag behaviour.
		let drag = d3.behavior.drag();
		
		// Add move to front listener if corresponding flag not made fault.
		if (bringToFront) {
			drag.on('dragstart', function(d) {
				this.parentNode.appendChild(this);
			});
		}
		
		// Set drag movements' start location.
		drag	.origin(function(d) { 
			return {x: self.xTranslation, y: self.yTranslation};
		});
		
		// Store the supplied element for movement later.
		this.ele = ele;
		
		// TODO On drag start record as new touch event.
		
		// Add drag listen event.
		drag.on('drag', function(d) {
			
			// Get location of event.
			let x = (<DragEvent>d3.event).x;
			let y = (<DragEvent>d3.event).y;
			
			// Call movement of element.
			self.updateElementTransformations(x, y);
			
		});
		
		// TODO On drag stop destroy closest touch event.
		
		// Add behaviour to supplied element.
		ele.call(drag);
		
	}
	
	
	/**
	 * Update the scaling, rotation and translation of the element.
	 * 
	 * @param {number} x The x translation to move the element by.
	 * @param {number} y The y translation to move the element by.
	 */
	private updateElementTransformations(x: number, y: number){
		
		// Update current translation values of the element.
		this.xTranslation = x;
		this.yTranslation = y;
	
		// TODO Work out closest previous touch and update.
		
		// TODO If only one touch then just perform the typical drag action.
		
		// TODO Otherwise get first 2 touches and get vector between their current positions.
		
		// TODO Update translation, scale and rotation with different between old and new vector.
		
		// TODO Save new vector as old vector.

		
	}
		
}