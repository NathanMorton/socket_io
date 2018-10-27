$(() => {
  const socket = io(),
    messages = document.querySelector('.messages'),
    handle = document.querySelector('.handle'),
    message = document.querySelector('.message'),
    feedback = document.querySelector('.feedback');

  $('form').submit(() => {
    socket.emit('chat', {
      message: $('.message').val(),
      handle: handle.value
    });
    
    $('.message').val('');
    return false;
  });
  // socket.on('chat', (data) => {
  //   $('.messages').append($('<li>').text(data.handle));
  //   $('.messages').append($('<li>').text(data.message));
  // });

  message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

  // feedback.textContent = handle.value;

  
  // feedback.innerHTML = 'test';
  
  socket.on('chat', (data) => {
    feedback.innerHTML = '';
    messages.innerHTML += `<li><strong>handle:</strong> <em>${data.handle}</em> <br>
    <strong>message:</strong> <em>${data.message}</em> </li>`;
  })
  
  socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
  });


});