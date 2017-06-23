var net = require('net');
var fs = require('fs');

var i = 0;
var client = null;
var server = net.createServer(function(socket) {
	console.log('server start');
	client = socket;
	client.setNoDelay(true);
	client.on('data', onData);
});

function onData(data) {
	console.log('onData()', data);
	if(data[0] == 1) {
		if(data[1] == 1) {
			client.write(Buffer.from([1, 1, 1]));
		} else if(data[1] == 2) {
			client.write(Buffer.from([2, 1]));
		} else if(data[1] == 3) {
			client.write(Buffer.from([3, 1, 1, 100]));
		} else if(data[1] == 4) {
			client.write(Buffer.from([3, 2, 1, 9]));
		}
	} else if(data[0] == 2) {
		client.write(Buffer.from([3, 3, 30]));
	}
}

server.listen(3000, '127.0.0.1');
