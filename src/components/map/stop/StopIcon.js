import L from 'leaflet';

const StopIcon = L.icon({
  iconUrl: '/img/map/map-marker.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [16, -16]
});

export default StopIcon;

export const setStopIconMarker = (latlon, mapEl) => {
  return new L.Marker(latlon, { icon: StopIcon }).addTo(mapEl);
}