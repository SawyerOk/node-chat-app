const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection', (socket)=>{
    console.log('New user connected');

    socket.on('disconnect', ()=>{
        console.log('User was disconnected');
    });

    socket.on('createMessage', (newMessage)=>{
        // let time = new Date();
        // console.log(`New message from client : ${time.getMinutes()} and => ${newMessage.text}`)
        console.log('Message => ', newMessage);
    });

    //Emiting

    socket.emit('newMessage', {
        message : " hey dy",
        from : 'miami',
        createdAt : 12345
    });

   
});

server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});


