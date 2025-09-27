import {Server} from "socket.io";
import { createServer } from "http";
import express from "express";

import { addUser, removeUser, getUser, getUsersInRoom } from './users.js';

const PORT = process.env.PORT || 5000;

import router from './router.js';
// import { callbackify } from "util";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

//  fires when someone connects
io.on('connection', (socket) => {
    // console.log('We have a new connection!!!');

    //  fires when that specific user joins a room
    socket.on('join', ({ name, room}, callback) => {
        // console.log(name, room);
        // const error = true;
        // if(error) {
        //     callback({ error: 'error'});
        // }

        // Server adds user
        const { error, user} = addUser({id: socket.id, name, room});

        if(error) return callback(error);

        // Server sends messages

        // Welcome message to the user
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});

        // Announcement to everyone else in room
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`});

        // User joins Socket.IO room
        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});

        // Callback called tells client "join successful"
        callback();
    });

    // when a user sends a message in the chat
    socket.on('sendMessage', (message, callback) => {  // Listen for 'sendMessage' event from the client
        
        // Find the user who sent the message
        const user = getUser(socket.id);

        // Broadcast message to everyone in the room
        io.to(user.room).emit('message', { user: user.name, text: message});
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});


        // Acknowledge message was sent
        // Calls the callback function to tell the client "message sent successfully"
        callback();
    });

    socket.on('disconnect', () => {
        // console.log('User had left!!!');
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.`});
        }
    })

});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));