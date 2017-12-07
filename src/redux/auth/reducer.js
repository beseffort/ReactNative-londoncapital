import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_PIN_REQUEST,
  LOGIN_PIN_SUCCESS,
  LOGIN_PIN_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  SET_USER_DATA,
} from '../constants';

const initialState = fromJS({
  user: {
    email: '',
    token: '',
    pin: '',
  },
  login: {
    requesting: false,
    response: {},
    error: '',
  },
  loginPin: {
    requesting: false,
    response: {},
    error: '',
  },
  resetPassword: {
    requesting: false,
    response: {},
    error: '',
  },
});

const loginRequest = (state, action) =>
  state
    .setIn(['login', 'requesting'], true)
    .setIn(['login', 'response'], fromJS({}))
    .setIn(['login', 'error'], '')
    .setIn(['user', 'email'], action.payload.email);

const loginSuccess = (state, action) =>
  state
    .setIn(['login', 'requesting'], false)
    .setIn(['login', 'response'], fromJS(action.response))
    .setIn(['login', 'error'], '');

const loginFailure = (state, action) =>
  state
    .setIn(['login', 'requesting'], false)
    .setIn(['login', 'response'], fromJS({}))
    .setIn(['login', 'error'], action.error);

const loginPinRequest = state =>
  state
    .setIn(['loginPin', 'requesting'], true)
    .setIn(['loginPin', 'response'], fromJS({}))
    .setIn(['loginPin', 'error'], '')
    .setIn(['user', 'token'], '')
    .setIn(['user', 'pin'], '');

const loginPinSuccess = (state, action) =>
  state
    .setIn(['loginPin', 'requesting'], false)
    .setIn(['loginPin', 'response'], fromJS(action.response))
    .setIn(['loginPin', 'error'], '')
    .setIn(['user', 'token'], action.token)
    .setIn(['user', 'pin'], action.pin);

const loginPinFailure = (state, action) =>
  state
    .setIn(['loginPin', 'requesting'], false)
    .setIn(['loginPin', 'response'], fromJS({}))
    .setIn(['loginPin', 'error'], action.error)
    .setIn(['user', 'token'], '')
    .setIn(['user', 'pin'], '');

const resetPasswordRequest = (state, action) =>
  state
    .setIn(['resetPassword', 'requesting'], true)
    .setIn(['resetPassword', 'response'], fromJS({}))
    .setIn(['resetPassword', 'error'], '')
    .setIn(['user', 'email'], action.payload.email);

const resetPasswordSuccess = (state, action) =>
  state
    .setIn(['resetPassword', 'requesting'], false)
    .setIn(['resetPassword', 'response'], fromJS(action.response))
    .setIn(['resetPassword', 'error'], '');

const resetPasswordFailure = (state, action) =>
  state
    .setIn(['resetPassword', 'requesting'], false)
    .setIn(['resetPassword', 'response'], fromJS({}))
    .setIn(['resetPassword', 'error'], action.error);

const setUserData = (state, action) =>
  state
    .update('user', user => fromJS({
      ...user.toJS(),
      ...action.payload,
    }));

export default handleActions({
  [LOGIN_REQUEST]: loginRequest,
  [LOGIN_SUCCESS]: loginSuccess,
  [LOGIN_FAILURE]: loginFailure,
  [LOGIN_PIN_REQUEST]: loginPinRequest,
  [LOGIN_PIN_SUCCESS]: loginPinSuccess,
  [LOGIN_PIN_FAILURE]: loginPinFailure,
  [RESET_PASSWORD_REQUEST]: resetPasswordRequest,
  [RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
  [RESET_PASSWORD_FAILURE]: resetPasswordFailure,
  [SET_USER_DATA]: setUserData,
}, initialState);
