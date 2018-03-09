import {CommonElements} from 'common/src/constants/common_elements';
import {FlickManager} from 'common/src/listeners/flick_manager';
import {Networking} from 'common/src/utils/networking';
import {Roles} from 'common/src/constants/roles'; 
import {SynergyMeshApp} from 'common/src/synergymesh_app';
import {TouchManager} from 'common/src/listeners/touch_manager';
import {Transformations} from 'common/src/utils/transformations'; 

/**
 * A class which manages all the network flick events relating to an item.
 */
export class NetworkFlickManager extends FlickManager {
	
	
	//// Private Constant. ////
	
	/** Time to take to fade a transferring object out or in (in seconds). */
	private static FADE_TIME:number = 0.25;
	
	/** Name of the network event to use for the tranfer.. */
	private static FLICK_EVENT: string = 'network-flick';
	
	
	//// Private Global Variables. ////
	
	/** Flag to indicate that the item is a new arrival */
	private newArrival: boolean = false;
	
	/** Flag to indicate that the item is due to be transferred. */
	private transferring: boolean = false;
	
	
	//// Public Static Methods. ////
	
	/**
	 * Method for setting up listener for network flick arrivals.
	 * 
	 * @param {SynergyMeshApp} app The app the listener is to be used for.
	 */
	public static registerForNetworkFlick(app: SynergyMeshApp) {
		
		// Add network flick arrival listener.
		Networking.listenForMessage(NetworkFlickManager.FLICK_EVENT, function(data) {
		
			// Create new element and select it.
			let newElement = document.createElement('div');
			let svg = document.getElementById(CommonElements.APP_SVG);
			svg.appendChild(newElement);
			newElement.outerHTML = data['html'];
			let ele = d3.select('#' + data['id']);
			
			// Move element into place.
			Transformations.setTranslation(ele, data['pos'].x, data['pos'].y);

			// Add listeners to new element.
			let touchManager = new TouchManager(ele);
			let networkflickManager = new NetworkFlickManager(ele, app, touchManager);
			
			// TODO Run callback on new element.
			
			// TODO Flick new element.
			
			// TODO Fade in new element.
			ele.style('display', null);
			ele.style('opacity', 1);
			
			// TODO No friction until centre is in view.			

			
		});
		
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
				$(document.getElementById(this.ele.attr('id'))).fadeOut(NetworkFlickManager.FADE_TIME * 1000);
				
				// Get self.
				let self = this;
				
				// When the fade is done.
				setTimeout(function() {
					
					// Get element.
					let element = document.getElementById(self.ele.attr('id'));
					
					// Update object ID.
					let newId = 'tranfer-' + new Date().getTime();
					element.id = newId;
					
					// Send out transfer message.
					let objectToSend = <JSON>{};
					objectToSend['html'] = element.outerHTML;
					objectToSend['id'] = newId;
					objectToSend['pos'] =  self.posOnFlick;
					objectToSend['movement'] = self.movementInfo;
					Networking.sendMessageToRole(NetworkFlickManager.FLICK_EVENT, Roles.STUDENT, objectToSend);
				
					// Stop moving, remove item and self.
					self.stop();
					
					// Remove item and self.
					self.terminate();
					
				}, NetworkFlickManager.FADE_TIME * 1000);
				
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