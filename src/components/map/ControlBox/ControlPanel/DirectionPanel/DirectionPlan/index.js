import React from 'react';
import { RightOutlined } from '@ant-design/icons';

const DirectionPlan = ({ plan, isActive, onClick }) => {
  const PlanDetails = [];
  plan.forEach(({ route, distance }, index) => {
    // PlanDetails
    PlanDetails.push(
      <div className="PlanDetail--icon" key={index}>
        <div className="PlanDetail--routeGroup">
          <img
            src={`/img/map/${route ? 'bus' : 'walking'}.svg`}
            alt={`/${route ? 'bus' : 'walking'}`}
            width="15"
          />
          <p className="PlanDetail--route">
            {route || `${(distance / 1000).toFixed(2)} km`}
          </p>
        </div>
        <RightOutlined />
      </div>,
    );
  });

  return (
    <div
      className={`PlanDetail ${isActive && 'PlanDetail__active'}`}
      onClick={onClick}
    >
      {PlanDetails}
    </div>
  );
};

export default DirectionPlan;
