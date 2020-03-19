/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import "../styles/HeaderStyles.scss";
import { Map, TileLayer, ImageOverlay } from "react-leaflet";
import { subscribeNgvGps } from "../subscribes/ngvSubscribe";
import { connect } from "react-redux";
import {
  setMapAction,
  setClickLatLonAction,
  setMapMarkerAction
} from "../actions/mapAction";
import { Row, Col } from "antd";
import { IconButton } from "../components/main/Button/index";
import NgvLayer from "../components/map/car/NgvLayer";
import StopLayer from "../components/map/stop/StopLayer";
import ControlBox from "../components/map/ControlBox/index";
import { setMapMarker } from "../components/map/MapMarker/index.js";
import { getZoomScale, getInitZoom } from "../utils";
import lottie from 'lottie-web';

const mapStateToProps = () => ({});
// const mapStateToProps = ({ ngv }) => {
//   return {
//     cars: ngv.cars,
//   };
// };

function App({ dispatch }) {
  const INIT_LOCATION = [14.071, 100.605];
  // Get Window Size

  const MONTHS = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ];
  const DAY_OF_WEEKS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  let lottieWeatherIcon = lottie.loadAnimation({
    container: document.getElementById('MyWeatherIcon'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: `public/weather/clear-day.json`,
    rendererSetting: {
      clearCanvas: true
    }
  })
  function showTime() {
    const date = new Date();
    let h = date.getHours(); // 0 - 23
    let m = date.getMinutes(); // 0 - 59
    let s = date.getSeconds(); // 0 - 59
    const dayOfWeek = DAY_OF_WEEKS[date.getDay()];
    const year = date.getFullYear();
    const month = MONTHS[date.getMonth()];
    const day = date.getDate();

    h = h < 10 ? `0${h}` : h;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;

    const time = `${h}:${m}:${s}`;
    const dateDisplay = `${dayOfWeek}, ${day} ${month} ${year}`;
    if (document.getElementById("MyClockDisplay")) {
      document.getElementById("MyClockDisplay").innerText = time;
      document.getElementById("MyClockDisplay").textContent = time;
    }
    if (document.getElementById("MyClockDisplay--date")) {
      document.getElementById("MyClockDisplay--date").textContent = dateDisplay;
    }

    setTimeout(showTime, 1000);
  }

  async function fetchWeather() {
    console.log("fetchWeather")
    const res = await fetch('http://tuaround.com:4435/api/weather')
    const data = await res.json();
    if (document.getElementById('MyWeatherTemp')) {
      document.getElementById('MyWeatherTemp').innerText = data.currently.apparentTemperature.toFixed(0) + '°C'
    }
    if (document.getElementById('MyWeatherPrecip')) {
      document.getElementById('MyWeatherPrecip').innerText = (data.currently.precipProbability * 100).toFixed(0) + '%'
    }
    lottieWeatherIcon.destroy()
    lottieWeatherIcon = lottie.loadAnimation({
      container: document.getElementById('MyWeatherIcon'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: `public/weather/${data.currently.icon}.json`,
      rendererSetting: {
        clearCanvas: true
      }
    })
    return 0;
  }

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
      <div className="TitleBox TU--Red">
        {/* Config Stop */}
        {/* Left side */}
        <div className="logo-container">
          <div className="logo">
            <img src={require("./tu-logo.png")} alt="tu-logo" />
          </div>
          <div className="title">
            <h3>Thammasat University Transportation</h3>
          </div>
        </div>

        {/* Right side */}
        <div className="right-container">
          <div className="info-container" onLoad={fetchWeather()}>
            <div className="clock-container" onLoad={showTime()}>
              <div className="date" id="MyClockDisplay--date">
                clock
              </div>
              <div id="MyClockDisplay" className="time"></div>
            </div>

            <div className="forecast-container">
              {/******  replace this **********/}
              <div className="temp-icon">
                <img
                  className="mr-4"
                  src={require("./temp.svg")}
                  alt="temp"
                  width="25px"
                />
              </div>
            </div>

            <div className="weather-container">
              <div className="temp-container">
                <div className="temp-icon">
                  <img
                    className="mr-4"
                    src={require("./temp.svg")}
                    alt="temp"
                    width="25px"
                  />
                  <div id="MyWeatherTemp" className="weather--temp">30°C</div>

                </div>
                <div className="temp-info">30°C</div>
              </div>
              <div className="rain-container">
                <div className="rain-icon">
                  <img
                    className="mr-4"
                    src={require("./raining.svg")}
                    alt="raining"
                    width="25px"
                  />
                  <div id="MyWeatherPrecip" className="weather--temp">0%</div>

                </div>
                <div className="rain-info"> 0%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      </Map>
      {/* Controll Box */}
      <ControlBox />
    </div>
  );
}

export default connect(mapStateToProps)(App);
