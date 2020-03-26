/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import DateTime from '@/components/Header/DateTime';
import Weather from '@/components/Header/Weather/index';
import { fetchWeatherAction } from '../../actions/infoAction';

const mapStateToProps = ({ info }) => ({
  weatherData: info.weather,
});

const Header = ({ dispatch, weatherData }) => {
  useEffect(() => {
    dispatch(fetchWeatherAction());
  }, []);
  return (
    <div className="Header TU--Red">
      {/* Config Stop */}
      {/* Left side */}
      <div className="logo-container">
        <div className="logo">
          <img src="/img/tu-logo.png" alt="tu-logo" />
        </div>
        <div className="title">
          <span className="headline">Thammasat University Transportation</span>
        </div>
      </div>

      {/* Right side */}
      <div className="right-container">
        <div className="info-container">
          {/* DATE TIME */}
          <DateTime />
          {/* WEATHER */}
          <Weather data={weatherData} />
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Header);
