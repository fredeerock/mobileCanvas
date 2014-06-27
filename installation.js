var serverPort = 3012;

var ioc = require('socket.io-client');
var client = ioc.connect("http://localhost:" + serverPort);

client.once("connect", function() {
	console.log('Client: Connected to port ' + serverPort);

	client.emit("echo", "Hello World", function(message) {
		console.log('Echo received: ', message);
		// client.disconnect();
		//server.close();
	});
});
