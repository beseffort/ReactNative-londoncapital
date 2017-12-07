import { call, put, takeLatest } from 'redux-saga/effects';

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
} from '../constants';

import {
  login,
  loginPin,
  resetPassword,
} from './api';

const loginWorker = function* loginWorker({ payload }) {
  const { response: { body }, error } = yield call(login, payload);
  if (error) {
    yield put({ type: LOGIN_FAILURE, error });
  } else if (body.status === 'Failed') {
    yield put({ type: LOGIN_FAILURE, error: body.message });
  } else {
    yield put({ type: LOGIN_SUCCESS, response: body, email: payload.email });
  }
};

const loginPinWorker = function* loginPinWorker({ payload }) {
  const { response: { body }, error } = yield call(loginPin, payload);
  if (error) {
    yield put({ type: LOGIN_PIN_FAILURE, error });
  } else if (body.status === 'Failed') {
    yield put({ type: LOGIN_PIN_FAILURE, error: body.message });
  } else {
    yield put({ type: LOGIN_PIN_SUCCESS, token: body.body, response: body, pin: payload.pin });
  }
};

const resetPasswordWorker = function* resetPasswordWorker({ payload }) {
  const { response: { body }, error } = yield call(resetPassword, payload);
  if (error) {
    yield put({ type: RESET_PASSWORD_FAILURE, error });
  } else if (body.status === 'Failed') {
    yield put({ type: RESET_PASSWORD_FAILURE, error: body.message });
  } else {
    yield put({ type: RESET_PASSWORD_SUCCESS, response: body, email: payload.email });
  }
};

const loginWatcher = function* loginWatcher() {
  yield takeLatest(LOGIN_REQUEST, loginWorker);
};

const loginPinWatcher = function* loginPinWatcher() {
  yield takeLatest(LOGIN_PIN_REQUEST, loginPinWorker);
};

const resetPasswordWatcher = function* resetPasswordWatcher() {
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordWorker);
};

// export all of the watcher sagas.
export default [
  loginWatcher(),
  loginPinWatcher(),
  resetPasswordWatcher(),
];
