import {FlickManager} from 'common/src/listeners/flick_manager';
import {Networking} from 'common/src/utils/networking';
import {Roles} from 'common/src/constants/roles'; 

/**
 * A class which manages all the network flick events relating to an item.
 */
export class NetworkFlickManager extends FlickManager {	
	
	// TODO Need abstract SynergyMesh Item Type which has a (static?) contstruct-on-message function.
	
	
	//// Private Constant. ////
	
	/** Time to take to fade a transferring object out or in (in seconds). */
	private FADE_TIME:number = 0.25;
	
	
	//// Private Global Variables. ////
	
	/** Flag to indicate that the item is a new arrival */
	private newArrival: boolean = false;
	
	/** Flag to indicate that the item is due to be transferred. */
	private transferring: boolean = false;
	
	
	//// Public Static Methods. ////
	
	/**
	 * Method for setting up listener for network flick arrivals.
	 */
	public static registerForNetworkFlick() {
		
		// TODO Network flick arrival listener (for messages from same role).
		// On message: create (as new arrival),  flick into view and fade in transferred items.
		// Include callback for adding listeners to new arrivals (except flick).
		
	}
	
	
	//// Protected Methods. ////
	
	/**
	 * To be called when an item hits the screen top.
	 */
	protected onHitTop(): void {
		
		// Check if has a valid transfer target.
		let studentCount = 0;
		for (let app in Networking.clients[Roles.STUDENT]) {
			studentCount+= Networking.clients[Roles.STUDENT][app].length;
		}
		let validTarget = studentCount > 1;
		
		// Check if a valid target and not a new arrival.
		if (validTarget && !this.newArrival) {
			
			// Check if not already transferring
			if (!this.transferring) {
			
				// Log as transferring.
				this.transferring = true;
			
				// Remove friction.
				this.friction = 1;
				
				// Fade out.
				$(document.getElementById(this.ele.attr('id'))).fadeOut(this.FADE_TIME * 1000);
				
				// Get self.
				let self = this;
				
				// When the fade is done.
				setTimeout(function() {
					
					// TODO Send out transfer message.
				
					// Stop moving, remove item and self.
					self.stop();
					
					// Remove item and self.
					self.terminate();
					
				}, this.FADE_TIME * 1000);
				
			}
				
		} else {
		
			// Bounce as usual.
			super.onHitTop();
			
		}
		
	}
	
	/**
	 * To be called when the first touch of a gesture happens on the target element.
	 */
	protected onStartMoving(): void {
		
		// Stop item being classed as a new arrival.
		this.newArrival = false;
		
		// Continue as usual.
		super.onStartMoving();
		
	}
	
	
	//// Private Methods. ////
	
	
	/**
	 * Destroy the item and this listener.
	 */
	private terminate(): void {
		this.shouldBeMoving = false;
		this.shouldBeSampling = false;
		let element = document.getElementById(this.ele.attr('id'));
		element.parentNode.removeChild(element);
		delete this.touchManager;
		delete this.ele;
		delete this;
	}
	
}