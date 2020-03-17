import io from 'socket.io-client';

let url = '//127.0.0.1:4435/';
let path = '/socket.io';
if (process.env.NODE_ENV === 'production') {
  url = '/';
  path = '/api/socket.io';
}

const socket = io(url, {
  secure: true,
  path,
});
socket.on('disconnect', () => {
  socket.open();
});

export default socket;
