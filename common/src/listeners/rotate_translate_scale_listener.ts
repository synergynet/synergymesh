import {FlickBehaviour} from 'common/src/listeners/flick_behaviour'; 
import {Transformations} from 'common/src/utils/transformations'; 

 /**
 * Utility class which provides methods useful for adding a two-finger gesture listener 
 * to items that allows for rotating, translating and scaling.
 */
export class RotateTranslateScaleListener {
	
	/** The element to be moved. */
	private ele: d3.Selection<any>;
	
	/** Flag to show whether to allow rotation. */
	private enabledRotation: boolean = true;
	
	/** Flag to show whether to allow scaling. */
	private enabledScaling: boolean = true;
	
	/** Flag to show whether to adhear to scale limits. */
	private scaleLimits: boolean = false;
	
	/** Flag to set the min value to scale an item to. */
	private scaleMin: number = 0.5;
	
	/** Flag to set the max value to scale an item to. */
	private scaleMax: number = 2;
	
	 /**
	 * Add a rotate/translate/scale listener to the supplied item.
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
		
		// FIXME Need to allow transition between single touch (drag) and multi-touch (gesturable) events
		// without the user having to release the item.
		
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
		  
		    // Enable inertia throwing.
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
		
		// Add multi-touch gestures.
		interactListener.gesturable({
			
			// Call this function on every gesture move event.
			onmove: function (event) {				
				
				// Get the modified location.
	        	let x = Transformations.getTranslationX(self.ele) + event.dx;
	        	let y = Transformations.getTranslationY(self.ele) + event.dy;
				
				// Translate the element.
				Transformations.setTranslation(self.ele, x, y);
				
				// Check scaling enabled.
				if (self.enabledScaling) {
			
					// Get the modified scale.
		        	let scale = Transformations.getScale(self.ele) + event.ds;
				
					// Add scale limits if required.
					if (self.scaleLimits) {
						if (scale > self.scaleMax) {
							scale = self.scaleMax;
						} else if  (scale < self.scaleMin) {
							scale = self.scaleMin;							
						}
					}
					
					// Scale the element.
					Transformations.setScale(self.ele, scale);
					
				}
				
				// Check rotation enabled.
				if (self.enabledRotation) {
				
					// Get the modified rotation.
		        	let angle = Transformations.getRotation(self.ele) + event.da;
					
					// Rotate the element.
					Transformations.setRotation(self.ele, angle);
					
				}
			}
			
		});
		
	}
	
	/**
	 * Set the scale limits.
	 * 
	 * @param {number} min The minimum scale to be applied to the element.
	 * @param {number} max The maximum scale to be applied to the element.
	 */
	public applyScaleLimits(min: number, max: number): void {
		this.scaleLimits = true;
		this.scaleMin = min;
		this.scaleMax = max;
	}
	
	/**
	 * Set whether rotation should be enabled or disabled.
	 * 
	 * @param {boolean} rotationEnabled The flag to set rotation's enabled or disabled status.
	 */
	public setRotationEnabled(rotationEnabled: boolean): void {
		this.enabledRotation = rotationEnabled;
	}
	
	/**
	 * Set whether scaling should be enabled or disabled.
	 * 
	 * @param {boolean} scalingEnabled The flag to set scaling's enabled or disabled status.
	 */
	public setScalingEnabled(scalingEnabled: boolean): void {
		this.enabledScaling = scalingEnabled;
	}
		
}