/**
 * Class with static methods for supporting networking.
 */
export class Networking {
	
	
	//// Public Constants. ////
	
	/** Object for holding constant strings relating to networking events. */
	public static EVENTS = {
		
		/** Event for telling the server that the client is joining a session. */
		JOIN: 'join',
		
		/** Event for sending a message to all in a session */
		TO_ALL: 'to_all',
		
		/** Event for sending a message to a specific client in a session */
		TO_CLIENT: 'to_app',
		
		/** Event for sending a message to all in a specific app in a session */
		TO_APP: 'to_app',
		
		/** Event for sending a message to all of a specific role in a session */
		TO_ROLE: 'to_role',
		
		/** Event for sending a message to all of a specific role in a specific app in a session */
		TO_ROLE_IN_APP: 'to_app',
		
		/** Event for updating the client list. */
		UPDATE_CLIENTS: 'update_clients'
			
	};	
	
	/** Object for holding constant strings relating to networking message elements. */
	public static MESSAGE = {			
		
		/** The list of clients used in a client update. */
		CLIENTS: 'clients',				
		
		/** The actual contents of the message to be used by the app. */
		CONTENTS: 'contents',			
		
		/** The name of the event to send to the client. */
		EVENT_NAME: 'event_name',			
		
		/** The target app for the message. */
		TARGET_APP: 'target_app',		
		
		/** The target client for the message. */
		TARGET_CLIENT: 'target_client',
		
		/** The target role for the message. */
		TARGET_ROLE: 'target_role',
		
		/** The target session for the message. */
		TARGET_SESSION: 'target_session'
		
	}
	
	
	//// Public Static Variables. ////
	
	/** Multi-dimensional array of clients currently connected to the same session. */
	public static clients = [];	
	
	/** The flag to set if the debugging is shown. */
	public static debug: boolean = false;
	
	/** The static API for accessing Socket.io features set in the bootstrap. */
	public static io: SocketIOClientStatic;
	
	
	//// Private Static Variables. ////
	
	
	
	/** The session to connect to. */
	private static session: string;
	
	/** Socket io instance. */
	private static socket;
	
	
	/**
	 * Initialise the socket io instance connected to the server on the same host.
	 * 
	 * @param {string} host The protocol and name of the host.
	 * @param {string} port The port of the host.
	 * @param {string} session The session to connect to.
	 * @param {string} role The role of the app user..
	 * @param {string} app he app being run.
	 * 
	 */
	public static establishConnection (host: string, port: string, session: string, role: string, app: string): void { 
		
		// Establish socket.
		Networking.socket = Networking.io.connect(host + ':' + port);
		Networking.debugMessage('Connected to server.');
		
		// Store passed values.
		Networking.session = session;
		
		// Listen for the clients list being updated.
		Networking.socket.on(Networking.EVENTS.UPDATE_CLIENTS, function(message){
			Networking.clients = message[Networking.MESSAGE.CLIENTS];
			Networking.debugMessage('Clients list updated.');
		});
		
		// Establish join object.
		let messageToSend = {};
		messageToSend[Networking.MESSAGE.TARGET_SESSION] = session;
		messageToSend[Networking.MESSAGE.TARGET_ROLE] = role;
		messageToSend[Networking.MESSAGE.TARGET_APP] = app;
			
		// Join the session (or establish it) on the server.
		Networking.socket.emit(Networking.EVENTS.JOIN, messageToSend);	
		Networking.debugMessage('Joined session ' + session + ' on server,');
		
	}	
	
	/**
	 * Set up a listener for server-side events.
	 * 
	 * @param {string} eventName The name of the event to listen for.
	 * @param {(data: JSON) => void)} callback Function to handle incoming message.
	 */
	public static listenForMessage (eventName: string, callback: (message: JSON) => void): void {
		
		// Establish listener for any messages that calls the passed function.
		Networking.socket.on(eventName, function(message){
			
				// Call the callback.
				Networking.debugMessage('Received a message for the following network event: ' + eventName + '.');
				callback(message);
			
		});		
	}
	
	/**
	 * Send a command to the server asking for it to be broadcast to all clients in the session.
	 * 
	 * @param {string} eventName The name of the event to listen for.
	 * @param {JSON} messageToSend The message to be sent.
	 */
	public static sendMessageToAll (eventName: string, messageToSend: JSON): void {		
	
		// Create JSON wrapper for sending message.
		let wrappedMessageToSend = {};
		wrappedMessageToSend[Networking.MESSAGE.EVENT_NAME] = eventName;
		wrappedMessageToSend[Networking.MESSAGE.TARGET_SESSION] = Networking.session;
		wrappedMessageToSend[Networking.MESSAGE.CONTENTS] = messageToSend;
		
		// Send message.
		Networking.socket.emit(Networking.EVENTS.TO_ALL, wrappedMessageToSend);		
		Networking.debugMessage('Sent network message to all in session');
			
	}
	
