import { createAction } from 'redux-actions';

import {
  LOGIN_REQUEST,
  LOGIN_PIN_REQUEST,
  SET_USER_DATA,
  RESET_PASSWORD_REQUEST,
} from '../constants';

export const login = createAction(LOGIN_REQUEST, (email, password) => ({ email, password }));
export const loginPin = createAction(LOGIN_PIN_REQUEST, (email, pin) => ({ email, pin }));
export const resetPassword = createAction(RESET_PASSWORD_REQUEST, email => ({ email }));
export const setUserData = createAction(
  SET_USER_DATA,
  (email, token, pin) => ({ email, token, pin }),
);
