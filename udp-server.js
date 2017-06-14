const dgram = require('dgram');
const server = dgram.createSocket('udp4');
var fs = require('fs');
var port;
var address;
var i = 0;
server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, remote) => {
  console.log(`server got: ${msg} from ${remote.address}:${remote.port}`);
	port = remote.port;
	address = remote.address;
	setInterval(sendImage, 20);
});


server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(3000);

function sendImage() {
	var name = "./image_dump/" + i.toString() + ".jpg";

	var data = fs.readFileSync(name);
	console.log('read file');

	server.send(data, 0, data.length, port, address, function(err, bytes) {
			if (err) {
				console.log('err');
				throw err;
			}
			console.log('server sent' + i);
	});
	i++;
	if(i == 343) i = 0;
}
