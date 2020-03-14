import { combineReducers } from 'redux';
import ngvReducer from './ngvReducer';
import mapReducer from './mapReducer';

const rootReducer = combineReducers({
  ngv: ngvReducer,
  map: mapReducer,
})

export default rootReducer
