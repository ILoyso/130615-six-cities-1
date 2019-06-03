import {combineReducers} from 'redux';
import {reducer as data} from './data/data';
import {reducer as cities} from './cities/cities';
import NameSpace from './name-spaces';

export default combineReducers({
  [NameSpace.CITIES]: cities,
  [NameSpace.DATA]: data,
});
