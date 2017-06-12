var net = require('net');
var fs = require('fs');

var client;
var i = 0;

var server = net.createServer(function(socket) {
	console.log('server start');
	client = socket;
	client.setNoDelay(true);
	socket.on('data', function(data) {
			console.log('ondata' + data);
			if(data == 'ready' || data == 'ok') {
				// setInterval(sendImage, 50);
				sendImage();
			} else if(data == 'end') {
				client.end();
			}
	});
});

function writeData(socket, data) {

    var success = socket.write(data);
    if (!success) {
			console.log('fail');
        (function (socket, data) {
            socket.once('drain', function() {
                writeData(socket, data);
            });
        }) (socket, data);
    }
		// socket.pipe(socket);
}

function sendImage() {
	if(i < 344) {
		var name = "./image_dump/" + i.toString() + ".jpg";
		console.log(name);
		data = fs.readFileSync(name, 'base64');
		console.log('read file');
		// client.setNoDelay(true);
		// client.write(data);
		// client.pipe(client);
		writeData(client, data);
		i++;
	} else {
		writeData(client, 'end');
		// client.setNoDelay(true);
		// client.write('end');
		// client.pipe(client);
		i = 0;
	}
}

server.listen(3000, '127.0.0.1');
