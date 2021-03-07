const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 5000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
}); //Connects the client to the server

//When connection, disconnection, message events have happened
io.on('connection', (socket) => {
    console.log(`The user ${socket.id} has connected`);
    io.emit("chat message", `User ${socket.id} has joined`)
    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit("chat message", `User ${socket.id} has left`)
    });
    socket.on('chat message', (msg) => {
        console.log(`${socket.id} : ${msg}`);
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

http.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});

