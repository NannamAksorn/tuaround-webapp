import socket from '../plugins/socket';

export const subscribeNgvGps = callback => {
  socket.on('TU-NGV', callback);
};

export const subscribeStopETA = (id, callback) => {
  socket.on(`ETA/${id}`, callback);
};

export const unsubscribeStopETA = id => {
  socket.off(`ETA/${id}`);
};
