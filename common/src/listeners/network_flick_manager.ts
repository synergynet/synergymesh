import {FlickManager} from 'common/src/listeners/flick_manager';

/**
 * A class which manages all the network flick events relating to an item.
 */
export class NetworkFlickManager extends FlickManager{
	
	
	//// Protected Methods. ////
	
	/**
	 * To be called when an item hits the screen top.
	 */
	protected onHitTop(): void {
		
		// TODO If not a new arrival then try to transfer.
		
	}
	
}