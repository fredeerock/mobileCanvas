var port = 3012;

var server = require('http').createServer().listen(port, function() {
	console.log("server listening on port " + port);
});

var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
	socket.emit('news', {
		hello: 'world'
	});
	socket.on('my other event', function(data) {
		console.log(data);
	});
});
