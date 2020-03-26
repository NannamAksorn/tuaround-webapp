import L from 'leaflet';

const MarkerIcon = L.icon({
  iconUrl: '/img/map/map-marker.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [16, -16],
});

export default MarkerIcon;

export const setMapMarker = (latlon, mapEl) => {
  return new L.Marker(latlon, { icon: MarkerIcon, zIndexOffset: 100 }).addTo(
    mapEl,
  );
};
