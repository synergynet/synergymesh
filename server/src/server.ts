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
let students: string[] = [];
let teachers: string[] = [];

// Set up connection environment.
io.on('connection', function (socket: SocketIO.Socket) {
	
	// Flag to check the client has been registered.
	let addedClient = false;
	
	// Listen for a student joining.
	socket.on(Networking.EVENTS_STUDENTS_JOIN, function (data: JSON) {
		
		// Don't continue if this user has already been added.
		if (addedClient){
			return;
		}
	  
		// Add client id to students list.
		students.push(socket.id);
		console.log(socket.id + ' joined students.');
	  
		// Establish data to send (i.e. student list).
		let studentsJson = {
				students: students
		};
	  
		// Broadcast updated student list to all clients (including self).
		socket.emit(Networking.EVENTS_STUDENTS_UPDATE, studentsJson);
		console.log('Announced students list to all.');
		
		// Record that this user is now added to the client lists.
		addedClient = true;
	  
	});	
	
	
	// Listen for a teacher joining.
	socket.on(Networking.EVENTS_STUDENTS_JOIN, function (data: JSON) {
		
		// Don't continue if this user has already been added.
		if (addedClient){
			return;
		}
	  
		// Add client id to teachers list.
		teachers.push(socket.id);
		console.log(socket.id + ' joined teachers.');
	  
		// Establish data to send (i.e. student list).
		let teachersJson = {
				teachers: teachers
		};
	  
		// Broadcast updated teacher list to all clients (including self).
		socket.emit(Networking.EVENTS_TEACHERS_UPDATE, teachersJson);
		console.log('Announced teachers list to all.');
		
		// Record that this user is now added to the client lists.
		addedClient = true;
	  
	});
	
	
	// Listen for a message to all students.
	socket.on(Networking.EVENTS_STUDENTS_TO, function (data: JSON) {
		
		// Loop through students.
		for (let i = 0; i < students.length; i++) {
		
			// Check client isn't the source of the message.
			if (socket.id != students[i]) {
				
				// Send message to client.
				socket.to(students[i]).emit(Networking.EVENTS_MESSAGE, data);
				
			}		
		}
		console.log('Sent this message to students: ' + JSON.stringify(data));	
		
	});
	
	
	// Listen for a message to all teachers.
	socket.on(Networking.EVENTS_TEACHERS_TO, function (data: JSON) {
		
		// Loop through teachers.
		for (let i = 0; i < teachers.length; i++) {
		
			// Check client isn't the source of the message.
			if (socket.id != teachers[i]) {
				
				// Send message to client.
				socket.to(teachers[i]).emit(Networking.EVENTS_MESSAGE, data);
				
			}		
		}
		console.log('Sent this message to teachers: ' + JSON.stringify(data));	
		
	});	
	
	
	// Listen for a message to a specific client.
	socket.on(Networking.EVENTS_CLIENT_TO, function (data: JSON) {
		
		// Get target client from data.
		let clientTarget = data[Networking.TO_TARGET];
		
		// Send message to client.
		socket.to(clientTarget).emit(Networking.EVENTS_MESSAGE, data[Networking.TO_MESSAGE]);
		console.log('Sent this message to ' + clientTarget + ': ' + JSON.stringify(data[Networking.TO_MESSAGE]));	
		
	});
	
	
	// When the use is disconnected remove them from their corresponding list.
	socket.on('disconnect', function () {
		
		// Check the client has been added.
		if (addedClient) {
			
			// Check if the user is in the students list.
			if (students.indexOf(socket.id) > -1) {
				
				// Remove user from students list.
				students.splice(students.indexOf(socket.id), 1);
				console.log(socket.id + ' left students.');
				
				// Establish data to send (i.e. student list).
				let studentsJson = {
						students: students
				};
				
				// Broadcast updated student list to all clients (including self).
				socket.emit(Networking.EVENTS_STUDENTS_UPDATE, studentsJson);
				console.log('Announced students list to all.');
				
			// Check if the user is in the teachers list.	
			} else if (teachers.indexOf(socket.id) > -1) {
				
				// Remove user from teachers list.
				teachers.splice(teachers.indexOf(socket.id), 1);
				console.log(socket.id + ' left teachers.');
				
				// Establish data to send (i.e. student list).
				let teachersJson = {
						teachers: teachers
				};
			  
				// Broadcast updated teacher list to all clients (including self).
				socket.emit(Networking.EVENTS_TEACHERS_UPDATE, teachersJson);
				console.log('Announced teachers list to all.');
				
			}
		
			// Record that this user is no longer added to a client list.
			addedClient = false;
			
		}
	});
	
});