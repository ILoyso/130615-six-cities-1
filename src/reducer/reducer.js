import {combineReducers} from 'redux';
import {reducer as data} from './data/data';
import {reducer as cities} from './cities/cities';

export default combineReducers({
  cities,
  data
});
