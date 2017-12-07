import { combineReducers } from 'redux-immutable';

import authReducer from '../redux/auth/reducer';

export default function createReducer() {
  return combineReducers({
    auth: authReducer,
  });
}
