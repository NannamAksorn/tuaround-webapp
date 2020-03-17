import React from 'react';
import { connect } from 'react-redux';
import NgvMarker from './NgvMarker';

const mapStateToProps = ({ ngv }) => {
  return {
    cars: ngv.cars,
  };
};
const NgvLayer = ({ cars, iconScale }) => {
  const iconSize = 45 * iconScale;
  const list = Object.values(cars).map(car => (
    <NgvMarker {...car} key={car.cid} iconSize={iconSize} />
  ));
  return <>{list}</>;
};

export default connect(mapStateToProps)(NgvLayer);
connect(mapStateToProps)(NgvLayer);
