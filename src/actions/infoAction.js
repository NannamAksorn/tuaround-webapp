// import { notification } from 'antd';
import tuaInstance from '@/plugins/axios';
import { subscribeWeather } from '@/subscribes/infoSubscribe';

export const SET_WEATHER = 'SET_WEATHER';

export const fetchWeatherAction = () => async dispatch => {
  try {
    const res = await tuaInstance.get('/weather');
    if (!res) return;
    dispatch(setWeatherAction(res.data));
  } catch (err) {
    console.log(err);
  }
  subscribeWeather(data => dispatch(setWeatherAction(data)));
};

export const setWeatherAction = payload => {
  return {
    type: SET_WEATHER,
    payload,
  };
};
