var net = require('net');
var fs = require('fs');

var i = 0;

var server = net.createServer(function(socket) {
	console.log('server start');
	socket.setNoDelay(true);
	socket.on('data', function(data){
		console.log("data = ", data);
		socket.write("ok");
	});
});

function onData(data) {
	console.log('onData()', data);
}

server.listen(3000, '127.0.0.1');
