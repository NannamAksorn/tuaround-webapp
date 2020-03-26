import io from 'socket.io-client';

let url = process.env.REACT_APP_SOCKET_URL;
// let url = '//35.247.160.85:4435/';
let path = '/socket.io';
if (process.env.NODE_ENV === 'production') {
  url = '/';
  path = '/api/socket.io';
}

const socket = io(url, {
  secure: true,
  path,
});

let isConnected = false;
socket.on('connect', () => {
  isConnected = true;
  console.log('connected');
});

socket.on('disconnect', () => {
  let interval = window.setInterval(() => {
    if (isConnected) {
      clearInterval(interval);
      interval = null;
      return;
    }
    socket.open();
  }, 5000);
});

export default socket;

export const WEATHER_TOPIC = 'WEATHER';
export const TU_NGV_TOPIC = 'TU-NGV';
