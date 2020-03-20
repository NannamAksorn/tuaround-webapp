import React from 'react';
import L from 'leaflet';
import { Marker, Tooltip } from 'react-leaflet';

const StopIconSvg = `
<svg height="100%" width="100%">
  <circle cx="50%" cy="50%" r="40%" stroke="#fff8" stroke-width="1" fill="{stopFill}" />
</svg>
 `;
const StopIcon = (iconSize, stopFill) => {
  const iconSettings = {
    mapIconUrl: StopIconSvg,
    stopFill: stopFill || '#04a',
  };
  const iconSizeHalf = iconSize / 2;
  return L.divIcon({
    className: 'stop-icon-container',
    html: L.Util.template(iconSettings.mapIconUrl, iconSettings),
    iconAnchor: [iconSizeHalf, iconSizeHalf],
    iconSize: [iconSize, iconSize],
    popupAnchor: [0, -iconSizeHalf],
  });
};

export default (iconScale, stopFill) => StopIcon(iconScale, stopFill);

export const setStopIconMarker = (latlon, mapEl, iconScale, stopFill) => {
  return new L.Marker(latlon, { icon: StopIcon(iconScale, stopFill) }).addTo(
    mapEl,
  );
};

export const StopMarker = ({
  id,
  name_en,
  name_th,
  latlon,
  onClick,
  iconSize,
  stopFill,
}) => {
  return (
    <Marker
      position={[latlon.x, latlon.y]}
      icon={StopIcon(iconSize, stopFill)}
      onClick={() => onClick(id)}
    >
      <Tooltip>
        <h3>{id}</h3>
      </Tooltip>
      {/* <Popup>
        <h3>{name_en}</h3>
        <h3>{name_th}</h3>
      </Popup> */}
    </Marker>
  );
};
