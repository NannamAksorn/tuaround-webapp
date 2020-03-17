// mapReducer.js
import {
  SET_MAP_LATLON,
  SET_MAP,
  SET_MAP_MARKER,
  SET_MODE,
} from '@/actions/mapAction';

const initialState = {
  clickLatLon: [14.071, 100.605],
  mapEl: null,
  mapMarker: null,
  mode: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MAP_LATLON:
      return { ...state, clickLatLon: action.payload };
    case SET_MAP:
      return { ...state, mapEl: action.payload };
    case SET_MAP_MARKER:
      return { ...state, mapMarker: action.payload };
    case SET_MODE:
      return { ...state, mode: action.payload };
    default:
      return state;
  }
}

export default reducer;
