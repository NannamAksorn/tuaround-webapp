import React from 'react';

// import lottie from 'lottie-web';

// const weatherIcon = document.getElementById('MyWeatherIcon');
// const weatherTempEl = document.getElementById('MyWeatherTemp');
// const weatherPrecipEl = document.getElementById('MyWeatherPrecip');

// let lottieWeatherIcon = lottie.loadAnimation({
//   container: weatherIcon,
//   renderer: 'svg',
//   loop: true,
//   autoplay: true,
//   path: 'public/weather/clear-day.json',
//   rendererSetting: {
//     clearCanvas: true,
//   },
// });

// async function fetchWeather() {
//   const res = await fetch('/api/weather');
//   const data = await res.json();
// weatherTempEl.innerText = `${data.currently.apparentTemperature.toFixed(0)}°C`;
// weatherPrecipEl.innerText = `${(data.currently.precipProbability * 100).toFixed(
//   0,
// )}%`;
//   lottieWeatherIcon.destroy();
//   lottieWeatherIcon = lottie.loadAnimation({
//     container: weatherIcon,
//     renderer: 'svg',
//     loop: true,
//     autoplay: true,
//     path: `public/weather/${data.currently.icon}.json`,
//     rendererSetting: {
//       clearCanvas: true,
//     },
//   });
// }

// fetchWeather();
// setInterval(fetchWeather, 1000 * 60 * 60);

const Weather = ({ data }) => {
  return (
    <>
      <div className="forecast-container">
        {/******  replace this **********/}
        <div className="temp-icon">
          <img src={require('./temp.svg')} alt="temp" width="25px" />
        </div>
      </div>

      <div className="weather-container">
        <div className="temp-container">
          <div className="temp-icon">
            <img src={require('./temp.svg')} alt="temp" width="25px" />
          </div>
          <div className="temp-info">
            {`${data.currently.apparentTemperature.toFixed(0)}°C`}
          </div>
        </div>
        <div className="rain-container">
          <div className="rain-icon">
            {/* public/weather/${data.currently.icon}.json */}
            <img src={require('./raining.svg')} alt="raining" width="25px" />
          </div>
          <div className="rain-info">
            {`${(data.currently.precipProbability * 100).toFixed(0)}%`}
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
