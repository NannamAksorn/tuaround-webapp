import React from 'react';

//import lottie from 'lottie-web';
import Lottie from 'react-lottie';
import * as animationData from './pinjump.json'
//var currentPath = require("./weather/cloudy.json");
//var currentPath = require("./weather/clear-night.json");



//const Weather = () =>
class Weather extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      currentPath: require(`./weather/clear-night.json`),
    };
  }
  async fetchWeather() {
    const weatherIcon = document.getElementById('MyWeatherIcon');
    const weatherTempEl = document.getElementById('MyWeatherTemp');
    const weatherPrecipEl = document.getElementById('MyWeatherPrecip');

    // let lottieWeatherIcon = lottie.loadAnimation({
    //   container: document.getElementById('MyWeatherIcon'),
    //   renderer: 'svg',
    //   loop: true,
    //   autoplay: true,
    //   path: 'public/weather/clear-day.json',
    //   rendererSetting: {
    //     clearCanvas: true,
    //   },
    // });
    console.log("fetchWeather");
    //const res = await fetch('/api/weather');
    //const res = await fetch('http://tuaround.com:4435/api/weather');
    let header = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data'
    });
    //let opt = Object.assign({}, defaultOptions, options); //将默认的参数和传过来的合并在一起
    let sentData = {
      method: "GET",
      mode: 'cors',
      header: header,
      //body: opt.body || ''
    };
    const res = await fetch('https://api.darksky.net/forecast/56d11b10e025f7cd93cc31496fba4cb6/14.0717,%20100.60205?units=si', sentData);
    console.log(res);
    const data = await res.json();
    console.log(data);
    console.log(document.getElementById('MyWeatherTemp'))
    if (document.getElementById('MyWeatherTemp')) {
      console.log('sss')
      document.getElementById('MyWeatherTemp').innerText = `${data.currently.apparentTemperature.toFixed(
        0,
      )}°C`;

    }
    if (document.getElementById('MyWeatherPrecip')) {
      document.getElementById('MyWeatherPrecip').innerText = `${(
        data.currently.precipProbability * 100
      ).toFixed(0)}%`;

    }
    if (document.getElementById('MyWeatherIcon')) {
      console.log("set icon")
      // if (document.getElementById('MyWeatherIcon').innerHTML) {
      //   lottieWeatherIcon.destroy();
      // }
      console.log(data.currently.icon)
      // lottieWeatherIcon = lottie.loadAnimation({
      //   container: document.getElementById('MyWeatherIcon'),
      //   renderer: 'svg',
      //   loop: true,
      //   autoplay: true,
      //   path: `public/weather/${data.currently.icon}.json`,
      //   rendererSetting: {
      //     clearCanvas: true,
      //   },
      // });
      this.setState({ currentPath: require(`./weather/${data.currently.icon}.json`) })
      //currentPath = require(`./weather/${data.currently.icon}.json`);
    }
  }

  autofetchWeather() {
    console.log("autofetchWeather")
    this.fetchWeather();
    setInterval(this.fetchWeather, 1000 * 60 * 60);

  }
  componentDidMount() {
    this.autofetchWeather();
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: this.state.currentPath,
      //path: `./weather/clear-night.json`,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      <>
        <div className="forecast-container" onFinish={this.autofetchWeather()} >
          {/******  replace this **********/}
          <div className="temp-icon">

            <div id="MyWeatherIcon" >

              <Lottie options={defaultOptions}
                height={80}
                width={80}
                isStopped={false}
                isPaused={false} />
            </div>

          </div>
        </div>

        <div className="weather-container" >
          <div className="temp-container">
            <div className="temp-icon">
              <img
                className="mr-4"
                src={require('./temp.svg')}
                alt="temp"
                width="25px"
              />
            </div>
            <div id="MyWeatherTemp" className="temp-info" >30°C</div>
          </div>
          <div className="rain-container">
            <div className="rain-icon">
              <img
                className="mr-4"
                src={require('./raining.svg')}
                alt="raining"
                width="25px"
              />
            </div>
            <div id="MyWeatherPrecip" className="rain-info"> 25%</div>
          </div>
        </div>
      </>
    );

  }
};

export default Weather;
