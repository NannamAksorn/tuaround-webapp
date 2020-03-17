import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import './styles.scss';
import { setModeAction } from '@/actions/mapAction';
import { CP_NORMAL } from '../../ControlPanel/index';

const mapStateToProps = ({ stop }) => ({
  stopsETA: stop.stopsETA,
  curStop: stop.curStop,
});

const StopETAPanel = ({ dispatch, stopsETA, curStop }) => {
  const { name_en, name_th } = curStop;
  const ETALists = Object.values(stopsETA).map(({ i, t, k }) => {
    if (t < 60) {
      return (
        <div className="estimate--card" key={`${k}-${i}`}>
          <div className={`car-icon-${k} estimate--badge`}>
            <h3>{i}</h3>
            <span className="estimate--route">สาย {k}</span>
          </div>
          <div className="estimate--time">
            {t > 0 ? `${t} นาที` : 'Arrival'}
          </div>
        </div>
      );
    }
    return null;
  });
  const handleClosePress = () => {
    dispatch(setModeAction(CP_NORMAL));
  };

  return (
    <div className="StopETAPanel TU--Yellow">
      <Button
        type="link"
        danger
        onClick={handleClosePress}
        style={{
          position: 'absolute',
          left: 0,
          transform: 'translateY(-.9em)',
        }}
      >
        X
      </Button>
      <div className="stationContainer">
        {/* <h3>{name_th}</h3> */}
        <h4>{name_en}</h4>
      </div>
      <hr />
      {/* Arrival Prediction*/}
      <div className="arrivalPrediction">
        {/* Forward */}
        {/* <h3>ประมาณเวลาที่รถจะมาถีง</h3> */}
        <span>Estimate Arrival Time</span>
        <div id="forwardPrediction">{ETALists}</div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(StopETAPanel);
