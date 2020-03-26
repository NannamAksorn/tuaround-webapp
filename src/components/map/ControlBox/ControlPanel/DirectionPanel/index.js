/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Form, Input, AutoComplete, Button } from 'antd';
import { connect } from 'react-redux';
import { getDirectionAction } from '@/actions/directionAction';
import { setModeAction } from '@/actions/mapAction';
import {
  CP_SELECT_DIRECTION_FROM_MAP,
  CP_SELECT_DIRECTION_TO_MAP,
} from '@/components/map/ControlBox/ControlPanel';
import './styles.scss';
import { CP_NORMAL } from '../../ControlPanel/';
import polyline from 'google-polyline';
import { antPath } from 'leaflet-ant-path';
import { getDirectionRouteColor } from '@/utils';
import DirectionPlan from './DirectionPlan';
import { AimOutlined, EnvironmentOutlined } from '@ant-design/icons';

const mapStateToProps = ({ direction, map }) => ({
  plans: direction.plans,
  fromPlace: direction.fromPlace,
  toPlace: direction.toPlace,
  directionPlansLayer: map.directionPlansLayer,
});

const DirectionPanel = ({
  dispatch,
  fromPlace,
  toPlace,
  plans,
  directionPlansLayer,
}) => {
  const [active, setActive] = useState(0);
  const [planLayer, setPlanLayer] = useState([]);

  useEffect(() => {
    dispatch(getDirectionAction());
  }, [fromPlace, toPlace]);

  useEffect(() => {
    if (!directionPlansLayer) return;
    return () => {
      directionPlansLayer.clearLayers();
    };
  }, []);

  useEffect(() => {
    if (!directionPlansLayer) return;
    // SET DIRECTION PLANS Layer
    directionPlansLayer.clearLayers();
    const planLayersTemp = plans.map((plan, index) => {
      return plan.map(({ points, route }, pid) => {
        const polylinePoints = polyline.decode(points);
        const polyPath = antPath(polylinePoints, {
          delay: 1600,
          dashArray: [10, 80],
          color: getDirectionRouteColor(route),
          pulseColor: '#0005',
          weight: 8,
          opacity: index === active ? 0.8 : 0.1,
          fillColor: '#fff',
          fillOpacity: 1,
          hardwareAccelerated: true,
        });
        polyPath.addTo(directionPlansLayer);
        return polyPath;
      });
    });
    setPlanLayer(planLayersTemp);
    // TODOS SET ORIGIN AND END
  }, [plans, directionPlansLayer]);

  // Handle Action
  const handleDirectionPlanPress = index => {
    setActive(index);
    planLayer.forEach((plan, pid) => {
      pid === index
        ? plan.forEach(layer => layer.setStyle({ opacity: 0.8 }))
        : plan.forEach(layer => layer.setStyle({ opacity: 0.1 }));
    });
  };

  const handleChooseOnMapPress = mode => {
    dispatch(setModeAction(mode));
  };

  const handleClosePress = () => {
    dispatch(setModeAction(CP_NORMAL));
  };

  // DirectionPlanGroup
  const DirectionPlanGroup = () => {
    if (!plans) return;
    return plans.map((plan, index) => (
      <DirectionPlan
        plan={plan}
        key={index}
        isActive={active === index}
        onClick={() => handleDirectionPlanPress(index)}
      />
    ));
  };

  const options = mode => [
    {
      label: (
        <div>
          <AimOutlined />
          Current Position
        </div>
      ),
    },
    {
      value: '__CHOOSE_ON_MAP__',
      label: (
        <div onClick={() => handleChooseOnMapPress(mode)}>
          <EnvironmentOutlined />
          Choose On Map
        </div>
      ),
    },
  ];

  return (
    <div className="DirectionPanel TU--Yellow">
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
      <h2>Direction</h2>
      <Form
        name="direction"
        initialValues={{
          from: fromPlace.name_en || '',
          to: toPlace.name_en || '',
        }}
      >
        <Form.Item name="from">
          <AutoComplete options={options(CP_SELECT_DIRECTION_FROM_MAP)}>
            <Input
              allowClear
              placeholder="Select Origin"
              prefix={<AimOutlined />}
            />
          </AutoComplete>
        </Form.Item>
        <Form.Item name="to">
          <AutoComplete options={options(CP_SELECT_DIRECTION_TO_MAP)}>
            <Input
              allowClear
              placeholder="Select Destination"
              prefix={<EnvironmentOutlined />}
            />
          </AutoComplete>
        </Form.Item>
      </Form>
      <DirectionPlanGroup />
    </div>
  );
};

export default connect(mapStateToProps)(DirectionPanel);
