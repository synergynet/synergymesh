import {SynergyMeshApp} from 'common/src/synergymesh_app';
import {TouchManager} from 'common/src/listeners/touch_manager';
import {Transformations} from 'common/src/utils/transformations'; 

/**
 * A class which manages all the flick events relating to an item.
 */
export class FlickManager {
	
	
	//// Private Constants. ////
	
	/** How small the change in x and y should be on flick before stopping. */
	private static CUT_OFF_CHANGE: number = 0.01;
	
	/** The amount of friction to apply when none set by default. */
	private static DEFAULT_FRICTION: number = 0.95;
	
	/** How often (in ms) to move the location of the element. */
	private static MOVE_RATE: number = (1000/60);
	
	/** How often (in ms) to sample the location of the element. */
	private static SAMPLE_RATE: number = 250;
	
	
	//// Protected Global Variables. ////
	
	/** The d3 selection to track and move. */
	protected ele: d3.Selection<any>;
	
	/** The amount to slow down change on each move. */
	protected friction: number = 1;
	
	/** Flag for stopping mover. */
	protected shouldBeMoving: boolean = false;
	
	/** Flag for stopping sampler. */
	protected shouldBeSampling: boolean = false;
	
	/** Touch manager assigned to the element. */
	protected touchManager: TouchManager;
	
	
	//// Private Global Variables. ////
	
	/** The app the element exists in. */
	private app: SynergyMeshApp;
	
	/** The current position of the element when flicked. */
	private posOnFlick: {x: number, y: number} = {x: 0, y:0};
		
	/** The id of the timeout function of the move function. */
	private mover: number;
	
	/** Object holding the amount to move in each direction per micro second. */ 
	private movementInfo: {x: number, y: number} = {x: 0, y: 0};	
	
	/** The id of the timeout function of the sample function. */
	private sampler: number;
	
	/** Object holding the position and timestamp information from the most recent sample. */ 
	private sampleInfo: {x: number, y: number, timestamp: number} = {x: 0, y: 0, timestamp: 0};
	
	/** Flag to indicate whether something is queued up to animate. */	
	private ticking: boolean= false;
	
	
	//// Constructors. ////
	
	/**
	 * Add a flick manager to the supplied element.
	 * 
	 * @param {d3.Selection<any>} ele The d3 selection to add the listener to (requires id to be set).
	 * @param {SynergyMeshApp} app The SynergyMesh app that the element is part of.
	 * @param {TouchManager} touchManager  Touch manager assigned to the element.
	 * @param {number} friction The amount to slow down change on each move.
	 */
	constructor(ele: d3.Selection<any>, app: SynergyMeshApp, touchManager: TouchManager, friction: number = FlickManager.DEFAULT_FRICTION) {
		
		// Get self.
		let self = this;
		
		// Store supplied values.
		this.ele = ele;
		this.app = app;
		this.touchManager = touchManager;
		this.friction = friction;
		
		// Get the HTML Element representation.
		let id = ele.attr('id');
		let element = document.getElementById(id);
		
		// Create listener for tracking movement of object.
		element.addEventListener('touchstart', function(e) {
			let touches= e['targetTouches']; 
			if (touches.length == 1) {
				self.onStartMoving();
			}						
		});
		
		// Create listeners for release.
		element.addEventListener('mouseup', function(e) {
			self.onRelease();
		});
		element.addEventListener('touchend', function(e) {
			let touches= e['targetTouches']; 
			if (touches.length == 0) {
				self.onRelease();
			}			
		});
		
	}
	
	//// Public methods. ////
	
	/**
	 * Instigate a flick animation. 
	 * 
	 * @param {number} xDiffPerSec The change in x per second.
	 * @param {number} yDiffPerSec The change in y per second.
	 */
	public flick(xDiffPerSec: number, yDiffPerSec: number): void {
		
		// Allow movement.
		this.shouldBeMoving = true;
		
		// Work out movement.
		this.movementInfo = {x: xDiffPerSec / 1000, y: yDiffPerSec / 1000}; 
		
		// Store current location.
		this.posOnFlick = {
			x: Transformations.getTranslationX(this.ele), 
			y: Transformations.getTranslationY(this.ele)
		}
		
		// Start repeating function called at constant sample rate which logs position object and timestamp.
		this.move();
		this.mover = setInterval(this.move.bind(this), FlickManager.MOVE_RATE);

	}
	
	
	//// Protected Methods. ////
	
