/// <reference path='../../../lib/typings/socket.io-client-1.4.4.d.ts' />
  
 /**
 * Class with static methods for supporting networking.
 */
export class Networking {
	
	/** The port number of the server. */
	public static PORT: number = 3000; // TODO Add method to supply host through config.
	
	/** Identifier for student joining server event. */
	public static EVENTS_STUDENTS_JOIN = 'join_students';
	
	/** Identifier for student joining server event. */
	public static EVENTS_STUDENTS_TO = 'to_students';
	
	/** Identifier for student joining server event. */
	public static EVENTS_STUDENTS_UPDATE = 'update_students';
	
	/** Identifier for student joining server event. */
	public static EVENTS_TEACHERS_JOIN = 'join_teachers';
	
	/** Identifier for student joining server event. */
	public static EVENTS_TEACHERS_TO = 'to_teachers';
	
	/** Identifier for student joining server event. */
	public static EVENTS_TEACHERS_UPDATE= 'update_teachers';
	
	/** Identifier for student joining server event. */
	public static EVENTS_CLIENT_TO= 'to_client';
	
	/** Identifier for student joining server event. */
	public static EVENTS_MESSAGE = 'message';
	
	/** The target field for messages sent to specific client. */
	public static TO_TARGET: string = 'target';
	
	/** The message field for messages sent to specific client. */
	public static TO_MESSAGE: string = 'message';
	
	
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
		
		// Check if student or teacher.
		if (!isTeacher) {
			
			// Establish self as student.
			Networking.socket.emit(Networking.EVENTS_STUDENTS_JOIN, {});	
			console.log('Joined students on server,');
				
		} else {
			
			// Establish self as teacher.
			Networking.socket.emit(Networking.EVENTS_TEACHERS_JOIN, {});	
			console.log('Joined teachers on server.');
			
		}
		
		// Listen for the students list being updated.
		Networking.socket.on(Networking.EVENTS_STUDENTS_UPDATE, function(message){
			Networking.students = message['students'];
			console.log('Student list updated.');
		});
		
		// Listen for the teachers list being updated.
		Networking.socket.on(Networking.EVENTS_TEACHERS_UPDATE, function(message){
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
		let host = (<any>window).location.host;
		host = host.split(':')[0];
		return  (<any>window).location.protocol + '//' + host;
	}
	
	/**
	 * Set up a listener for server-side events.
	 * 
	 * @param {(data: JSON) => void)} callback Function to handle incoming message.
	 */
	public static listenForMessage(callback: (message: JSON) => void) {
		
		// Establish listener for any messages that calls the passed function.
		Networking.socket.on(Networking.EVENTS_MESSAGE, function(message){
			
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
		Networking.socket.emit(Networking.EVENTS_STUDENTS_TO, messageToSend);		
		console.log('Sent this message to students: ' + JSON.stringify(messageToSend));	
			
	}
	
	/**
	 * Send a command to the server asking for it to be broadcast to teachers.
	 * 
	 * @param {JSON} messageToSend The message to be sent.
	 */
	public static sendMessageToTeachers(messageToSend: JSON) {		
		
		// Send message.
		Networking.socket.emit(Networking.EVENTS_TEACHERS_TO, messageToSend);		
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
		wrappedMessageToSend[Networking.TO_TARGET] = targetClient;
		wrappedMessageToSend[Networking.TO_MESSAGE] = messageToSend;
		
		// Send message.
		Networking.socket.emit(Networking.EVENTS_CLIENT_TO, wrappedMessageToSend);		
		console.log('Sent this message to ' + targetClient + ': ' + JSON.stringify(messageToSend));	
			
	}
	
}
