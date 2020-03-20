// weatherReducer.js
import { SET_WEATHER } from '@/actions/infoAction';

const initialState = {
  weather: { currently: { apparentTemperature: 30, precipProbability: 0 } },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_WEATHER:
      return { ...state, weather: action.payload };
    default:
      return state;
  }
}

export default reducer;
