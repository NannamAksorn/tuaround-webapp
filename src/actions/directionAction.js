// import { notification } from 'antd';
import tuaInstance from '@/plugins/axios';
import { setModeAction } from '@/actions/mapAction';
import {
  CP_DIRECTION,
  CP_SELECT_DIRECTION_FROM_MAP,
} from '@/components/map/ControlBox/ControlPanel';

export const STOP_DIRECTION_TYPE = 0;
export const CURRENT_POSITION_DIRECTION_TYPE = 1;
export const MARKER_DIRECTION_TYPE = 2;

export const SET_PLANS = 'SET_PLANS';
export const SET_FROM_PLACE = 'SET_FROM_PLACE';
export const SET_TO_PLACE = 'SET_TO_PLACE';

export const getDirectionAction = () => async (dispatch, getState) => {
  const { fromPlace, toPlace } = getState().direction;
  const fromPlacePos = fromPlace.latlon;
  const toPlacePos = toPlace.latlon;
  if (!fromPlacePos || !toPlacePos) return;
  try {
    const res = await tuaInstance.get('/otp/routers', {
      params: {
        fromPlace: fromPlacePos,
        toPlace: toPlacePos,
      },
    });
    if (!res || res.status !== 200 || res.data.error) return;
    dispatch({
      type: SET_PLANS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const setFromPlaceAction = payload => {
  return {
    type: SET_FROM_PLACE,
    payload,
  };
};

export const setToPlaceAction = payload => {
  return {
    type: SET_TO_PLACE,
    payload,
  };
};

export const setDirectionFromStopAction = () => async (dispatch, getState) => {
  const { curStop } = getState().stop;
  const { currentPosition } = getState().map;

  const currentPositionParsed = {
    latlon: `${currentPosition.lat},${currentPosition.lon}`,
    type: CURRENT_POSITION_DIRECTION_TYPE,
    name_en: 'Current Position',
    name_th: 'ตําแหน่งปัจจุบัน',
  };
  dispatch(setFromPlaceAction(currentPositionParsed));
  dispatch(
    setToPlaceAction({
      ...curStop,
      type: STOP_DIRECTION_TYPE,
      latlon: `${curStop.latlon.x},${curStop.latlon.y}`,
    }),
  );
  return dispatch(setModeAction(CP_DIRECTION));
};

export const setDirectionFromMarkerAction = () => async (
  dispatch,
  getState,
) => {
  const { clickLatLon, mode } = getState().map;
  // Get Name Eng
  const place = {
    latlon: `${clickLatLon[0]},${clickLatLon[1]}`,
    type: MARKER_DIRECTION_TYPE,
    name_en: `${clickLatLon[0]}, ${clickLatLon[1]}`,
    name_th: '',
  };
  mode === CP_SELECT_DIRECTION_FROM_MAP
    ? dispatch(setFromPlaceAction(place))
    : dispatch(setToPlaceAction(place));
};
