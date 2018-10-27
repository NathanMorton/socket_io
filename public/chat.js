$(() => {
  var socket = io();
  $('form').submit(() => {
    socket.emit('chat', {
      message: $('.message').val(),
      handle: $('.handle').val()
    });
    
    $('.message').val('');
    return false;
  });
  // socket.on('chat', (data) => {
  //   $('.messages').append($('<li>').text(data.handle));
  //   $('.messages').append($('<li>').text(data.message));
  // });
  socket.on('chat', (data) => {
    document.querySelector('.messages').innerHTML += `<li><strong>handle:</strong> <em>${data.handle}</em> <br>
    <strong>message:</strong> <em>${data.message}</em> </li>`;
  })

});