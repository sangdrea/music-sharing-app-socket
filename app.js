var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
	console.log("someone has connected");
	socket.on('event:new:audio', function(data) {
		console.log("new audio!!!!!");
		socket.broadcast.emit('event:incoming:audio', data);
	});
});

server.listen(8000, function() {
	console.log('Socket.io Running');
});
