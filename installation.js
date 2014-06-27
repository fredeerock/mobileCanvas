var io = require('socket.io-client');

var osc = require('node-osc');

//This should stay lolcalhost as this is the program runnin on the installation
var client = new osc.Client('127.0.0.1', 3332);

var socket = io('http://localhost:3012');

//Check connection
client.send('/board', 200);

socket.on('from client', function(data) {
	console.log(data);
	
	if (data.board !== undefined && data.user !== undefined && data.yPos !== undefined) {
		client.send('/board', data.board);
		client.send('/user', data.user);
		client.send('/yPos', data.yPos);
		client.send('/toggle', data.toggle);
	}

	//Use to send data back
	// socket.emit('my other event', { my: 'data' });
});
