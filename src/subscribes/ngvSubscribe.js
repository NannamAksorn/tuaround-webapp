import socket from '../plugins/socket';
import { setNgvAction } from '../actions/ngvAction'

export const subscribeNgvGps = (dispatch) => {
  socket.on("TU-NGV", (res) => {
    dispatch(setNgvAction(res));
  })
}