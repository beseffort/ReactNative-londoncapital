import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Main from './Main';
import WebViewPage from './WebViewPage';
import {
  Login,
  LoginPin,
  LoginPinFirst,
  ResetPassword,
  ResetPasswordConfirm,
  SetPin,
  SetPinConfirm,
} from './auth';

const App = () => (
  <Router>
    <Scene>
      <Scene key="main" component={Main} hideNavBar />
      <Scene key="webViewPage" component={WebViewPage} hideNavBar />
      <Scene key="resetPassword" component={ResetPassword} hideNavBar />
      <Scene key="resetPasswordConfirm" component={ResetPasswordConfirm} hideNavBar />
      <Scene key="login" component={Login} hideNavBar />
      <Scene key="loginPin" component={LoginPin} hideNavBar />
      <Scene key="loginPinFirst" component={LoginPinFirst} hideNavBar />
      <Scene key="setPin" component={SetPin} hideNavBar />
      <Scene key="setPinConfirm" component={SetPinConfirm} hideNavBar />
    </Scene>
  </Router>
);

export default App;
