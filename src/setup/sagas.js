import authSaga from '../redux/auth/sagas';
/*
 * The entry point for all the sagas used in this application.
 */
const root = function* root() {
  yield [
    ...authSaga,
  ];
};

export default root;
