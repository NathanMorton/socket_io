$(() => {
  const socket = io();
  const messages = document.querySelector('.messages');
  const handle = document.querySelector('.handle');
  const message = document.querySelector('.message');

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

  document.querySelector('.message').addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
  })

  socket.on('chat', (data) => {
    messages.innerHTML += `<li><strong>handle:</strong> <em>${data.handle}</em> <br>
    <strong>message:</strong> <em>${data.message}</em> </li>`;
  })

});