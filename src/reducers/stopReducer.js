// ngvReducer.js
import {
  ADD_STOP,
  SET_STOPS,
  SET_STOP_ETA,
  SET_CUR_STOP_LISTEN,
} from '../actions/stopAction';

const initialState = {
  stops: [],
  stopsETA: {},
  curStopListen: -1,
  curStop: { name_en: 'Station', name_th: 'สถานี' },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_STOP:
      return { ...state, stops: [...state.stops, action.payload] };
    case SET_STOPS:
      return { ...state, stops: action.payload };
    case SET_STOP_ETA:
      return { ...state, stopsETA: { ...action.payload } };
    case SET_CUR_STOP_LISTEN:
      return {
        ...state,
        curStopListen: action.payload,
        curStop: state.stops.find(({ id }) => id === action.payload),
      };
    default:
      return state;
  }
}

export default reducer;
