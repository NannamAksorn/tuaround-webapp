import L from 'leaflet';
import MapMarkerIcon from '@/components/map/MapMarker';
import StopIcon from '@/components/map/stop/StopIcon';
import { CP_ETA, CP_STOP } from '@/components/map/ControlBox/ControlPanel';
import {
  CP_SELECT_DIRECTION_TO_MAP,
  CP_SELECT_DIRECTION_FROM_MAP,
} from '../components/map/ControlBox/ControlPanel';

export const SET_MAP_LATLON = 'SET_MAP_LATLON';
export const SET_MAP = 'SET_MAP';
export const SET_MAP_DIRECTION_LAYER = 'SET_MAP_DIRECTION_LAYER';
export const SET_MAP_MARKER = 'SET_MAP_MARKER';
export const SET_MAP_MARKER_LOCATION = 'SET_MAP_MARKER_LOCATION';
export const SET_MODE = 'SET_MODE';
export const SET_ETA_STOP = 'SET_ETA_STOP';
export const SET_CURRENT_POSITION = 'SET_CURRENT_POSITION';

export const setClickLatLonAction = latlng => dispatch => {
  const { lat, lng } = latlng;
  const payload = [lat.toFixed(5), lng.toFixed(5)];
  dispatch(setMapMarkerLocationAction(payload));
  return dispatch({
    type: SET_MAP_LATLON,
    payload,
  });
};

export const initMapAction = el => dispatch => {
  dispatch({
    type: SET_MAP,
    payload: el,
  });
  // set DIRECTION LAYER
  const direction_layer = L.layerGroup();
  direction_layer.addTo(el);
  dispatch({
    type: SET_MAP_DIRECTION_LAYER,
    payload: direction_layer,
  });
};

export const setMapMarkerAction = MapMarker => {
  return {
    type: SET_MAP_MARKER,
    payload: MapMarker,
  };
};

export const setMapMarkerLocationAction = payload => (_, getState) => {
  const { mapMarker } = getState().map;
  if (!mapMarker) return;
  mapMarker.setLatLng(payload);
};

export const setModeAction = payload => (dispatch, getState) => {
  const mode = getState().map.mode;
  const newMode = mode === payload && mode === CP_STOP ? 0 : payload;
  if (
    (mode === CP_SELECT_DIRECTION_TO_MAP ||
      mode === CP_SELECT_DIRECTION_FROM_MAP) &&
    payload === CP_ETA
  )
    return;
  dispatch(setMapMarkerIcon(newMode));
  dispatch({
    type: SET_MODE,
    payload: newMode,
  });
};

export const setMapMarkerIcon = payload => (_, getState) => {
  const { mapMarker } = getState().map;
  if (!mapMarker) return;
  switch (payload) {
    case CP_STOP:
      return mapMarker.setIcon(StopIcon(15, '#f42')).unbindPopup();
    default:
      return mapMarker.setIcon(MapMarkerIcon).bindPopup('<></>');
  }
};

export const setCurrentPositionAction = payload => {
  return {
    type: SET_CURRENT_POSITION,
    payload,
  };
};
