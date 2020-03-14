export const SET_MAP_LATLON = "SET_MAP_LATLON";
export const SET_MAP = "SET_MAP";
export const SET_MAP_MARKER = "SET_MAP_MARKER";
export const SET_MAP_MARKER_LOCATION = "SET_MAP_MARKER_LOCATION";

export const setClickLatLonAction = latlng => dispatch => {
  const {lat, lng} = latlng
  const payload = {lon: lng.toFixed(5), lat: lat.toFixed(5)}
  dispatch(setMapMarkerLocationAction(payload))
  return {
    type: SET_MAP_LATLON,
    payload
  }
}

export const setMapAction = el => {
  return {
    type: SET_MAP,
    payload: el 
  }
}

export const setMapMarkerAction = MapMarker => {
  return {
    type: SET_MAP_MARKER,
    payload: MapMarker
  }
}

export const setMapMarkerLocationAction = latlon => (_, getState ) => {
  const { mapMarker } = getState();
  if (!mapMarker) return
  const { lat, lon } = latlon;
  mapMarker.setLatLng([lat, lon])
}

