import {SynergyMeshApp} from 'common/src/synergymesh_app';
import {TextItem} from 'common/src/items/text_item';
import {Transformations} from 'common/src/utils/transformations';
  
 /**
 * Protomysteries teacher app.
 */
export class ProtomysteriesTeacherApp extends SynergyMeshApp {

	/**
	 * Initialise a ProtomysteriesTeacherApp object.
	 */
	public constructor() {
		
		// Establish the environment.
		super();
		
	}
	
	/**
	 * Add the contents specific to this app.
	 */
	protected addContents() {
		
		// Add Freeze button.
		let freezeButton = new TextItem(this.svg, 'Freeze All Student Devices', 225, 25, 'freeze-button', 'freeze-bg', 'freeze-text');
		Transformations.setTranslation(freezeButton.asItem(), this.vizWidth/2, (this.vizHeight/2) - 100);
		freezeButton.asItem().on('mousedown', function() {
			
			// Send Ajax to server asking for the freeze broadcast to be sent.
			$.ajax({ 
				type: 'POST',
				url: '../server/input.php',
				data: 'command=freeze',
				async: true
			});		
				
		});
		
		// Add Unfreeze button.
		let unfreezeButton = new TextItem(this.svg, 'Unfreeze All Student Devices', 225, 25, 'freeze-button', 'freeze-bg', 'freeze-text');
		Transformations.setTranslation(unfreezeButton.asItem(), this.vizWidth/2, (this.vizHeight/2) + 100);
		unfreezeButton.asItem().on('mousedown', function() {
			
			// Send Ajax to server asking for the unfreeze broadcast to be sent.
			$.ajax({ 
				type: 'POST',
				url: '../server/input.php',
				data: 'command=unfreeze',
				async: true
			});		
			
		});
		
	}
	
}
