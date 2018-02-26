import {SynergyMeshApp} from 'common/src/synergymesh_app';
import {Transformations} from 'common/src/utils/transformations'; 

/**
 * A class which manages all the touch events relating to an item.
 */
export class TouchManager{
	
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
		
	// TODO Refactor functions into class.
	
	/**
	 * Add a touch manager to the supplied element.
	 * 
	 * @param {d3.Selection<any>} ele The d3 selection to add the listener to (requires id to be set).
	 * @param {SynergyMeshApp} app The SynergyMesh app that the element is part of.
	 * @param {boolean} bringToFront flag to indicate whether the item should come to the front on press.
	 */
	constructor(ele: d3.Selection<any>, app: SynergyMeshApp, bringToFront: boolean = true) {
		
		// Get the HTML Element representation.
		let id = ele.attr('id');
		let element = document.getElementById(id);		
		
		// Flag to indicate if animation is already scheduled.
		let ticking = false;
		
		// Establish object for tracking tranformations to element.
		let transform = [];
		transform['translate'] = [];
		transform['translate']['x'] = Transformations.getTranslationX(ele);
		transform['translate']['y'] = Transformations.getTranslationY(ele);
		transform['scale'] = Transformations.getScale(ele);
		transform['rotate'] = Transformations.getRotation(ele);		
		
		// Add move to front listener as a basic drag listener if corresponding flag not made false.
		if (bringToFront) {
			let drag = d3.behavior.drag();
			drag.on('dragstart', function(d) {
				this.parentNode.appendChild(this);
			});
			ele.call(drag);
		}
		
		// Function for updating the element.
		function updateElementTransform() {
			Transformations.setTransformation(ele, 
				transform['rotate'], transform['scale'], transform['translate']['x'], transform['translate']['y']);
			ticking = false;
		}
		
		// Function for scheduling an update.
		function requestElementUpdate() {
		    if(!ticking) {
				ticking = true;
		        window.requestAnimationFrame(updateElementTransform);
		    }
		}				
		
		// Get touches.
		let xInitial = 0;
		let yInitial = 0;
		let panStartX = 0;
		let panStartY = 0;
		element.addEventListener('touchstart', function(e) {
			
			let touches = e['targetTouches'];
			if (touches.length == 1){
				panStartX = Transformations.getTranslationX(ele);
				panStartY = Transformations.getTranslationY(ele);
				xInitial = touches[0]['clientX'];
				yInitial = touches[0]['clientY'];
			} else {
				
			}
			
		});
		
		// Calculations to perform on moving a touch.
		element.addEventListener('touchmove', function(e){
			
			let touches = e['targetTouches'];
			if (touches.length == 1){
				let xDiff = touches[0]['clientX'] - xInitial;
				let yDiff = touches[0]['clientY'] - yInitial;
				transform['translate']['x'] = panStartX + xDiff;
				transform['translate']['y'] = panStartY + yDiff
				requestElementUpdate();
			} else {
		
				// TODO Rotation, translation and scaling with 2 touches.
				
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