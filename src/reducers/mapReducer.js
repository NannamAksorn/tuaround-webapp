// mapReducer.js
import {
  SET_MAP_LATLON,
  SET_MAP,
  SET_MAP_MARKER,
} from '../actions/mapAction'

const initialState = {
  clickLatLon: {lat: 14.071, lon: 100.605},
  mapEl: null,
  mapMarker: null,
}

function reducer(state=initialState, action) {
  switch (action.type) {
    case SET_MAP_LATLON:
      return { ...state, clickLatLon: action.payload }
    case SET_MAP:
      return { ...state, mapEl: action.payload }
    case SET_MAP_MARKER:
      return { ...state, mapMarker: action.payload }
    default: return state;
  }
}

export default reducer;