	/**
	 * Send a command to the server asking for it to be broadcast to all clients in the session 
	 * of a specific role.
	 * 
	 * @param {string} eventName The name of the event to listen for.
	 * @param {string} role The role to send messages to.
	 * @param {JSON} messageToSend The message to be sent.
	 */
	public static sendMessageToRole (eventName: string, role: string, messageToSend: JSON): void{		
	
		// Create JSON wrapper for sending message.
		let wrappedMessageToSend = {};
		wrappedMessageToSend[Networking.MESSAGE.EVENT_NAME] = eventName;
		wrappedMessageToSend[Networking.MESSAGE.TARGET_SESSION] = Networking.session;
		wrappedMessageToSend[Networking.MESSAGE.TARGET_ROLE] = role;
		wrappedMessageToSend[Networking.MESSAGE.CONTENTS] = messageToSend;
		
		// Send message.
		Networking.socket.emit(Networking.EVENTS.TO_ROLE, wrappedMessageToSend);		
		Networking.debugMessage('Sent network message to all in session with the ' + role + ' role.');
			
	}
	
	/**
	 * Send a message to the server asking for it to be broadcast to all clients in the session 
	 * in a specific app.
	 * 
	 * @param {string} eventName The name of the event to listen for.
	 * @param {string} app The app to send messages to.
	 * @param {JSON} messageToSend The message to be sent.
	 */
	public static sendMessageToApp (eventName: string, app: string, messageToSend: JSON): void {		
	
		// Create JSON wrapper for sending message.
		let wrappedMessageToSend = {};
		wrappedMessageToSend[Networking.MESSAGE.EVENT_NAME] = eventName;
		wrappedMessageToSend[Networking.MESSAGE.TARGET_SESSION] = Networking.session;
		wrappedMessageToSend[Networking.MESSAGE.TARGET_APP] = app;
		wrappedMessageToSend[Networking.MESSAGE.CONTENTS] = messageToSend;
		
		// Send message.
		Networking.socket.emit(Networking.EVENTS.TO_APP, wrappedMessageToSend);		
		Networking.debugMessage('Sent network message to all in session in the ' + app + ' app.');
			
	}
	
	/**
	 * Send a message to the server asking for it to be broadcast to all clients in the session 
	 * with a specific role in a specific app.
	 * 
	 * @param {string} eventName The name of the event to listen for.
	 * @param {string} role The role to send messages to.
	 * @param {string} app The app to send messages to.
	 * @param {JSON} messageToSend The message to be sent.
	 */
	public static sendMessageToRoleInApp (eventName: string, role: string, app: string, messageToSend: JSON): void {		
	
		// Create JSON wrapper for sending message.
		let wrappedMessageToSend = {};
		wrappedMessageToSend[Networking.MESSAGE.EVENT_NAME] = eventName;
		wrappedMessageToSend[Networking.MESSAGE.TARGET_SESSION] = Networking.session;
		wrappedMessageToSend[Networking.MESSAGE.TARGET_ROLE] = role;
		wrappedMessageToSend[Networking.MESSAGE.TARGET_APP] = app;
		wrappedMessageToSend[Networking.MESSAGE.CONTENTS] = messageToSend;
		
		// Send message.
		Networking.socket.emit(Networking.EVENTS.TO_ROLE_IN_APP, wrappedMessageToSend);		
		Networking.debugMessage('Sent network message to all in session with the ' + role + ' role in the ' + app + ' app.');
			
	}
	
	/**
	 * Send a command to the server asking for it to be broadcast to a specific client.
	 * 
	 * @param {string} eventName The name of the event to listen for.
	 * @param {string} targetClient The socket id of the client to sent the message to..
	 * @param {JSON} messageToSend The message to be sent.
	 */
	public static sendMessageToSpecificClient (eventName: string, targetClient: string, messageToSend: JSON): void {		
	
		// Create JSON wrapper for sending message.
		let wrappedMessageToSend = {};
		wrappedMessageToSend[Networking.MESSAGE.EVENT_NAME] = eventName;
		wrappedMessageToSend[Networking.MESSAGE.TARGET_CLIENT] = targetClient;
		wrappedMessageToSend[Networking.MESSAGE.CONTENTS] = messageToSend;
		
		// Send message.
		Networking.socket.emit(Networking.EVENTS.TO_CLIENT, wrappedMessageToSend);		
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
