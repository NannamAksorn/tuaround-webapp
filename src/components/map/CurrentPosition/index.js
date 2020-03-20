/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Button, Tooltip } from 'antd';
import { AimOutlined } from '@ant-design/icons';
import './styles.scss';
import { connect } from 'react-redux';
import { CircleMarker } from 'react-leaflet';
import CurrentPositionIcon from './CurrentPositionIcon';
import RotatedMarker from '../RotatedMarker';

const mapStateToProps = ({ map }) => ({
  mapEl: map.mapEl,
});

const CurrentPosition = ({ dispatch, mapEl }) => {
  const [position, setPosition] = useState({ lat: 14.071, lon: 100.605 });
  const [error, setError] = useState(null);

  const onChange = ({ coords }) => {
    const { latitude: lat, longitude: lon, accuracy, heading, speed } = coords;
    setPosition({ lat, lon, accuracy, heading, speed });
  };

  const onError = error => {
    setError(error.message);
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }
    const watcher = geo.watchPosition(onChange, onError, options);
    return () => geo.clearWatch(watcher);
  }, []);

  const handleOnPress = () => {
    if (!mapEl) return;
    if (error) return;
    mapEl.flyTo(latlng, 16);
  };
  const latlng = [position.lat, position.lon];

  return (
    <>
      <div className="CurrentPosition">
        <Tooltip title={error ? 'Please Enable Location' : 'Your Location'}>
          <Button
            disabled={error}
            icon={<AimOutlined />}
            onClick={handleOnPress}
            size="large"
          />
        </Tooltip>
      </div>
      {/* Shadow */}
      <CircleMarker
        interactive={false}
        center={latlng}
        radius={10}
        stroke={false}
        fillColor="#38f"
        fillOpacity={0.1}
        zIndexOffset={1000}
      />
      {/* Position */}
      <CircleMarker
        interactive={false}
        center={latlng}
        radius={7}
        weight={1}
        fillColor="#38f"
        fillOpacity={1}
        color="#fff"
        zIndexOffset={1000}
      />
      {/* Heading */}
      {position && position.heading && (
        <RotatedMarker
          rotationAngle={position.heading}
          interactive={false}
          position={latlng}
          icon={CurrentPositionIcon}
          zIndexOffset={-20}
        />
      )}
    </>
  );
};

export default connect(mapStateToProps)(CurrentPosition);
