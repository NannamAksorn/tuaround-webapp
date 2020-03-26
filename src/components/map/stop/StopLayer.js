/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StopMarker } from './StopIcon';
import { LayerGroup } from 'react-leaflet';
import { fetchStopAction, clickStopAction } from '@/actions/stopAction';

const mapStateToProps = ({ stop }) => ({
  stops: stop.stops,
  curStopListen: stop.curStopListen,
});

const StopLayer = ({ dispatch, stops, iconScale, curStopListen }) => {
  // Fetch Stop
  useEffect(() => {
    dispatch(fetchStopAction());
  }, []);
  // Handle Click
  const handleStopClick = id => {
    dispatch(clickStopAction(id));
  };

  const iconSize = 15 * iconScale;
  const list = stops.map(stop => {
    const { id, name_en, name_th, latlon } = stop;
    return (
      <StopMarker
        id={id}
        name_en={name_en}
        name_th={name_th}
        latlon={latlon}
        key={stop.id}
        onClick={handleStopClick}
        iconSize={iconSize}
        stopFill={curStopListen === id ? '#b25' : ''}
      />
    );
  });
  return <LayerGroup>{list}</LayerGroup>;
};

export default connect(mapStateToProps)(StopLayer);
