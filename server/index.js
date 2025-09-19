const socketio = require("socket.io");
const http = require("http");
const express =  require("express");

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
    console.log('We have a new connection!!!');
})

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));