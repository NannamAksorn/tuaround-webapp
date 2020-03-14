/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './styles.scss'

import L from 'leaflet';
import StopIcon from '../../../map/stop/StopIcon'
const mapStateToProps = ({map}) => ({
  clickLatLon: map.clickLatLon,
  mapEl: map.mapEl
})
// Type
export const CP_STOP = 1;
export const TYPE_TITLE = ["", "Config Stop"];

// MAIN
const ControlPanel = ({
  type, 
  clickLatLon,
  mapEl
}) => {
// set marker function
  // const setMarker = latLon => {
  //   if (!mapEl) return;
  //   const { lat, lon } = latLon;
  //   new L.Marker([lat, lon], { icon: StopIcon }).addTo(mapEl);
  // }
  useEffect(() => {
    // setMarker(clickLatLon);
  }, [clickLatLon])

  return (
    <div className={`ControlPanel ${type && "ControlPanel__active"} TU--Yellow`}>
      <h1>{TYPE_TITLE[type]}</h1>
      <h1>{`lat: ${clickLatLon.lat}`}</h1>
      <h1>{`lon: ${clickLatLon.lon}`}</h1>
    </div>
  )
}

export default connect(mapStateToProps)(ControlPanel);