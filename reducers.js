import { combineReducers } from 'redux';
import entitiesReducer from './entities';

export default combineReducers({
  entities: entitiesReducer // pode ter mais de um entidade
})