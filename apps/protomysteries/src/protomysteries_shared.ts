 import {SynergyMeshApp} from 'common/src/synergymesh_app';
   
  /**
 * Protomysteries shared utility functions.
 */
export class ProtomysteriesShared {
	
	/**
	 * Send a command to the server asking for it to be broadcast.
	 * 
	 * @param {string} command The command to be sent.
	 */
	public static sendMessage(command: string) {
			
		// Send Ajax to server asking for the supplied command broadcast to be sent.
		$.ajax({ 
			type: 'POST',
			url: '../server/input.php',
			data: 'command=' + command,
			async: true
		});		
				
	}
	
}