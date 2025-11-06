import {Server} from "socket.io";
import { createServer } from "http";
import express from "express";
import cors from "cors";

import { addUser, removeUser, getUser, getUsersInRoom } from './users.js';
import router from './router.js';


// import { callbackify } from "util";

const app = express();
const server = createServer(app);

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
};

const io = new Server(server, {
  cors: corsOptions
});

// Apply CORS middleware BEFORE routes
app.use(cors(corsOptions));
app.use(router);

//  fires when someone connects
io.on('connection', (socket) => {
    // console.log('We have a new connection!!!');

    //  fires when that specific user joins a room
    socket.on('join', ({ name, room}, callback) => {
        // Validate inputs
        if (!name || !room || typeof name !== 'string' || typeof room !== 'string') {
            return callback({ error: 'Invalid name or room' });
        }
        
        name = name.trim();
        room = room.trim();
        
        if (name.length === 0 || room.length === 0) {
        return callback({ error: 'Name and room are required' });
        }
        
        if (name.length > 20 || room.length > 20) {
        return callback({ error: 'Name and room must be less than 20 characters' });
        }

        // Server adds user
        const { error, user} = addUser({id: socket.id, name, room});

        if(error) return callback(error);
        
        // Server sends messages

        // User joins Socket.IO room
        socket.join(user.room);

        // Welcome message to the user
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});

        // Announcement to everyone else in room
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`});

        
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});

        // Callback called tells client "join successful"
        callback();
    });

    // when a user sends a message in the chat
    socket.on('sendMessage', (message, callback) => {  // Listen for 'sendMessage' event from the client
        
        // Find the user who sent the message
        const user = getUser(socket.id);
        
        if (!user) {
            return callback({ error: 'User not found' });
        }
        
        // Validate message
        if (!message || message.trim().length === 0) {
            return callback({ error: 'Message cannot be empty' });
        }
        
        if (message.length > 1000) {
            return callback({ error: 'Message too long (max 1000 characters)' });
        }

        // Broadcast message to everyone in the room
        io.to(user.room).emit('message', { user: user.name, text: message.trim()});
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
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    })

});

const PORT = process.env.PORT || 5000;



server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));