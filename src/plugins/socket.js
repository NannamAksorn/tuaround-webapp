import io from 'socket.io-client';

let url = '//127.0.0.1:4435/';
//let url = "//tuaround.com:4435/";
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
