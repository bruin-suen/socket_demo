const http = require('http');
const fs = require('fs');

const app = http.createServer((req, res) => {
	fs.readFile('./index.html', (err, data) => {

		res.writeHead(200, {'Content-Type': 'text/html;chartset="utf-8"'});
		res.end(data);
	});
});

const io = require('socket.io')(app);

io.on('connection', socket => {

	// 获取客户端ip地址
	let address = socket.handshake.address;

	// 获取客户端广播的数据
	socket.on('news', data => {

		// 服务器给客户端推送数据
		//socket.emit();   // 哪个客户端给服务器发的数据，服务器把信息返回给哪个客户端。

		// 服务器给客户端群发信息
		io.emit('toClient', {
			ipv4: address,
			client: data.client,
			times: data.times
		});
	});
});

app.listen(8088, '192.168.200.42');
console.log('Server run http://localhost:8088/');