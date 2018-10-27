const express = require('express');
const app = express();
const http = require('http').Server(app);
const socket = require('socket.io')(http);
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
});

socket.on('connection', (client) => {
  client.on('chat', (message) => {
    socket.emit('chat', message);
  });
});

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});