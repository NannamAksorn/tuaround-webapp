// mapReducer.js
import {
  SET_MAP_LATLON,
  SET_MAP,
  SET_MAP_MARKER,
  SET_MODE,
  SET_CURRENT_POSITION,
  SET_MAP_DIRECTION_LAYER,
} from '@/actions/mapAction';

const initialState = {
  clickLatLon: [14.071, 100.605],
  mapEl: null,
  mapMarker: null,
  mode: 0,
  currentPosition: {},
  directionPlansLayer: null,
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
    case SET_CURRENT_POSITION:
      return { ...state, currentPosition: action.payload };
    case SET_MAP_DIRECTION_LAYER:
      return { ...state, directionPlansLayer: action.payload };
    default:
      return state;
  }
}

export default reducer;
