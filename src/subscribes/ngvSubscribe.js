import socket from '../plugins/socket';
import { setNgvAction } from '../actions/ngvAction';
import { setStopETAAction } from '../actions/stopAction';

export const subscribeNgvGps = dispatch => {
  socket.on('TU-NGV', res => {
    dispatch(setNgvAction(res));
  });
};

export const subscribeStopETA = (dispatch, id) => {
  socket.on(`ETA/${id}`, res => {
    // console.log(res);
    dispatch(setStopETAAction(res));
  });
};

export const unsubscribeStopETA = id => {
  socket.off(`ETA/${id}`);
};
