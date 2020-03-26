/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { setModeAction } from '@/actions/mapAction';
import { setDirectionFromMarkerAction } from '@/actions/directionAction';
import {
  CP_DIRECTION,
  CP_SELECT_DIRECTION_FROM_MAP,
} from '@/components/map/ControlBox/ControlPanel';
// import { EnvironmentOutlined } from '@ant-design/icons';

const mapStateToProps = ({ map }) => ({
  clickLatLon: map.clickLatLon,
});

const SelectDirectionPanel = ({ dispatch, clickLatLon, mode }) => {
  // Handle Action
  const handleCanclePress = () => {
    dispatch(setModeAction(CP_DIRECTION));
  };

  const handleConfirmPress = () => {
    dispatch(setDirectionFromMarkerAction());
    dispatch(setModeAction(CP_DIRECTION));
  };

  // Util
  const modeTitle =
    mode === CP_SELECT_DIRECTION_FROM_MAP ? 'Origin' : 'Destination';

  return (
    <div className="DirectionPanel TU--Yellow">
      <h4>Please Select {modeTitle} from Map</h4>
      <h4>
        Marker Location: {clickLatLon[0]}, {clickLatLon[1]}
      </h4>
      <Button danger onClick={handleCanclePress}>
        Cancel
      </Button>
      <Button type="primary" onClick={handleConfirmPress}>
        Confirm
      </Button>
    </div>
  );
};

export default connect(mapStateToProps)(SelectDirectionPanel);
