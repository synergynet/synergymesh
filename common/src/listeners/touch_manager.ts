import {SynergyMeshApp} from 'common/src/synergymesh_app';
import {Transformations} from 'common/src/utils/transformations'; 

/**
 * A class which manages all the touch events relating to an item.
 */
export class TouchManager{
	
	
	//// Private Global Variables. ////
	
	/** Flag to show whether to allow rotation. */
	private enabledRotation: boolean = true;
	
	/** The d3 selection to track and move. */
	private ele: d3.Selection<any>;
	
	/** Flag to show whether to allow scaling. */
	private enabledScaling: boolean = true;
	
	/** Flag to show whether to adhear to scale limits. */
	private scaleLimits: boolean = false;
	
	/** Flag to set the min value to scale an item to. */
	private scaleMin: number = 0.5;
	
	/** Flag to set the max value to scale an item to. */
	private scaleMax: number = 2; 
	
	/** Flag to set whether an animation has been requested for the next frame. */
	private ticking: boolean = false;
	
	/** Object for tracking transformations. */
	private transformations: {} = {};
	
	
	//// Constructors. ////
	
	/**
	 * Add a touch manager to the supplied element.
	 * 
	 * @param {d3.Selection<any>} ele The d3 selection to add the listener to (requires id to be set).
	 * @param {SynergyMeshApp} app The SynergyMesh app that the element is part of.
	 * @param {boolean} bringToFront flag to indicate whether the item should come to the front on press.
	 */
	constructor(ele: d3.Selection<any>, app: SynergyMeshApp, bringToFront: boolean = true) {
		
		// Get self.
		let self = this;
		
		// Store element.
		this.ele = ele;
		
		// Establish object for tracking tranformations to element.
		this.establishTransformation();	
		
		// Get the HTML Element representation.
		let id = ele.attr('id');
		let element = document.getElementById(id);
		
		// Establish array to store touch info.
		let prevTouches = [];
		
		// Get touches.
		element.addEventListener('touchstart', function(e) {
			
			// Bring to front if needed.
			if (bringToFront) {
				ele.node().parentNode.appendChild(ele.node());				
			}
			
			// Establish initial touch locations.
			let touches = e['targetTouches'];
			if (touches.length > 0) {
				prevTouches[0] = [];
				prevTouches[0]['x'] = touches[0]['clientX'];
				prevTouches[0]['y'] = touches[0]['clientY'];
			} 
			if (touches.length > 1) {
				prevTouches[1] = [];
				prevTouches[1]['x'] = touches[1]['clientX'];
				prevTouches[1]['y'] = touches[1]['clientY'];		
			}
			
		});
		
		// Calculations to perform on moving a touch.
		element.addEventListener('touchmove', function(e) {
			
			// Establish array for storing differences.
			let diffs = [];
			
			// Get changes in pointer locations.
			let touches = e['targetTouches'];
			if (touches.length > 0){
				diffs[0] = [];
				diffs[0]['x'] = touches[0]['clientX'] - prevTouches[0]['x'];
				diffs[0]['y'] = touches[0]['clientY'] - prevTouches[0]['y'];
			} 
			if (touches.length > 1) {
				diffs[1] = [];
				diffs[1]['x'] = touches[1]['clientX'] - prevTouches[1]['x'];
				diffs[1]['y'] = touches[1]['clientY'] - prevTouches[1]['y'];						
			}
			
			// Update transformations accordingly.
			if (touches.length == 1) {
				self.drag(+diffs[0]['x'], +diffs[0]['y']);
			}else if (touches.length > 1) {
				self.gesture(+diffs[0]['x'], +diffs[0]['y'], +diffs[1]['x'], +diffs[1]['y']);
			}
			
			// Store last touch locations.
			if (touches.length > 0) {
				prevTouches[0] = [];
				prevTouches[0]['x'] = touches[0]['clientX'];
				prevTouches[0]['y'] = touches[0]['clientY'];
			} 
			if (touches.length > 1) {
				prevTouches[1] = [];
				prevTouches[1]['x'] = touches[1]['clientX'];
				prevTouches[1]['y'] = touches[1]['clientY'];		
			}
			
		});

		
	}
	
	
	
	//// Public Methods. ////
	
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
	 * Re-establish the initional element locations.
	 */
	public establishTransformation(): void {
		this.transformations['translate'] = [];
		this.transformations['translate']['x'] = Transformations.getTranslationX(this.ele);
		this.transformations['translate']['y'] = Transformations.getTranslationY(this.ele);
		this.transformations['scale'] = Transformations.getScale(this.ele);
		this.transformations['rotate'] = Transformations.getRotation(this.ele);	
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
	
	
	//// Private Methods. ////
	
	/**
	 * Function to be called when moving the element with a single touch.
	 * 
	 * @param {number} xDiff Change in the first touch's x.
	 * @param {number} yDiff Change in the first touch's y.
	 */
	private drag(xDiff: number, yDiff: number): void {
		this.transformations['translate']['x'] += xDiff;
		this.transformations['translate']['y'] += yDiff;
		this.requestElementUpdate();
	}
	
	/**
	 * Function to be called when moving the element with more than one touch.
	 * 
	 * @param {number} xDiffOne Change in the first touch's x.
	 * @param {number} yDiffOne Change in the first touch's y.
	 * @param {number} xDiffTwo Change in the second touch's x.
	 * @param {number} yDiffTwo Change in the second touch's y.
	 */
	private gesture(xDiffOne: number, yDiffOne: number, xDiffTwo: number, yDiffTwo: number): void {
		
		// TODO Apply translation with two touches.
		
		// TODO Apply Rotation.
		
		// TODO Apply Scale.
		
		this.transformations['translate']['x'] += xDiffTwo;
		this.transformations['translate']['y'] += yDiffTwo;
		this.requestElementUpdate();
	}
	
	/**
	 * Function for scheduling an update.
	 */
	private requestElementUpdate(): void{
	    if(!this.ticking) {
			this.ticking = true;
	        window.requestAnimationFrame(this.updateElementTransform.bind(this));
	    }
	}	
	
		
	/**
	* Function for updating the element.
	*/
	private updateElementTransform(): void {
		Transformations.setTransformation(this.ele, this.transformations['rotate'], this.transformations['scale'], 
			this.transformations['translate']['x'], this.transformations['translate']['y']);
		this.ticking = false;
	}
	
	
	
}