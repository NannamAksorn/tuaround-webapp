// NgvIcon.js
import React from 'react';
import { Popup, Tooltip } from 'react-leaflet';
import {  DriftMarker } from 'leaflet-drift-marker';
import L from 'leaflet'
import NgvIcon from './NgvIcon';
import { getRouteColor } from '../../../utils'

const Icon = (cid, route, bearing, zoomLevel, status) => {
  const iconSettings = {
    mapIconUrl: NgvIcon,
    routeNumber: route,
    carNoX: `${45 - (route.length - 1) * 6}%`,
    carnoBoxFill: getRouteColor(route),
    carElId: `car-icon-${cid}-${route}`,
    bearing
  }
  return L.divIcon({
    className: 'car-icon-container',
    html: L.Util.template(iconSettings.mapIconUrl, iconSettings),
    iconAnchor: [zoomLevel * 3/2, zoomLevel * 3/2],
    iconSize: [zoomLevel * 3, zoomLevel * 3],
    popupAnchor: [0, -15]
  })
}

const NgvMarker = ({ cid, route, lat, lon, bearing, status, zoomLevel }) => {
  if (status === "ne") return (<h1>NE</h1>);
  return (
    <DriftMarker position={[lat,lon]}
      duration={2000}
      icon={Icon(cid, route, bearing, zoomLevel, status)}
    >
      {/* <Tooltip>NGV-{cid}</Tooltip> */}
      <Popup>
        <h3>เบอร์ | No. {cid}</h3>
        <h3>สาย | Route {route}</h3>
        <h3>status {status}</h3>
      </Popup>
    </DriftMarker>
  )
}

export default NgvMarker;