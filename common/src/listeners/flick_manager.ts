import {SynergyMeshApp} from 'common/src/synergymesh_app';
import {Transformations} from 'common/src/utils/transformations'; 

/**
 * A class which manages all the flick events relating to an item.
 */
export class FlickManager {
	
	//// Private Constants. ////
	
	/** How often (in ms) to sample the location of the element. */
	private static SAMPLE_RATE: number = 100;
	
	
	//// Protected Global Variables. ////
	
	/** The d3 selection to track and move. */
	protected ele: d3.Selection<any>;
	
	/** Flag to indicated that the item is in motion from a flick. */
	protected inMotion: boolean = false;
	
	
	//// Private Global Variables. ////
	
	/** The id of the timeout function of the sample function. */
	private sampler: number;
	
	/** Object holding the position and timestamp information from the most recent sample. */ 
	private sampleInfo: {x: number, y: number, timestamp: number} = {x: 0, y: 0, timestamp: 0};;
	
	
	//// Constructors. ////
	
	/**
	 * Add a flick manager to the supplied element.
	 * 
	 * @param {d3.Selection<any>} ele The d3 selection to add the listener to (requires id to be set).
	 * @param {SynergyMeshApp} app The SynergyMesh app that the element is part of.
	 */
	constructor(ele: d3.Selection<any>, app: SynergyMeshApp) {
		
		// Get self.
		let self = this;
		
		// Store element.
		this.ele = ele;
		
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
	 */
	public flick(): void {
		
		// TODO Call recursive function which runs at a constant rate (in animation frames?).
		
			// TODO Reposition the item by increamenting x and y by their appropriate amounts.
		
			// TODO Check if item has hit any of the borders.
		
			// TODO Apply friction.
		
	}
	
	
	//// Protected Methods. ////
	
	/**
	 * To be called when an item hits the screen left.
	 */
	protected onHitLeft(): void {
		
		// TODO Reverse x-trajectory.
		
	}
	
	/**
	 * To be called when an item hits the screen right.
	 */
	protected onHitRight(): void {
		
		// TODO Reverse x-trajectory.
		
	}
	
	/**
	 * To be called when an item hits the screen top.
	 */
	protected onHitTop(): void {
		
		// TODO Reverse y-trajectory.
		
	}
	
	/**
	 * To be called when an item hits the screen bottom.
	 */
	protected onHitBottom(): void {
		
		// TODO Reverse y-trajectory.
		
	}
	
	/**
	 * Method to be called on releasing an element to work out the flick trajectory
	 */
	protected onRelease(): void {
		
		// TODO Stop sampler.
		window.clearInterval(this.sampler);
		
		// TODO Calculate the x and y diff per X ms of the item on release.
		
		// Initate the flick.
		this.flick();
		
	}
	
	/**
	 * To be called when the first touch of a gesture happens on the target element.
	 */
	protected onStartMoving(): void {
		
		// Stop any flicking happening.
		this.inMotion = false;
		
		console.log('go');
		
		// Start repeating  function called at constant sample rate which logs position object and timestamp.
		this.sample();
		this.sampler = setInterval(this.sample.bind(this), FlickManager.SAMPLE_RATE);
		
	}
	
	
	//// Private methods. ////
	
	/**
	 * Store the element's location and the timestamp.
	 */
	private sample(): void {
		
		// Store the location of the item and timestamp.
		this.sampleInfo = {
			x: Transformations.getTranslationX(this.ele),
			y: Transformations.getTranslationY(this.ele),
			timestamp: new Date().getTime()
		};
		
	}
	
}