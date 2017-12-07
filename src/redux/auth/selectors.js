import { createSelector } from 'reselect';

const authSelector = state => state.get('auth');

export const userSelector = createSelector(
  authSelector,
  auth => auth.get('user'),
);

export const loginSelector = createSelector(
  authSelector,
  auth => auth.get('login'),
);

export const loginPinSelector = createSelector(
  authSelector,
  auth => auth.get('loginPin'),
);

export const resetPasswordSelector = createSelector(
  authSelector,
  auth => auth.get('resetPassword'),
);

export default {};
