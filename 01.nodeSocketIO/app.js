/**
 * ============================================
 *
 *
 *
 * ============================================
 */
const http = require('http');
const fs = require('fs');

const app = http.createServer((req, res) => {
	fs.readFile('./app.html', (err, data) => {

		res.writeHead(200, {'Content-Type': 'text/html;chartset="utf-8"'});
		res.end(data);
	});
});

const io = require('socket.io')(app);

io.on('connection', socket => {

	console.log('socket建立连接');

	// 获取客户端广播的数据
	socket.on('news', data => {

		// 服务器给客户端推送数据
		//socket.emit();   // 哪个客户端给服务器发的数据，服务器把信息返回给哪个客户端。

		// 服务器给客户端群发信息
		io.emit('toClient', {
			client: data.client
		});
	});
});

app.listen(8088);
console.log('Server run http://localhost:8088/');