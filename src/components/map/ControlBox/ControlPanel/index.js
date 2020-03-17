/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import { postStopAction } from '@/actions/stopAction';
import StopConfigPanel from './StopConfigPanel/index.js';
import StopETAPanel from './StopETAPanel/index.js';

// Redux
const mapStateToProps = ({ map }) => ({
  clickLatLon: map.clickLatLon,
});

// Type
export const CP_NORMAL = 0;
export const CP_STOP = 1;
export const CP_ETA = 2;
export const TYPE_TITLE = ['Normal', 'Config Stop', 'ETA'];

// MAIN
const ControlPanel = ({ dispatch, type, clickLatLon }) => {
  const handleAddStop = values => {
    const payload = { ...values, latlon: clickLatLon };
    dispatch(postStopAction(payload));
  };
  const title = TYPE_TITLE[type];
  const renderSwitch = () => {
    switch (type) {
      case CP_STOP:
        return (
          <StopConfigPanel
            onFinish={handleAddStop}
            clickLatLon={clickLatLon}
            title={title}
          />
        );
      case CP_ETA:
        return <StopETAPanel />;
      default:
        return;
    }
  };
  return (
    <div className={`ControlPanel ${type && 'ControlPanel__active'}`}>
      {renderSwitch()}
    </div>
  );
};

export default connect(mapStateToProps)(ControlPanel);
