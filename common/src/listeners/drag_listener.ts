/**
 * Utility class which provides methods useful for 
 * adding a drag listener to items.
 */
export class DragListener {
	
	/** The element to add the drag listener to */
	private ele: d3.Selection<any>;
	
	 /**
	 * Add a drag listener to the supplied item.
	 *
	 * @param {d3.Selection<any>} ele The element to add the drag listener to.
	 */
	constructor(ele: d3.Selection<any>) {
		
		// Create drag behaviour.
		let drag = d3.behavior.drag();
//		drag	.origin(function(d) {  // FIXME
//			return {x: d[0], y: d[1]};
//		});
		drag.on('drag', this.dragged);
		
		// Add behaviour to supplied element.
		ele.call(drag);
		
	}
	
	private dragged(d) {
		
		// Get movement details.
//		d[0] = d3.event.x; // FIXME
//		d[1] = d3.event.y;
	
		// Move element.
//		this.ele.attr('transform', 'translate(' + d + ')'); // FIXME
	}
		
}