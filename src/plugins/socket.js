import io from 'socket.io-client';

const url = '//127.0.0.1:4435/';
const socket = io(url, {
  secure: true,
  path: '/socket.io',
});
socket.on('disconnect', () => {
  socket.open();
});

export default socket;
