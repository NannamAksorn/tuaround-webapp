import { notification } from 'antd';
import { CP_ETA } from '@/components/map/ControlBox/ControlPanel';
import tuaInstance from '@/plugins/axios';
import {
  unsubscribeStopETA,
  subscribeStopETA,
} from '@/subscribes/ngvSubscribe';

import { setModeAction, setClickLatLonAction } from './mapAction';

export const ADD_STOP = 'ADD_STOP';
export const SET_STOPS = 'SET_STOPS';
export const SET_STOP_ETA = 'SET_STOP_ETA';
export const SET_CUR_STOP_LISTEN = 'SET_CUR_STOP_LISTEN';

export const addStopAction = payload => {
  const [x, y] = payload.latlon;
  payload.latlon = { x, y };
  return {
    type: ADD_STOP,
    payload: payload,
  };
};

export const postStopAction = payload => dispatch => {
  tuaInstance
    .post('/stops', payload)
    .then(res => {
      dispatch(addStopAction(payload));
      notification['success']({
        message: `Added Stop ${payload.id}`,
        duration: 2,
      });
    })
    .catch(err => {
      console.log(err);
      notification['error']({
        message: 'Error Adding Stop',
        description: 'Duplicated Id',
        duration: 2,
      });
    });
};

export const fetchStopAction = () => async dispatch => {
  try {
    const res = await tuaInstance.get('/stops');
    if (!res) return;
    dispatch({
      type: SET_STOPS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchStopEtaAction = sid => async dispatch => {
  tuaInstance.get(`/stops/${sid}/eta`).then(res => {
    dispatch(setStopETAAction(res.data));
  });
  subscribeStopETA(sid, res => dispatch(setStopETAAction(res)));
};

export const clickStopAction = payload => (dispatch, getState) => {
  const { curStopListen, stops } = getState().stop;
  // Change Mode
  dispatch(setModeAction(CP_ETA));
  // Set map Marker
  const curStop = stops.find(({ id }) => id === payload);
  dispatch(
    setClickLatLonAction({
      lat: curStop.latlon.x,
      lng: curStop.latlon.y,
    }),
  );

  if (curStopListen === payload) return;
  dispatch({
    type: SET_CUR_STOP_LISTEN,
    payload,
    curStop,
  });
  unsubscribeStopETA(curStopListen);
  dispatch(fetchStopEtaAction(payload));
};

export const setStopETAAction = payload => {
  return {
    type: SET_STOP_ETA,
    payload,
  };
};
