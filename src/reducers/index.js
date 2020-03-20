import { combineReducers } from 'redux';
import ngvReducer from './ngvReducer';
import mapReducer from './mapReducer';
import stopReducer from './stopReducer';
import infoReducer from './infoReducer';

const rootReducer = combineReducers({
  ngv: ngvReducer,
  map: mapReducer,
  stop: stopReducer,
  info: infoReducer,
});

export default rootReducer;
