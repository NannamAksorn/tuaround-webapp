import React from 'react';
import { IconButton } from '../../../components/main/Button/index';
import { Row, Col } from 'antd';
import ControlPanel, { CP_STOP } from './ControlPanel/index';
import { connect } from 'react-redux';
import { setModeAction } from '../../../actions/mapAction';
import './styles.scss';

const mapStateToProps = ({ map }) => ({
  mode: map.mode,
});

const ControlBox = ({ dispatch, mode }) => {
  const handleConfigStopClick = () => {
    dispatch(setModeAction(CP_STOP));
  };

  return (
    <>
      {/* Control Panel*/}
      <ControlPanel type={mode} />
      {/* Control Tab */}
      <div className="ControlBox TU--Red">
        <Row>
          {/* Config Stop */}
          <Col>
            <IconButton title="Config Stop" onClick={handleConfigStopClick} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default connect(mapStateToProps)(ControlBox);
