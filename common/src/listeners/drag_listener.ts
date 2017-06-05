import {FlickBehaviour} from 'common/src/listeners/flick_behaviour'; 
import {Transformations} from 'common/src/utils/transformations';
 
 /**
 * Utility class which provides methods useful for 
 * adding a drag listener to items.
 */
export class DragListener {
	
	/** The element to be moved. */
	private ele: d3.Selection<any>;
	
	 /**
	 * Add a drag listener to the supplied item.
	 *
	 * @param {d3.Selection<any>} ele The d3 selection to add the listener to (requires id to be set).
	 * @param {boolean} enableFlick flag to indicate whether the item should exhibit flick behaviour.
	 * @param {boolean} bringToFront flag to indicate whether the item should come to the front on press.
	 */
	constructor(ele: d3.Selection<any>, enableFlick: boolean = true, bringToFront: boolean = true) {
		
		// Store the d3 selection for later.
		this.ele = ele;
		
		// Get the HTML Element representation.
		let id = ele.attr('id');
		let element = document.getElementById(id);
		
		// Add interact listener.
		this.addInteract(element, enableFlick, bringToFront);
		
	}
	
	/**
	 * Add interact listener to the supplied HTML item.
	 *
	 * @param {HTMLElement} element The element to add the listener to.
	 * @param {boolean} enableFlick flag to indicate whether the item should exhibit flick behaviour.
	 * @param {boolean} bringToFront flag to indicate whether the item should come to the front on press.
	 */
	private addInteract(element: HTMLElement, enableFlick: boolean, bringToFront: boolean) {
		
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
		
		// Establish inertia
		let inertia: any = false;
		if (enableFlick) {
			inertia = {
				resistance: FlickBehaviour.resistance
			}
		}
		
		// Apply interact listener to element.
		let interactListener = interact(element);
			
		// Apply drag listener.
		interactListener.draggable({
		  
		    // Enable inertial throwing.
			inertia: inertia,
			  
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
		
	}
		
}