/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import './styles.css';
import { Map, TileLayer, ImageOverlay } from 'react-leaflet';
import { subscribeNgvGps } from '../../subscribes/ngvSubscribe';
import { connect } from 'react-redux';
import {
  setMapAction,
  setClickLatLonAction,
  setMapMarkerAction,
} from '../../actions/mapAction';

import { Row, Col } from 'antd';

import { IconButton } from '@/components/main/Button/index';

import CurrentPosition from '@/components/map/CurrentPosition';
import NgvLayer from '@/components/map/car/NgvLayer';
import StopLayer from '@/components/map/stop/StopLayer';
import ControlBox from '@/components/map/ControlBox/index';
import { setMapMarker } from '@/components/map/MapMarker/index.js';
import { getZoomScale, getInitZoom } from '@/utils';

import Header from '@/components/Header/index';

const mapStateToProps = () => ({});
// const mapStateToProps = ({ ngv }) => {
//   return {
//     cars: ngv.cars,
//   };
// };

function App({ dispatch }) {
  const INIT_LOCATION = [14.071, 100.605];
  // Get Window Size

  function getSize() {
    const isClient = typeof window === "object";
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }
  const [windowSize, setWindowSize] = useState(getSize);

  // set INIT_ZOOM
  const { width } = windowSize;
  let INIT_ZOOM = getInitZoom(width);

  //  Initial Zoom Location
  const bottomLeft = [14.06453, 100.588749];
  const topRight = [14.080178, 100.620275];
  const imageBounds = [bottomLeft, topRight];

  // Subscribe Ngv
  useEffect(() => {
    const isClient = typeof window === "object";
    if (!isClient) {
      return false;
    }
    subscribeNgvGps(dispatch);
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // set on zoom listener && Click Marker
  // const [zoomLevel, setZoomLevel] = useState(INIT_ZOOM);
  const [iconScale, setIconScale] = useState(getZoomScale(INIT_ZOOM));
  const mapRef = useRef(null);
  useEffect(() => {
    const map = mapRef.current;
    if (map != null) {
      const mapEl = map.leafletElement;
      const MapMarker = setMapMarker(INIT_LOCATION, mapEl);
      dispatch(setMapMarkerAction(MapMarker));

      dispatch(setMapAction(mapEl));
      mapEl.on("zoomend", e => {
        const z = e.target._zoom;
        setIconScale(getZoomScale(z));
      });
    }
  }, []);

  // Handle Click
  const handleMapClick = e => {
    dispatch(setClickLatLonAction(e.latlng));
  };

  return (
    <div className="App">
      <Header />
      <Map
        ref={mapRef}
        center={INIT_LOCATION}
        zoom={INIT_ZOOM}
        zoomControl={false}
        onClick={handleMapClick}
      >
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <ImageOverlay
          url="/img/map/tu-render.png"
          bounds={imageBounds}
          zIndex={5}
        // opacity={0.89}
        />
        <NgvLayer iconScale={iconScale} />
        {/* Stop Layer */}
        <StopLayer iconScale={iconScale} />
        {/* Current Position */}
        <CurrentPosition />
      </Map>
      {/* Controll Box */}
      <ControlBox />
    </div>
  );
}

export default connect(mapStateToProps)(App);
