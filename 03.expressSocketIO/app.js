

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(express.static('static'));

app.get('/', (req, res) => {

	res.render('index');
});


io.on('connection', (socket) => {
	console.log('建立连接');

	socket.on('message', (data) => {

		// io.emit  // 广播
		// socket.emit   // 私发

		io.emit('servermessage', data);  // 服务器给客户端发送数据
	})
});


server.listen(8088, '192.168.200.42');
console.log('Server run http://192.168.200.42/');



