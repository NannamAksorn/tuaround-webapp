import { combineReducers } from 'redux';
import ngvReducer from './ngvReducer';
import mapReducer from './mapReducer';
import stopReducer from './stopReducer';
import infoReducer from './infoReducer';
import directionReducer from './directionReducer';

const rootReducer = combineReducers({
  ngv: ngvReducer,
  map: mapReducer,
  stop: stopReducer,
  info: infoReducer,
  direction: directionReducer,
});

export default rootReducer;
