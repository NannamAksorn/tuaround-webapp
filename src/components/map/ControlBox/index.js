import React, { useState } from 'react';
import { IconButton } from '../../../components/main/Button/index';
import { Row, Col } from 'antd';
import ControlPanel, { CP_STOP } from './ControlPanel/index';
import './styles.scss'

const ControlBox = () => {
  const [controlPanelType, setControlPanelType] = useState(null);
  const handleConfigStopClick = () => {
    const newState = controlPanelType ? null : CP_STOP;
    setControlPanelType(newState)
  }

  return (
    <>
    {/* Control Panel*/}
    <ControlPanel type={controlPanelType} />
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
  )
}

export default ControlBox;