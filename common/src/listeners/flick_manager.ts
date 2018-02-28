import {SynergyMeshApp} from 'common/src/synergymesh_app';
import {Transformations} from 'common/src/utils/transformations'; 

/**
 * A class which manages all the flick events relating to an item.
 */
export class FlickManager{
	
	
	//// Private Global Variables. ////
	
	/** The d3 selection to track and move. */
	private ele: d3.Selection<any>;
	
	
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
		element.addEventListener('touchmove', function(e) {
			
			// TODO Track movement of object.
			
		});
		
		// Create listeners for release.
		element.addEventListener('touchend', function(e) {
			self.onRelease();
		});
		element.addEventListener('mouseup', function(e) {
			self.onRelease();			
		});
		
	}
	
	//// Public methods. ////
	
	/**
	 * Instigate a flick animation. 
	 */
	public flick(): void {
		
		// TODO Flick animation.
		
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

	
	//// Private Methods. ////
	
	/**
	 * Method to be called on releasing an element to work out the flick trajectory
	 */
	private onRelease() {
		
		// TODO Calculate the trajectory of the item on release.
		
		// Initate the flick.
		this.flick();
		
	}
	
}