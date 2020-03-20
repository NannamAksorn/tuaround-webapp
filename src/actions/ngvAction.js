import { subscribeNgvGps } from '@/subscribes/ngvSubscribe';
export const SET_NGV = 'SET_NGV';

export const setNgvAction = carsData => {
  const [cid, route, lat, lon, bearing, status] = JSON.parse(carsData);
  return {
    type: SET_NGV,
    payload: { [cid]: { cid, route, lat, lon, bearing, status } },
  };
};

export const fetchNgvGpsAction = () => dispatch => {
  subscribeNgvGps(res => dispatch(setNgvAction(res)));
};
