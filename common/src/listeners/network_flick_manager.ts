import {FlickManager} from 'common/src/listeners/flick_manager';

/**
 * A class which manages all the network flick events relating to an item.
 */
export class NetworkFlickManager extends FlickManager{
	
	// TODO Static function for establishing network flick listener for creating (as new arrival) and flicking into view transferred items.
	// Include callback for adding listeners to new arrivals (except flick).
	
	// TODO Text entry field for establishing session name.
	
	// TODO Need abstract SynergyMesh Item Type which has a (static?) contstruct-on-message function.
	
	
	//// Protected Methods. ////
	
	/**
	 * To be called when an item hits the screen top.
	 */
	protected onHitTop(): void {
		
		// TODO Check if valid transfer: not a new arrival, not already transferring and has one valid target.
		let validTransfer = false;
		if (validTransfer) {
			
			// TODO Log as transferring.
		
			// TODO Remove friction.
			
			// TODO Fade out.
			
			// TODO At end of fade out send out transfer message.
			
			// TODO At end of fade out stop moving, remove item and self.
			
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