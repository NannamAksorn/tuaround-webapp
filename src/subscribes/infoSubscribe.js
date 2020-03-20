import socket, { WEATHER_TOPIC } from '../plugins/socket';

export const subscribeWeather = callback => {
  socket.on(WEATHER_TOPIC, callback);
};

export const unsubscribeWeather = id => {
  socket.off(WEATHER_TOPIC);
};
