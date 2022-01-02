const cors = require('cors')
const express = require('express');
const app = express();
const path = require('path')
const server = require('http').Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.static(path.join(__dirname, '../build')));
app.get('/', (req, res, next) => res.sendFile(__dirname + './index.html'));
app.use(express.urlencoded({ extended: false }));

let rooms = new Map()

io.on('connection', (socket) => {
  console.log('user was been connection...');
  socket.on('join', ({roomId, name}) => {
    socket.join(roomId)
    if (!rooms.get(roomId)) {
      rooms.set(roomId, new Map([['users', new Map()], ['messages', []]]))
      rooms.get(roomId).get('users').set(socket.id, name)
      socket.emit('setOnlineUsers', [...rooms.get(roomId).get('users').values()])
      io.to(roomId).emit('setMessageData', rooms.get(roomId).get('messages'))
      return
    }
    rooms.get(roomId).get('users').set(socket.id, name)
    io.to(roomId).emit('setOnlineUsers', [...rooms.get(roomId).get('users').values()])
    io.to(roomId).emit('setMessageData', rooms.get(roomId).get('messages'))
  })
  socket.on('sendMessage', ({roomId, messageText, name}) => {
    rooms.get(roomId).get('messages').push({userId: socket.id, messageText, name})
    io.to(roomId).emit('setMessageData', rooms.get(roomId).get('messages'))
  })
  socket.on('leave', (roomId) => {
    socket.leave(roomId);
    rooms.get(roomId).get('users').delete(socket.id)
    io.to(roomId).emit('setOnlineUsers', [...rooms.get(roomId).get('users').values()])
  })
  socket.on('disconnect', () => {
    for (let room of rooms.entries()) {
      if ([...room[1].get('users').keys()].includes(socket.id)) {
        room[1].get('users').delete(socket.id)
        socket.leave(room[0]);
        io.to(room[0]).emit('setOnlineUsers', [...rooms.get(room[0]).get('users').values()])
      }
    }
    console.log('user was been disconnected...');
  })
})

server.listen(PORT, () => {
  console.log('server was been started...');
})