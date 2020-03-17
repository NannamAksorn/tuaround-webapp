import { combineReducers } from 'redux';
import ngvReducer from './ngvReducer';
import mapReducer from './mapReducer';
import stopReducer from './stopReducer';

const rootReducer = combineReducers({
  ngv: ngvReducer,
  map: mapReducer,
  stop: stopReducer,
});

export default rootReducer;
