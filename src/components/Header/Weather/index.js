import React from 'react';

import Lottie from 'react-lottie';
// import * as animationData from './pinjump.json';

const Weather = ({ data }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: require(`./weather/${data.currently.icon ||
      'clear-day'}.json`),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <>
      <div className="forecast-container">
        <div id="MyWeatherIcon">
          <Lottie options={defaultOptions} isStopped={false} isPaused={false} />
        </div>
      </div>

      <div className="weather-container">
        <div className="sub-container2">
          <div className="temp-container">
            <div className="temp-icon">
              <img src={require('./temp.svg')} alt="temp" />
            </div>
            <div id="MyWeatherTemp" className="temp-info">
              <p>{`${data.currently.apparentTemperature.toFixed(0)}°C`}</p>
            </div>
          </div>
          <div className="rain-container">
            <div className="rain-icon">
              <img src={require('./raining.svg')} alt="raining" />
            </div>
            <div id="MyWeatherPrecip" className="rain-info">
              <p>{`${(data.currently.precipProbability * 100).toFixed(0)}%`}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
