// TODO Update wiki with instructions to first run the setup batch file for their OS or run the following to install:
 // npm install socket.io
 // npm install express
// Then run the server with:
 // node ...../SynergyMesh/server/start.js

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
var students = {};
var teachers = {};

//TODO On connect store client in student or teacher list as appropriate.

//TODO Announce both lists to all clients on connect and disconnect.

//TODO Provide method of passing a message to all teacher or to all clients (except self).

//TODO Provide method of passing a message to a specific client.


io.on('connection', function (socket) {
	
	// Flag to check the client has been registered.
	var addedUser = false;

	// Listen for a student joining.
	socket.on('join_students', function (data) {
		
		// Don't continue if this user has already been added.
		if (addedUser){
			return;
		}
	  
		// Add client id to students list.
		students.push(socket.id);
	  
		// Establish data to send (i.e. student list).
		var studentsJson = {
				students: students
		};
	  
		// Broadcast updated student list to all clients (including self).
		socket.emit('update_students', studentsJson);
		
		// Record that this user is now added to the client lists.
		addedUser = true;
	  
	});
	
	// Listen for a message to all students.
	socket.on('to_students', function (data) {
		
		// Loop through students.
		for (var i = 0; i < students.length; i++) {
		
			// Check client isn't the source of the message.
			if (socket.id != students[i]) {
				
				// Send message to client.
				socket.to(socket.id).emit('update_students', studentsJson);
				
			}		
		}	  
	});
	
  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {

    	// TODO Remove from relevant list and announce that list to all.
    	
    }
  });
});