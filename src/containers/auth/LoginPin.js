import React from 'react';
import PropTypes from 'prop-types';
import { View, AsyncStorage, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Authenticate from 'react-native-authenticate';

import { decrypt } from '../../utils/encrypt';

import {
  setUserData,
} from '../../redux/auth/actions';

import {
  AuthContainer,
  AuthHeading,
  AuthInput,
  AuthButton,
  AuthTouch,
  AuthErrorBlock,
} from './components';

const styles = StyleSheet.create({
  authenticate: { position: 'absolute', left: 0, right: 0, top: 0, bottom: -30 },
});

class LoginPin extends React.Component {
  static propTypes = {
    setUserData: PropTypes.func.isRequired,
  }

  state = { hasFingerprint: true, pin: '', error: '', fingerPrintPopup: false, supportFingerPrint: false };

  componentWillMount() {
    AsyncStorage.getItem('fingerprint', (error, result) => this.setState({ hasFingerprint: result === 'use' }));
    Authenticate.isSupported()
      .then(() => this.setState({ supportFingerPrint: true }))
      .catch(() => this.setState({ supportFingerPrint: false }));
  }

  onLoginPin = () => {
    AsyncStorage.multiGet(['token', 'email'], (err, [[, encryptedToken], [, email]]) => {
      try {
        const { pin } = this.state;
        const token = decrypt(encryptedToken, pin);
        if (!token) return this.setState({ error: 'Incorrect PIN code.' });
        const { setUserData: setUserDataAction } = this.props;
        setUserDataAction(email, token, pin);
        Actions.webViewPage();
      } catch (e) {
        this.setState({ error: 'Incorrect PIN code.' });
      }
      return null;
    });
  }

  onForgotPin = () => {
    AsyncStorage.multiRemove(['token', 'pin'], () => {
      Actions.login();
    });
  }

  onFingerPrintLogin = () => {
    this.setState({ fingerPrintPopup: true });
  }

  onCancelFingerPrintLogin = () => {
    this.setState({ fingerPrintPopup: false });
  }

  onSuccessFingerPrintLogin = () => {
    AsyncStorage.multiGet(['tokenFingerPrint', 'email'], (err, [[, encryptedToken], [, email]]) => {
      try {
        const pin = 'pin-finger-print';
        const token = decrypt(encryptedToken, pin);
        if (!token) return this.setState({ error: 'Something is wrong.' });
        const { setUserData: setUserDataAction } = this.props;
        setUserDataAction(email, token, pin);
        Actions.webViewPage();
      } catch (e) {
        this.setState({ error: 'Something is wrong.' });
      }
      return null;
    });
  }

  onChangeTextFunc = name => value => this.setState({ [name]: value, error: '' })

  render() {
    const { hasFingerprint, error, fingerPrintPopup, supportFingerPrint } = this.state;
    return (
      <AuthContainer>
        <AuthHeading />
        <View>
          {
            error
              ? <AuthErrorBlock>{error}</AuthErrorBlock>
              : null
          }
          <AuthInput placeholder="PIN" keyboardType="numeric" secureTextEntry onChangeText={this.onChangeTextFunc('pin')} />
          <AuthButton onPress={this.onLoginPin}>LOGIN</AuthButton>
          <AuthTouch onPress={this.onForgotPin}>FORGOT PIN? LOGIN WITH PASSWORD</AuthTouch>
        </View>
        <View>
          {
            hasFingerprint && supportFingerPrint ? (
              <View>
                <AuthButton highlight onPress={this.onFingerPrintLogin}>
                  Fingerprint login
                </AuthButton>
              </View>
            ) : null
          }
        </View>
        {
          fingerPrintPopup ? (
            <View style={styles.authenticate}>
              <Authenticate
                onCancel={this.onCancelFingerPrintLogin}
                onAuthentication={this.onSuccessFingerPrintLogin}
              />
            </View>
          ) : null
        }
      </AuthContainer>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    setUserData: (email, token, pin) => dispatch(setUserData(email, token, pin)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPin);
