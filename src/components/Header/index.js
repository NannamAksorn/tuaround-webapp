import React from 'react';
import './styles.scss';
import DateTime from '@/components/Header/DateTime';
import Weather from '@/components/Header/Weather/index';

const Header = () => {
  return (
    <div className="TitleBox TU--Red">
      {/* Config Stop */}
      {/* Left side */}
      <div className="logo-container">
        <div className="logo">
          <img src={'/img/tu-logo.png'} alt="tu-logo" />
        </div>
        <div className="title">
          <h3>Thammasat University Transportation</h3>
        </div>
      </div>

      {/* Right side */}
      <div className="right-container">
        <div className="info-container">
          {/* DATE TIME */}
          <DateTime />
          {/* WEATHER */}
          <Weather />
        </div>
      </div>
    </div>
  );
};

export default Header;
