
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import configureStore from './setup/store';
import App from './containers/App';

const initialState = fromJS({});
const store = configureStore(initialState);

const londonCapital = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('londonCapital', () => londonCapital);
