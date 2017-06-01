/// <reference path='../../../lib/typings/socket.io-client-1.4.4.d.ts' />

import {SynergyMeshApp} from 'common/src/synergymesh_app';
import {Networking} from 'common/src/utils/networking';
   
  /**
 * Protomysteries shared utility functions.
 */
export class ProtomysteriesShared {
	
	/** Used to ignore duplicates of the same message. */
	private static lastMessageRecievedId: number = 0; 
	
	/**
	 * Set up a listener for server-side events.
	 * 
	 * @param {(data: JSON) => void)} callback Function to handle incoming message.
	 */
	public static listenForMessage(callback: (data: JSON) => void) {
		
		// TODO Listen with socket.io
		let socket = Networking.io.connect('http://localhost:3000'); // TODO Use the protocol + host.
		socket.on('connection', function(socket){
			socket.on('chat message', function(msg){
				console.log('message: ' + msg);
			});
		});
		
		// Check this browser can support Server-Sent Events.
		if (!!(<any>window).EventSource) {
			
			// Establish listener to server.
			let source = new EventSource('../server/output.php'); 
			source.addEventListener('message', function(e) {
				
				// Check message came from the same server this is hosted on.
				let host = Networking.getFullHost();
				if (e.origin == host ) {
					
					// Parse the JSON in the message.
					let data = JSON.parse(e.data); 
					
					// Check that this message hasn't been processed before.
					if (+data['id'] > ProtomysteriesShared.lastMessageRecievedId) {	
					
						// Call the callback.
						callback(data);
						
						// Update the record of which message was last processed.
						ProtomysteriesShared.lastMessageRecievedId = +data['id'];
					}
				}
			});
			
		} else {
		  	alert('Your browser does not support SynergyMesh\'s networking features.');
		}
		
	}
	
	/**
	 * Send a command to the server asking for it to be broadcast.
	 * 
	 * @param {string} command The command to be sent.
	 */
	public static sendMessage(command: string) {
		
		// TODO Send with Socket.io
//		let socket = io();
//		socket.emit('chat message', 'hello');

		
			
		// Send Ajax to server asking for the supplied command broadcast to be sent.
		$.ajax({ 
			type: 'POST',
			url: '../server/input.php',
			data: 'command=' + command,
			async: true
		});		
				
	}
	
}