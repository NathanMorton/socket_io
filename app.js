const express = require('express'),
app = express(),
http = require('http').Server(app),
socket = require('socket.io')(http);
port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
});

socket.on('connection', (client) => {
  client.on('chat', (data) => {
    socket.emit('chat', data);
  });
  // Handle typing event
  client.on('typing', (data) => {
    client.broadcast.emit('typing', data);
  });
});


http.listen(port, () => {
  console.log(`listening on port ${port}`);
});