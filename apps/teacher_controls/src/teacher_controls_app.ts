import {CommonNetworkEvents} from 'common/src/constants/common_network_events'; 
import {Networking} from 'common/src/utils/networking';
import {Roles} from 'common/src/constants/roles'; 
import {SynergyMeshApp} from 'common/src/synergymesh_app';
import {TextItem} from 'common/src/items/text_item';
import {Transformations} from 'common/src/utils/transformations';
  
 /**
 * Protomysteries teacher app.
 */
export class TeacherControlsApp extends SynergyMeshApp {
	
	/**
	 * Add the contents specific to this app.
	 */
	protected addContents() {
		
		// Establish app and role details.
		this.appName = 'Teacher Controls';
		this.role = Roles.TEACHER;
		
		// Announce presence to server.		
		this.establishNetworking();
		
		// Add Freeze button.
		let freezeButton = new TextItem(this.svg, 'Freeze All Student Devices', 225, 25, 'freeze-button', 'freeze-bg', 'freeze-text');
		Transformations.setTranslation(freezeButton.asItem(), this.vizWidth/2, (this.vizHeight/2) - 100);
		freezeButton.asItem().on('mousedown', function() {
			
			// Send message to server.
			Networking.sendMessageToRole(CommonNetworkEvents.FREEZE, Roles.STUDENT, <JSON>{});
				
		});
		
		// Add Unfreeze button.
		let unfreezeButton = new TextItem(this.svg, 'Unfreeze All Student Devices', 225, 25, 'freeze-button', 'freeze-bg', 'freeze-text');
		Transformations.setTranslation(unfreezeButton.asItem(), this.vizWidth/2, (this.vizHeight/2) + 100);
		unfreezeButton.asItem().on('mousedown', function() {
			
			// Send message to server.
			Networking.sendMessageToRole(CommonNetworkEvents.UNFREEZE, Roles.STUDENT, <JSON>{});
			
		});		
		
		// Signal app is ready.
		this.ready();
		
	}
	
}
