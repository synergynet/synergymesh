// TODO Update wiki with instructions to first run the setup batch file for their OS or run the following to install:
 // npm install socket.io
 // npm install express
// Then run the server with:
 // node ...../SynergyMesh/server/start.js

// TODO Refactor into TypeScript if the require/dependency collision can be solved.

// Define constant port.
var PORT = 3000;

// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);

// Set up Socket.
var io = require('socket.io')(server);

// Start server running on port.
server.listen(PORT, function () {
  console.log('Server listening at port %d', PORT);
});

// Establish routing.
app.use(express.static(__dirname + '/public'));

//TODO On connect store client in student or teacher list as appropriate.

//TODO Announce both lists to all clients on connect and disconnect.

//TODO Provide method of passing a message to all teacher or to all clients (except self).

//TODO Provide method of passing a message to a specific client.

// Chatroom

var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    
    console.log('adding user: ' + username);
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});