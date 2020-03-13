import React, {useRef, useState, useEffect } from 'react';
import './App.css';
import { Map, TileLayer, ImageOverlay } from 'react-leaflet';
import { subscribeNgvGps } from '../subscribes/ngvSubscribe';
import { connect } from 'react-redux';
import NgvMarker from '../components/map/car/NgvMarker';
import ControlBox from '../components/map/ControlBox/index';

const mapStateToProps = ({ngv}) => {
  return {
    cars: ngv.cars
  }
}

function App({ dispatch, cars }) {
  const INIT_LOCATION = [14.071, 100.605]
  // Get Window Size
  function getSize() {
    const isClient = typeof window === 'object';
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }
  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    const isClient = typeof window === 'object';
    if (!isClient) {
      return false;
    }
    subscribeNgvGps(dispatch) 
    function handleResize() { 
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); 

  // set INIT_ZOOM 
  const { width } = windowSize;
  let INIT_ZOOM = 14.2
  if (width < 400) {
    INIT_ZOOM = 14.2
  } else if (width < 768) {
    INIT_ZOOM = 14.4
  } else if (width < 1024) {
    INIT_ZOOM = 15.3
  } else if (width < 1440) {
    INIT_ZOOM = 15.7
  } else {
    INIT_ZOOM = 16.4
  }

  // set on zoom listener
  const [zoomLevel, setZoomLevel] = useState(INIT_ZOOM)
  const mapRef = useRef(null)
  useEffect(() => {
    const map = mapRef.current
    if (map != null) {
      map.leafletElement.on("zoomend", (e) => {
        const z = e.target._zoom
        setZoomLevel(z)
      })
    }
  }, [])

  const bottomLeft = [14.06453, 100.588749];
  const topRight = [14.080178, 100.620275];
  const imageBounds = [bottomLeft, topRight]

  return (
    <div className="App">
      <Map ref={mapRef} center={INIT_LOCATION} zoom={INIT_ZOOM} zoomControl={false}>
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <ImageOverlay
          url="/img/map/tu-render.png"
          bounds={imageBounds}
          zIndex={5}
          // opacity={0.89}
        />
        {
          Object.values(cars).map(car => {
            return <NgvMarker {...car} key={car.cid} zoomLevel={zoomLevel} />
          })
        }
      </Map>
      {/* Controll Box */}
      <ControlBox />
    </div>
  );
}

export default connect(mapStateToProps)(App);
