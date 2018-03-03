import {FlickManager} from 'common/src/listeners/flick_manager';

/**
 * A class which manages all the network flick events relating to an item.
 */
export class NetworkFlickManager extends FlickManager{
	
	// TODO Static function for establishing network flick listener.
	// On message: create (as new arrival),  flick into view and fade in transferred items.
	// Include callback for adding listeners to new arrivals (except flick).
	
	// TODO Text entry field for establishing session name.
	
	// TODO Need abstract SynergyMesh Item Type which has a (static?) contstruct-on-message function.
	
	
	//// Private Constant. ////
	
	/** Time to take to fade a transferring object out or in (in seconds). */
	private FADE_TIME:number = 0.25;
	
	
	//// Private Global Variables. ////
	
	/** Flag to indicate that the item is due to be transferred. */
	private transferring: boolean = false;
	
	
	//// Protected Methods. ////
	
	/**
	 * To be called when an item hits the screen top.
	 */
	protected onHitTop(): void {
		
		// TODO Check if valid transfer: not a new arrival and has one valid target.
		let validTransfer = true;
		if (validTransfer) {
			
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
					this.stop();
					
					// TODO Remove item and self.
					
				}, this.FADE_TIME);
				
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
		
		// TODO Stop item being classed as a new arrival.
		
		// Continue as usual.
		super.onStartMoving();
		
	}
	
}