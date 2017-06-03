/// <reference path='../../../lib/typings/socket.io-client-1.4.4.d.ts' />
  
 /**
 * Class with static methods for supporting networking.
 */
export class Networking {
	
	/** The port number of the server. */
	public static PORT = 3000;
	
	/** The static API for accessing Socket.io features set in the bootstrap. */
	public static io: SocketIOClientStatic;
	
	/** List of socket ids of teachers currently connected to the same server. */
	public static teachers: string[] = [];
	
	/** List of socket ids of students currently connected to the same server. */
	public static students: string[] = [];
	
	/** Socket io instance. */
	private static socket;
	
	/**
	 * Initialise the socket io instance connected to the server on the same host.
	 * 
	 * @param {boolean} isTeacher Flag to indicate whether the client is a teacher or student.
	 */
	public static establishConnection(isTeacher: boolean = false): void {
		
		// Establish socket.
		Networking.socket = Networking.io.connect(Networking.getFullHost() + ':' + Networking.PORT);
		console.log('Connected to server.');
		
		// Check if teacher or student.
		if (isTeacher) {
			
			// Establish self as teacher.
			Networking.socket.emit('join_teachers', {});	
			console.log('Joined teachers on server.');
				
		} else {
			
			// Establish self as student.
			Networking.socket.emit('join_students', {});	
			console.log('Joined students on server,');
			
		}
		
		// Listen for the students list being updated.
		Networking.socket.on('update_students', function(message){
			Networking.students = message['students'];
			console.log('Student list updated.');
		});
		
		// Listen for the teachers list being updated.
		Networking.socket.on('update_teachers', function(message){
			Networking.teachers = message['teachers'];
			console.log('Teachers list updated.');
		});
		
	}	
	
	/**
	 * Returns the current host and its protocol.
	 * 
	 * @param {string} The host and its protocol.
	 */
	private static getFullHost(): string {
		return  (<any>window).location.protocol + '//' + (<any>window).location.host;
	}
	
	/**
	 * Set up a listener for server-side events.
	 * 
	 * @param {(data: JSON) => void)} callback Function to handle incoming message.
	 */
	public static listenForMessage(callback: (message: JSON) => void) {
		
		// Establish listener for any messages that calls the passed function.
		Networking.socket.on('message', function(message){
			
				// Call the callback.
				console.log('Received a message: ' + JSON.stringify(message));
				callback(message);
			
		});		
	}
	
	/**
	 * Send a command to the server asking for it to be broadcast to students.
	 * 
	 * @param {JSON} messageToSend The message to be sent.
	 */
	public static sendMessageToStudents(messageToSend: JSON) {		
		
		// Send message.
		Networking.socket.emit('to_students', messageToSend);		
		console.log('Sent this message to students: ' + JSON.stringify(messageToSend));	
			
	}
	
	/**
	 * Send a command to the server asking for it to be broadcast to teachers.
	 * 
	 * @param {JSON} messageToSend The message to be sent.
	 */
	public static sendMessageToTeachers(messageToSend: JSON) {		
		
		// Send message.
		Networking.socket.emit('to_teachers', messageToSend);		
		console.log('Sent this message to teachers: ' + JSON.stringify(messageToSend));	
			
	}
	
	/**
	 * Send a command to the server asking for it to be broadcast to a specific client.
	 * 
	 * @param {string} targetClient The socket id of the client to sent the message to..
	 * @param {JSON} messageToSend The message to be sent.
	 */
	public static sendMessageToSpecificClient(targetClient: string, messageToSend: JSON) {		
	
		// Create JSON wrapper for sending message.
		let wrappedMessageToSend = {};
		wrappedMessageToSend['target'] = targetClient;
		wrappedMessageToSend['message'] = messageToSend;
		
		// Send message.
		Networking.socket.emit('to_client', wrappedMessageToSend);		
		console.log('Sent this message to ' + targetClient + ': ' + JSON.stringify(messageToSend));	
			
	}
	
}
