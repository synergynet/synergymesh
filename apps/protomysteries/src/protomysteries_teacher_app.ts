import {Networking} from 'common/src/utils/networking';
import {SynergyMeshApp} from 'common/src/synergymesh_app';
import {TextItem} from 'common/src/items/text_item';
import {Transformations} from 'common/src/utils/transformations';
  
 /**
 * Protomysteries teacher app.
 */
export class ProtomysteriesTeacherApp extends SynergyMeshApp {
	
	/**
	 * Add the contents specific to this app.
	 */
	protected addContents() {
		
		// Announce presence to server.
		Networking.establishConnection(true);
		
		// Add Freeze button.
		let freezeButton = new TextItem(this.svg, 'Freeze All Student Devices', 225, 25, 'freeze-button', 'freeze-bg', 'freeze-text');
		Transformations.setTranslation(freezeButton.asItem(), this.vizWidth/2, (this.vizHeight/2) - 100);
		freezeButton.asItem().on('mousedown', function() {
			
			// Build message to send to students.
			let messageToSend = {};
			messageToSend['app'] = 'protomysteries';
			messageToSend['command'] = 'freeze';
			
			// Send message to server.
			Networking.sendMessageToStudents(<JSON>messageToSend);
				
		});
		
		// Add Unfreeze button.
		let unfreezeButton = new TextItem(this.svg, 'Unfreeze All Student Devices', 225, 25, 'freeze-button', 'freeze-bg', 'freeze-text');
		Transformations.setTranslation(unfreezeButton.asItem(), this.vizWidth/2, (this.vizHeight/2) + 100);
		unfreezeButton.asItem().on('mousedown', function() {
			
			// Build message to send to students.
			let messageToSend = {};
			messageToSend['app'] = 'protomysteries';
			messageToSend['command'] = 'unfreeze';
			
			// Send message to server.
			Networking.sendMessageToStudents(<JSON>messageToSend);
			
		});		
		
		// Signal app is ready.
		this.ready();
		
	}
	
}
