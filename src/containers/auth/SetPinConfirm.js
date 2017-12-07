import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Authenticate from 'react-native-authenticate';

import {
  AuthContainer,
  AuthHeading,
  AuthTouch,
  AuthConfirmBlock,
} from './components';

class SetPin extends React.Component {
  state = { supportFingerPrint: false };

  componentWillMount() {
    Authenticate.isSupported()
      .then(() => this.setState({ supportFingerPrint: true }))
      .catch(() => this.setState({ supportFingerPrint: false }));
  }

  onProceedToPortal = () => {
    const { supportFingerPrint } = this.state;
    AsyncStorage.setItem('fingerprint', supportFingerPrint ? 'use' : 'inuse');
    Actions.webViewPage();
  }

  render() {
    const { supportFingerPrint } = this.state;
    return (
      <AuthContainer>
        <AuthHeading
          title="SET YOUR PIN"
          subTitle={null}
        />
        <View>
          <AuthConfirmBlock>
            Your Pin has been set and you can use that{supportFingerPrint ? '(or fingerprint)' : ''} next time you open the app.
          </AuthConfirmBlock>
          <AuthTouch onPress={this.onProceedToPortal}>PROCEED TO THE PORTAL</AuthTouch>
        </View>
        <View />
      </AuthContainer>
    );
  }
}

export default SetPin;
