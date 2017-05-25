/**
 * Utility class which provides methods useful for 
 * adding a drag listener to items.
 */
export class DragListener {
	
	/** The element to be moved. */
	private ele;
	
	/** The current x translation of the element. */
	private xTranslation = 0;
	
	/** The current y translation of the element. */
	private yTranslation = 0;
	
	 /**
	 * Add a drag listener to the supplied item.
	 *
	 * @param {d3.Selection<any>} ele The element to add the drag listener to.
	 * @param {boolean} bringToFront flag to indicate whether the item should come to the front on press.
	 * @param {number} xTranslation The x value of an existing translation on the item.
	 * @param {number} yTranslation The x value of an existing translation on the item.
	 */
	constructor(ele: d3.Selection<any>, bringToFront: boolean = true, xTranslation: number = 0, yTranslation: number = 0) {
		
		// Store the supplied element for movement later.
		this.ele = ele;
		
		// Load in pre-existing translations.
		this.xTranslation = xTranslation;		
		this.yTranslation = yTranslation;
		
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
		
		// Add drag listen event.
		drag.on('drag', function(d) {
			
			// Get location of event.
			let x = (<DragEvent>d3.event).x;
			let y = (<DragEvent>d3.event).y;
			
			// Call movement of element.
			self.moveElement(x, y);
			
		});
		
		// Add behaviour to supplied element.
		ele.call(drag);
		
	}
	
	
	/**
	 * Move the element after recording where its moving to.
	 * 
	 * @param {number} x The x translation to move the element by.
	 * @param {number} y The y translation to move the element by.
	 */
	private moveElement(x: number, y: number){
		
		// Update current translation values of the element.
		this.xTranslation = x;
		this.yTranslation = y;
	
		// Move element.
		this.ele.attr('transform', 'translate(' + this.xTranslation + ',' + this.yTranslation + ')');
		
	}
		
}