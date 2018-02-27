import {SynergyMeshApp} from 'common/src/synergymesh_app';
import {Transformations} from 'common/src/utils/transformations'; 

/**
 * A class which manages all the touch events relating to an item.
 */
export class TouchManager{
	
	
	//// Private Global Variables. ////
	
	/** Count of the current number of touches. */
	private currentTouches: number = 0;
	
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
	
	/** An array of the item's current touches. */
	private touchesCurrent: number[][] = [];
	
	/** An array of the item's previous touches. */
	private touchesPrevious: number[][] = [];
	
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
		
		// Get touches.
		element.addEventListener('touchstart', function(e) {
			
			// Bring to front if needed.
			if (bringToFront) {
				ele.node().parentNode.appendChild(ele.node());				
			}
			
			// Establish initial touch locations.
			self.getTouchesCurrent(e);
			
			// Store current touches as previous touches.
			self.touchesPrevious = self.touchesCurrent;
			
		});
		
		// Calculations to perform on moving a touch.
		element.addEventListener('touchmove', function(e) {
			
			// Get current touches.
			self.getTouchesCurrent(e);
			
			// Update transformations accordingly.
			if (self.currentTouches  == 1) {
				self.drag();
			}else if (self.currentTouches  > 1) {
				self.gesture();
			}
			
			// Store current touches as previous touches.
			self.touchesPrevious = self.touchesCurrent;
			
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
	 * @param {number} xLoc The new x Location of the first touch.
	 * @param {number} yLoc The new y Location of the first touch.
	 */
	private drag(): void {
		
		// Get first touch id.
		let id = Object.keys(this.touchesCurrent)[0];
		
		// Get changes in touch location.
		let xDiff = this.touchesCurrent[id]['x'] - this.touchesPrevious[id]['x'];
		let yDiff = this.touchesCurrent[id]['y'] - this.touchesPrevious[id]['y'];
		
		// Use differences in touch to translate element.
		this.transformations['translate']['x'] += xDiff;
		this.transformations['translate']['y'] += yDiff;
		
		// Request update.
		this.requestElementUpdate();
		
	}
	
	/**
	 * Function to be called when moving the element with more than one touch.
	 */
	private gesture(): void {
		
		// Get first two touch ids.
		let idOne = Object.keys(this.touchesCurrent)[0];
		let idTwo = Object.keys(this.touchesCurrent)[1];
		
		// Get changes in touch locations.
		let xDiffOne = this.touchesCurrent[idOne]['x'] - this.touchesPrevious[idOne]['x'];
		let yDiffOne = this.touchesCurrent[idOne]['y'] - this.touchesPrevious[idOne]['y'];
		let xDiffTwo = this.touchesCurrent[idTwo]['x'] - this.touchesPrevious[idTwo]['x'];
		let yDiffTwo = this.touchesCurrent[idTwo]['y'] - this.touchesPrevious[idTwo]['y'];
		
		// TODO Apply translation with two touches.
		this.transformations['translate']['x'] += xDiffTwo;
		this.transformations['translate']['y'] += yDiffTwo;
		
		// TODO Apply Rotation.
		
		// TODO Apply Scale.
		
		// Request update.
		this.requestElementUpdate();
		
	}
	
	/**
	 * Get and index all the current touches.
	 * 
	 * @param {TouchEvent} e The touch event to get the touches from.
	 */
	private getTouchesCurrent (e: TouchEvent) {
		this.touchesCurrent = [];
		let touches= e['targetTouches']; 
		for (let i = 0; i < touches.length; i++) {
			let id = 'touch-' + touches[i]['identifier'];
			this.touchesCurrent[id] = [];
			this.touchesCurrent[id]['id'] = id;
			this.touchesCurrent[id]['x'] = touches[i]['clientX'];
			this.touchesCurrent[id]['y'] = touches[i]['clientY'];
			this.currentTouches = i + 1;
		}		
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