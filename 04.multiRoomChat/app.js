
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const url = require('url');

app.set('view engine', 'ejs');
app.use(express.static('static'));

app.get('/', (req, res) => {

	res.render('index');
});

app.get('/chat', (req, res) => {

	res.render('chat');
});

// 配置链接socket.io
io.on('connection', (socket) => {

	let socketUrl = socket.request.url; // 获取客户端url
	let queryArr = url.parse(socketUrl, true).query;
	let roomid = queryArr.roomid;
	let username = queryArr.name;

	socket.join(roomid);  // 加入socket分组


	socket.on('sendChat', data => {

		// 指定分组广播(指定分组内的所有客户端)
		io.to(roomid).emit('acceptChat', {
			username: username,
			roomid: roomid,
			message: data.message
		});

		// 通知分组内的用户，不包括用户自身
		// socket.broadcast.to(roomid).emit('acceptChat', {
		// 	username: username,
		// 	roomid: roomid,
		// 	message: data.message
		// });
	});
});


server.listen(8088, '192.168.200.42');
console.log('Server run http://192.168.200.42:8088/');