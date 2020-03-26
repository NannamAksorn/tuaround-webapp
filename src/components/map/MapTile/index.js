import React, { useState } from 'react';
import { Button, Tooltip, Dropdown } from 'antd';
import { TileLayer, ImageOverlay } from 'react-leaflet';
import Control from 'react-leaflet-control';
import { SwitcherOutlined } from '@ant-design/icons';
import './styles.scss';

const MapModeMenu = (mode, setMode) => (
  <div className="TU--Yellow MapModeMenu">
    <h4>MAP TYPE</h4>
    <Button onClick={() => setMode('street')}>Default</Button>
    <Button onClick={() => setMode('satellite')}>Satellite</Button>
  </div>
);

const MapTile = () => {
  const [mode, setMode] = useState('street');
  const [showSetting, setShowSetting] = useState(false);
  const tileUrl = `${process.env.REACT_APP_API_URL}/tiles/${mode}/{z}/{x}/{y}`;

  // Map Overlay Bound
  const bottomLeft = [14.06453, 100.588749];
  const topRight = [14.080178, 100.620275];
  const imageBounds = [bottomLeft, topRight];
  return (
    <>
      <Control position="topright">
        <Dropdown overlay={MapModeMenu(mode, setMode)} visible={showSetting}>
          <Tooltip title="Select Map Mode">
            <Button
              icon={<SwitcherOutlined />}
              onClick={() => setShowSetting(!showSetting)}
              size="large"
            />
          </Tooltip>
        </Dropdown>
      </Control>
      <TileLayer
        url={tileUrl}
        tileSize={512}
        zoomOffset={-1}
        attribution='&copy; <a href="https://www.mapbox.com/about/maps/">mapbox</a> | &copy; <a href="https://www.openstreetmap.org/about/">OpenStreetMap</a>'
      />
      <ImageOverlay
        url="/img/map/tu-render.png"
        bounds={imageBounds}
        zIndex={5}
        // opacity={0.89}
        opacity={0.85}
      />
    </>
  );
};

export default MapTile;
