// TODO Maybe this could all be in the networking class 

// TODO Also need sendMessageToStudents, sendMessageToClient and to keep track of student/teacher lists.

import {Networking} from 'common/src/utils/networking';
   
  /**
 * Protomysteries shared utility functions.
 */
export class ProtomysteriesShared {
	
	/** Socket io instance. */
	private static socket;
	
	/**
	 * Initialise the socket io instance connected to the server connected on the same host.
	 * 
	 * @param {boolean} isTeacher Flag to indicate whether the client is a teacher or student.
	 */
	public static establishConnection(isTeacher: boolean = false): void {
		
		// Establish socket.
		ProtomysteriesShared.socket = Networking.io.connect(Networking.getFullHost() + ':' + Networking.PORT);
		console.log('Connected to server.');
		
		// Check if teacher or student.
		if (isTeacher) {
			
			// Establish self as teacher.
			ProtomysteriesShared.socket.emit('join_teachers', {});	
			console.log('Joined teachers on server,');
				
		} else {
			
			// Establish self as student.
			ProtomysteriesShared.socket.emit('join_students', {});	
			console.log('Joined students on server,');
			
		}
		
	}
	
	/**
	 * Set up a listener for server-side events.
	 * 
	 * @param {(data: JSON) => void)} callback Function to handle incoming message.
	 */
	public static listenForMessage(callback: (command: string) => void) {
		
		// Establish listener for any messages that calls the passed function.
		ProtomysteriesShared.socket.on('message', function(message){
			
				// Call the callback.
				console.log('Received a message: ' + JSON.stringify(message));
				callback(message['command']);
			
		});		
	}
	
	/**
	 * Send a command to the server asking for it to be broadcast.
	 * 
	 * @param {string} command The command to be sent.
	 */
	public static sendMessageToStudents(command: string) {		
		
		// Establish message to send.
		let messageToSend = {};
		messageToSend['command'] = command;
		
		
		// Send message.
		ProtomysteriesShared.socket.emit('to_students', messageToSend);		
		console.log('Sent this message to students: ' + JSON.stringify(messageToSend));	
			
	}
	
}