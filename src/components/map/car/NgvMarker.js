// NgvIcon.js
import React from 'react';
import { Popup, Tooltip } from 'react-leaflet';
import { DriftMarker } from 'leaflet-drift-marker';
import L from 'leaflet';
import NgvIcon from './NgvIcon';
import { getRouteColor } from '../../../utils';

const Icon = (cid, route, bearing, iconSize, status) => {
  const iconSettings = {
    mapIconUrl: NgvIcon,
    routeNumber: route,
    carNoX: `${45 - (route.length - 1) * 6}%`,
    carnoBoxFill: getRouteColor(route),
    carElId: `car-icon-${cid}-${route}`,
    carnoTextColor: route === '1a' ? '#000' : '#fff',
    bearing,
  };
  const iconSizeHalf = iconSize / 2;
  return L.divIcon({
    className: 'car-icon-container',
    html: L.Util.template(iconSettings.mapIconUrl, iconSettings),
    iconAnchor: [iconSizeHalf, iconSizeHalf],
    iconSize: [iconSize, iconSize],
    popupAnchor: [0, -iconSizeHalf],
  });
};

const NgvMarker = ({ cid, route, lat, lon, bearing, status, iconSize }) => {
  if (status === 'ne') return null;
  return (
    <DriftMarker
      position={[lat, lon]}
      duration={2000}
      icon={Icon(cid, route, bearing, iconSize, status)}
    >
      <Tooltip>NGV-{cid}</Tooltip>
      <Popup>
        <h3>เบอร์ | No. {cid}</h3>
        <h3>สาย | Route {route}</h3>
        <h3>status {status}</h3>
      </Popup>
    </DriftMarker>
  );
};

export default NgvMarker;