	/**
	 * To be called when an item hits the screen left.
	 */
	protected onHitLeft(): void {
		
		// Reverse x-trajectory.
		this.movementInfo.x = Math.abs(this.movementInfo.x);
		
	}
	
	/**
	 * To be called when an item hits the screen right.
	 */
	protected onHitRight(): void {
		
		// Reverse x-trajectory.
		this.movementInfo.x = -Math.abs(this.movementInfo.x);
		
	}
	
	/**
	 * To be called when an item hits the screen top.
	 */
	protected onHitTop(): void {
		
		// Reverse y-trajectory.
		this.movementInfo.y = Math.abs(this.movementInfo.y);
		
	}
	
	/**
	 * To be called when an item hits the screen bottom.
	 */
	protected onHitBottom(): void {
		
		// Reverse y-trajectory.
		this.movementInfo.y = -Math.abs(this.movementInfo.y);
		
	}
	
	/**
	 * Method to be called on releasing an element to work out the flick trajectory
	 */
	protected onRelease(): void {
		
		// Stop sampler.
		this.shouldBeSampling = false;
		window.clearInterval(this.sampler);
		
		// Get current item position and timestamp.
		let currentX = Transformations.getTranslationX(this.ele);
		let currentY = Transformations.getTranslationY(this.ele);
		let currentTimestamp =  new Date().getTime();
		
		// Get change in x and y since sample.
		let xDiff = currentX - this.sampleInfo.x;
		let yDiff = currentY - this.sampleInfo.y;
		let timeDiff = currentTimestamp - this.sampleInfo.timestamp;
		
		// Initate the flick.
		this.flick((xDiff/timeDiff) * 1000, (yDiff/timeDiff) * 1000);
		
	}
	
	/**
	 * To be called when the first touch of a gesture happens on the target element.
	 */
	protected onStartMoving(): void {
		
		// Allow sampling.
		this.shouldBeSampling = true;
		
		// Stop any flicking happening.
		this.stop();
		
		// Start repeating function called at constant sample rate which logs position object and timestamp.
		this.sample();
		this.sampler = setInterval(this.sample.bind(this), FlickManager.SAMPLE_RATE);
		
	}
	
	/**
	 * Stop element from moving.
	 */
	protected stop(): void {
		
		// Stop sampler.
		this.shouldBeMoving = false;
		window.clearInterval(this.mover);
		
	}
	
	
	//// Private methods. ////
	
	/**
	 * Move the element.
	 */
	private move(): void {
		
		// Check this is allowed.
		if (!this.shouldBeMoving) {
			window.clearInterval(this.mover);
			return;
		}
		
		// Check if item has hit any of the borders.
		if (this.posOnFlick.x > this.app.vizWidth) {
			this.onHitRight();
		} else if (this.posOnFlick.x < 0) {
			this.onHitLeft();
		}
		if (this.posOnFlick.y > this.app.vizHeight) {
			this.onHitBottom();
		} else if (this.posOnFlick.y < 0) {
			this.onHitTop();
		}
		
		// Update location.
		this.requestElementUpdate();
	
		// Apply friction.
		if (Math.abs(this.movementInfo.x) < FlickManager.CUT_OFF_CHANGE 
			&& Math.abs(this.movementInfo.y) < FlickManager.CUT_OFF_CHANGE ) {
				this.stop();
		} else {
			this.movementInfo.x *= this.friction;
			this.movementInfo.y *= this.friction;
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
	 * Store the element's location and the timestamp.
	 */
	private sample(): void {
		
		// Check this is allowed.
		if (!this.shouldBeSampling) {
			window.clearInterval(this.sampler);
			return;
		}
		
		// Store the location of the item and timestamp.
		this.sampleInfo = {
			x: Transformations.getTranslationX(this.ele),
			y: Transformations.getTranslationY(this.ele),
			timestamp: new Date().getTime()
		};
		
	}
	
	/**
	* Function for updating the element.
	*/
	private updateElementTransform(): void {
		
		// Double check should be moving.
		if (!this.shouldBeMoving) {
			this.ticking = false;
			return;
		}
		
		// Get change.
		let xChange = this.movementInfo.x * FlickManager.MOVE_RATE;
		let yChange = this.movementInfo.y * FlickManager.MOVE_RATE;
		
		// Reposition the item by incrementing x and y by their appropriate amounts.
		this.posOnFlick.x += xChange;
		this.posOnFlick.y += yChange;
		Transformations.setTranslation(this.ele, this.posOnFlick.x, this.posOnFlick.y);
		this.touchManager.establishTransformation();
		
		// Allow next animation frame.
		this.ticking = false;
	}
	
}