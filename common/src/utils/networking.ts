/**
 * Class with static methods for supporting networking.
 */
export class Networking {
	
	
	//// Public Constants. ////
	
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
	
	
	//// Public Static Variables. ////
	
	/** The flag to set if the debugging is shown. */
	public static debug: boolean = false;
	
	/** The static API for accessing Socket.io features set in the bootstrap. */
	public static io: SocketIOClientStatic;
	
	/** List of socket ids of teachers currently connected to the same server. */
	public static teachers: string[] = [];
	
	/** List of socket ids of students currently connected to the same server. */
	public static students: string[] = [];
	
	
	//// Private Static Variables. ////
	
	/** Socket io instance. */
	private static socket;
	
	
	/**
	 * Initialise the socket io instance connected to the server on the same host.
	 * 
	 * @param {string} host The protocol and name of the host.
	 * @param {string} port the port of the host.
	 * @param {boolean} isTeacher Flag to indicate whether the client is a teacher or student.
	 */
	public static establishConnection(host: string, port: string, isTeacher: boolean = false): void { 
	// TODO Use session name and role to set up what messages to get. 
		
		// Establish socket.
		Networking.socket = Networking.io.connect(host + ':' + port);
		Networking.debugMessage('Connected to server.');
		
		// Check if student or teacher.
		if (!isTeacher) {
			
			// Establish self as student.
			Networking.socket.emit(Networking.EVENTS_STUDENTS_JOIN, {});	
			Networking.debugMessage('Joined students on server,');
				
		} else {
			
			// Establish self as teacher.
			Networking.socket.emit(Networking.EVENTS_TEACHERS_JOIN, {});	
			Networking.debugMessage('Joined teachers on server.');
			
		}
		
		// Listen for the students list being updated.
		Networking.socket.on(Networking.EVENTS_STUDENTS_UPDATE, function(message){
			Networking.students = message['students'];
			Networking.debugMessage('Student list updated.');
		});
		
		// Listen for the teachers list being updated.
		Networking.socket.on(Networking.EVENTS_TEACHERS_UPDATE, function(message){
			Networking.teachers = message['teachers'];
			Networking.debugMessage('Teachers list updated.');
		});
		
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
				Networking.debugMessage('Received a message: ' + JSON.stringify(message));
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
		Networking.debugMessage('Sent this message to students: ' + JSON.stringify(messageToSend));	
			
	}
	
	/**
	 * Send a command to the server asking for it to be broadcast to teachers.
	 * 
	 * @param {JSON} messageToSend The message to be sent.
	 */
	public static sendMessageToTeachers(messageToSend: JSON) {		
		
		// Send message.
		Networking.socket.emit(Networking.EVENTS_TEACHERS_TO, messageToSend);		
		Networking.debugMessage('Sent this message to teachers: ' + JSON.stringify(messageToSend));	
			
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
		Networking.debugMessage('Sent this message to ' + targetClient + ': ' + JSON.stringify(messageToSend));	
			
	}
	
	
	//// Private Static Methods. ////
	
	/**
	 * Output message (if debugging enabled).
	 * 
	 * @param {string} message The message to output (maybe).
	 */
	private static debugMessage (message: string): void {
		if (Networking.debug) {
			console.log(message);
		}
	}
	
}
