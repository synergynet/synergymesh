/// <reference path='../../lib/typings/socket.io-1.4.4.d.ts' />

import {Networking} from '../../common/src/utils/networking';
import {Config} from '../../common/src/utils/config';

// Get config.
Config.getConfigOnServer();

// Setup basic server.
let server = require('http').createServer();

// Set up Socket.
let io: SocketIO.Server = require('socket.io')(server);

// Start server running on port.
let port = Config.getConfigValue(Config.SERVER_PORT);
server.listen(port, function () {
  console.log('Server listening at port ' + port);
});

// Establish client lists.
let clients = {};

// Set up connection environment.
io.on('connection', function (socket: SocketIO.Socket) {
	
	// Flag to check the client has been registered.
	let addedClient = false;
	
	// Listen for a client joining.
	socket.on(Networking.EVENTS.JOIN, function (data: JSON) {
		
		// Don't continue if this user has already been added.
		if (addedClient){
			return;
		}
		
		// Get session, role and app from data.
		let session = data[Networking.MESSAGE.TARGET_SESSION];
		let role = data[Networking.MESSAGE.TARGET_ROLE];
		let app = data[Networking.MESSAGE.TARGET_APP];
		
		// Create session if it doesn't already exist.
		if (!(session in clients)){
			clients[session] = {};
		}
		
		// Create role in session if it doesn't already exist.
		if (!(role in clients[session])){
			clients[session][role] = {};
		}
		
		// Create app for role if it doesn't already exist.
		if (!(app in clients[session][role])){
			clients[session][role][app] = [];
		}
	  
		// Add client id to the appropriate list.
		clients[session][role][app].push(socket.id);
		console.log(socket.id + ' joined ' + session + ' as a ' + role + ' in the app ' + app + '.');
	  
		// Establish data to send (i.e. client list).
		let clientsJson = {};
		clientsJson[Networking.MESSAGE.CLIENTS] = clients[session]; 
	  
		// Broadcast data to send to all clients (including self).
		socket.emit(Networking.EVENTS.UPDATE_CLIENTS, clientsJson);	
		for (let roleKey in clients[session]) {
			for (let appKey in clients[session][roleKey]) {
				for (let targetClient of clients[session][roleKey][appKey]) {	
					socket.to(targetClient).emit(Networking.EVENTS.UPDATE_CLIENTS, clientsJson);				
				}
			}
		}
		console.log('Announced clients list to all in session.');	
		
		// Record that this user is now added to the client lists.
		addedClient = true;
	  
	});	
		
	
	// Listen for a message to all clients in a session.
	socket.on(Networking.EVENTS.TO_ALL, function (data: JSON) {
		
		// Get event name from data.
		let eventName = data[Networking.MESSAGE.EVENT_NAME];
		
		// Get session from data.
		let session = data[Networking.MESSAGE.TARGET_SESSION];
		
		// Broadcast data to send to all clients in session (excluding self).
		for (let roleKey in clients[session]) {
			for (let appKey in clients[session][roleKey]) {
				for (let tagretClient of clients[session][roleKey][appKey]) {			
					if (socket.id != tagretClient) {
						socket.to(tagretClient).emit(eventName, data[Networking.MESSAGE.CONTENTS]);
					}	
				}
			}
		}
		console.log(socket.id + ' sent a message to all in session ' + session + '.');	
		
	});
		
	
	// Listen for a message to all clients with a s specific role in a session.
	socket.on(Networking.EVENTS.TO_ROLE, function (data: JSON) {
		
		// Get event name from data.
		let eventName = data[Networking.MESSAGE.EVENT_NAME];
		
		// Get session from data.
		let session = data[Networking.MESSAGE.TARGET_SESSION];
		
		// Get role from data.
		let roleKey = data[Networking.MESSAGE.TARGET_ROLE];
		
		// Broadcast data to send to all clients in target role in session (excluding self).
		if (roleKey in clients[session]) {
			for (let appKey in clients[session][roleKey]) {	
				for (let targetClient of clients[session][roleKey][appKey]) {			
					if (socket.id != targetClient) {
						socket.to(targetClient).emit(eventName, data[Networking.MESSAGE.CONTENTS]);
					}	
				}
			}
		}
		console.log(socket.id + ' sent a message to all in session ' + session + ' with ' + roleKey + ' role.');	
		
	});
	
	
	// Listen for a message to all clients in a specific app in a session.
	socket.on(Networking.EVENTS.TO_APP, function (data: JSON) {
		
		// Get event name from data.
		let eventName = data[Networking.MESSAGE.EVENT_NAME];
		
		// Get session from data.
		let session = data[Networking.MESSAGE.TARGET_SESSION];
		
		// Get app from data.
		let appKey = data[Networking.MESSAGE.TARGET_APP];
		
		// Broadcast data to send to all clients in target role in session (excluding self).
		for (let roleKey in clients[session]) {
			if (appKey in clients[session][roleKey]) {
				for (let targetClient of clients[session][roleKey][appKey]) {			
					if (socket.id != targetClient) {
						socket.to(targetClient).emit(eventName, data[Networking.MESSAGE.CONTENTS]);
					}	
				}
			}
		}
		console.log(socket.id + ' sent a message to all in session ' + session + ' in ' + appKey + ' app.');	
		
	});
	
	// Give ability to send to all clients with a specific role with a specific role in a specific app in a session. 	
	socket.on(Networking.EVENTS.TO_ROLE_IN_APP, function (data: JSON) {
		
		// Get event name from data.
		let eventName = data[Networking.MESSAGE.EVENT_NAME];
		
		// Get session from data.
		let session = data[Networking.MESSAGE.TARGET_SESSION];
		
		// Get role from data.
		let roleKey = data[Networking.MESSAGE.TARGET_ROLE];
		
		// Get app from data.
		let appKey = data[Networking.MESSAGE.TARGET_APP];
		
		// Broadcast data to send to all clients in target role in session (excluding self).
		if (roleKey in clients[session]) {
			if (appKey in clients[session][roleKey]) {
				for (let targetClient of clients[session][roleKey][appKey]) {			
					if (socket.id != targetClient) {
						socket.to(targetClient).emit(eventName, data[Networking.MESSAGE.CONTENTS]);
					}	
				}
			}
		}
		console.log(socket.id + ' sent a message to all in session ' + session + ' with ' + roleKey + ' role in ' + appKey + ' app.');	
		
	});
	
	
	// Listen for a message to a specific client.
	socket.on(Networking.EVENTS.TO_CLIENT, function (data: JSON) {
		
		// Get event name from data.
		let eventName = data[Networking.MESSAGE.EVENT_NAME];
		
		// Get target client from data.
		let clientTarget = data[Networking.MESSAGE.TARGET_CLIENT];
		
		// Send message to client.
		socket.to(clientTarget).emit(eventName, data[Networking.MESSAGE.CONTENTS]);
		console.log(socket.id + ' sent a message to client ' + clientTarget + '.');
		
	});
	
	
	// When the use is disconnected remove them from their corresponding list.
	socket.on('disconnect', function () {
		
		// Check the client has been added.
		if (addedClient) {
			
			// Loop through client list to find client.
			let targetSession;
			let targetRole;
			let targetApp;
			for (let sessionKey in clients) {
				for (let roleKey in clients[sessionKey]) {
					for (let appKey in clients[sessionKey][roleKey]) {
						if (clients[sessionKey][roleKey][appKey].indexOf(socket.id) > -1) {
							targetSession = sessionKey;
							targetRole = roleKey;
							targetApp = appKey;
							break;
						}
					}
					if (targetRole != null) {
						break;
					}
				}
				if (targetSession != null) {
					break;
				}
			}
			
			// Check that the client was found.
			if (targetApp != null) {
				
				// Remove the client from the client list.
				clients[targetSession][targetRole][targetApp].splice(clients[targetSession][targetRole][targetApp].indexOf(socket.id), 1);
				console.log(socket.id + ' left the session ' + targetSession + '.');
		
				// Delete apps/roles/sessions if they're empty.
				if (Object.keys(clients[targetSession][targetRole][targetApp]).length == 0) {
					delete clients[targetSession][targetRole][targetApp];
					if (Object.keys(clients[targetSession][targetRole]).length == 0) {
						delete clients[targetSession][targetRole];
						if (Object.keys(clients[targetSession]).length == 0) {
							delete clients[targetSession];
						}
					}
				}
				
				// Check there's still clients to send to in this session.
				if (targetSession in clients) {
				
					// Establish data to send (i.e. client list).
					let clientsJson = {
						clients: clients[targetSession]
					};
				  
					// Broadcast data to send to all clients (including self).
					for (let roleKey in clients[targetSession]) {
						for (let appKey in clients[targetSession][roleKey]) {
							for (let targetClient of clients[targetSession][roleKey][appKey]) {			
								socket.to(targetClient).emit(Networking.EVENTS.UPDATE_CLIENTS, clientsJson);		
							}
						}
					}
					console.log('Announced clients list to all in session.');		
					
				}
				
			}
		
			// Record that this user is no longer added to a client list.
			addedClient = false;
			
		}
	});
	
});