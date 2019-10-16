import { combineReducers } from 'redux';
import fetchApiReducer from './fetchApiReducer';

export default combineReducers({
  events: fetchApiReducer,
});
