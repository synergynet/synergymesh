// TODO Update wiki with instructions to first run the setup batch file to install.

// TODO Refactor into TypeScript if the require/dependency collision can be solved.

// Define constant port.
var PORT = 3000;

// Setup basic server.
var server = require('http').createServer();

// Set up Socket.
var io = require('socket.io')(server);

// Start server running on port.
server.listen(PORT, function () {
  console.log('Server listening at port %d', PORT);
});

// Establish client lists.
var students = [];
var teachers = [];


io.on('connection', function (socket) {
	
	// Flag to check the client has been registered.
	var addedClient = false;
	
	// Listen for a student joining.
	socket.on('join_students', function (data) {
		
		// Don't continue if this user has already been added.
		if (addedClient){
			return;
		}
	  
		// Add client id to students list.
		students.push(socket.id);
		console.log(socket.id + ' joined students.');
	  
		// Establish data to send (i.e. student list).
		var studentsJson = {
				students: students
		};
	  
		// Broadcast updated student list to all clients (including self).
		socket.emit('update_students', studentsJson);
		console.log('Announced students list to all.');
		
		// Record that this user is now added to the client lists.
		addedClient = true;
	  
	});
	
	
	// Listen for a message to all students.
	socket.on('to_students', function (data) {
		
		// Loop through students.
		for (var i = 0; i < students.length; i++) {
		
			// Check client isn't the source of the message.
			if (socket.id != students[i]) {
				
				// Send message to client.
				socket.to(students[i]).emit('message', data);
				
			}		
		}
		console.log('Sent this message to students: ' + JSON.stringify(data));	
		
	});	
	
	
	// Listen for a teacher joining.
	socket.on('join_teachers', function (data) {
		
		// Don't continue if this user has already been added.
		if (addedClient){
			return;
		}
	  
		// Add client id to teachers list.
		teachers.push(socket.id);
		console.log(socket.id + ' joined teachers.');
	  
		// Establish data to send (i.e. student list).
		var teachersJson = {
				teachers: teachers
		};
	  
		// Broadcast updated teacher list to all clients (including self).
		socket.emit('update_teachers', teachersJson);
		console.log('Announced teachers list to all.');
		
		// Record that this user is now added to the client lists.
		addedClient = true;
	  
	});
	
	
	// Listen for a message to all teachers.
	socket.on('to_teachers', function (data) {
		
		// Loop through teachers.
		for (var i = 0; i < teachers.length; i++) {
		
			// Check client isn't the source of the message.
			if (socket.id != teachers[i]) {
				
				// Send message to client.
				socket.to(teachers[i]).emit('message', data);
				
			}		
		}
		console.log('Sent this message to teachers: ' + JSON.stringify(data));	
		
	});	
	
	
	// Listen for a message to a specific client.
	socket.on('to_client', function (data) {
		
		// Get target client from data.
		var clientTarget = data.target;
		
		// Send message to client.
		socket.to(clientTarget).emit('message', data.message);
		console.log('Sent this message to ' + clientTarget + ': ' + JSON.stringify(data.message));	
		
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
				var studentsJson = {
						students: students
				};
				
				// Broadcast updated student list to all clients (including self).
				socket.emit('update_students', studentsJson);
				console.log('Announced students list to all.');
				
			// Check if the user is in the teachers list.	
			} else if (teachers.indexOf(socket.id) > -1) {
				
				// Remove user from teachers list.
				teachers.splice(teachers.indexOf(socket.id), 1);
				console.log(socket.id + ' left teachers.');
				
				// Establish data to send (i.e. student list).
				var teachersJson = {
						teachers: teachers
				};
			  
				// Broadcast updated teacher list to all clients (including self).
				socket.emit('update_teachers', teachersJson);
				console.log('Announced teachers list to all.');
				
			}
		
			// Record that this user is no longer added to a client list.
			addedClient = false;
			
		}
	});
	
	
});