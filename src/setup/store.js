import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducer';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const store = createStore(createReducer(), applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(sagas);
  return store;
}
