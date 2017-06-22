const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const fs = require('fs');

const PORT = 3102;
const IP = "127.0.0.1";

var i = 0;

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('listening', () => {
  setInterval(sendImage, 20);
});

server.bind(3002);

function sendImage() {
	var name = "./image_dump2/" + i.toString() + ".jpg";

	var data = fs.readFileSync(name);
	console.log('read file');

	server.send(data, 0, data.length, PORT, IP, function(err, bytes) {
			if (err) {
				console.log('err');
				throw err;
			}
			console.log('server sent' + i);
	});
	i++;
	if(i == 76) i = 0;
}
