import { combineReducers } from 'redux';
import ngvReducer from './ngvReducer';

const rootReducer = combineReducers({
  ngv: ngvReducer
})

export default rootReducer
