const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const app = express();

const server = http.createServer(app);
const io = socketio(server);

const publicDirectoryPath = path.join(__dirname, './public');
app.use(express.static(publicDirectoryPath));

io.on('connection', socket => {
    socket.broadcast.emit("showMessage", { name: 'Anonymous', message: 'A new member has joined'});
    socket.on('sendMessage', message => io.emit('showMessage', message));
    console.log('new connection');
});

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
