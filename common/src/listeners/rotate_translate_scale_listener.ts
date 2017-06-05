import {Transformations} from 'common/src/utils/transformations'; 

 /**
 * Utility class which provides methods useful for adding a two-finger gesture listener 
 * to items that allows for rotating, translating and scaling.
 */
export class RotateTranslateScaleListener {
	
	// TODO Get flick behaviour (e.g. friction) from app.
	
	/** The element to be moved. */
	private ele: d3.Selection<any>;
	
	 /**
	 * Add a rotate/translate/scale listener to the supplied item.
	 *
	 * @param {d3.Selection<any>} ele The d3 selection to add the listener to (requires id to be set).
	 * @param {boolean} bringToFront flag to indicate whether the item should come to the front on press.
	 */
	constructor(ele: d3.Selection<any>, bringToFront: boolean = true) { // TODO Flick Enable/Disable Flick.
		
		// Store the d3 selection for later.
		this.ele = ele;
		
		// Get the HTML Element representation.
		let id = ele.attr('id');
		let element = document.getElementById(id);
		
		// Add interact listener.
		this.addInteract(element, bringToFront);
		
	}
	
	/**
	 * Add interact listener to the supplied HTML item.
	 *
	 * @param {HTMLElement} element The element to add the listener to.
	 * @param {boolean} bringToFront flag to indicate whether the item should come to the front on press.
	 */
	private addInteract(element: HTMLElement, bringToFront: boolean = true) {
		
		// Create self object for referencing elsewhere.
		let self = this;
		
		// Add move to front listener as a basic drag listener if corresponding flag not made false.
		if (bringToFront) {
			let drag = d3.behavior.drag();
			drag.on('dragstart', function(d) {
				this.parentNode.appendChild(this);
			});
			this.ele.call(drag);
		}
		
		// Apply interact listener to element.
		let interactListener = interact(element);
			
		// Apply drag listener.
		interactListener.draggable({
		  
		    // Enable inertial throwing.
		    inertia: true,
			  
		    // Keep the element within the area of it's parent.
		    restrict: {
		      restriction: 'parent',
		      endOnly: true,
		      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
		    },
			
		    // Enable autoscroll.
		    autoScroll: true,
		
		    // Call this function on every dragmove event.
		    onmove: function (event) {

				// Get the modified location.
	        	let x = Transformations.getTranslationX(self.ele) + event.dx;
	        	let y = Transformations.getTranslationY(self.ele) + event.dy;
				
				// Translate the element.
				Transformations.setTranslation(self.ele, x, y);
				
			}
		});
		
		// TODO Add multi-touch gestures.
		// interactListener.gesturable({
		
	}
		
}