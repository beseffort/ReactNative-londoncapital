import React from 'react';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { encrypt } from '../../utils/encrypt';
import {
  AuthContainer,
  AuthHeading,
  AuthInput,
  AuthButton,
  AuthErrorBlock,
} from './components';
import {
  userSelector,
} from '../../redux/auth/selectors';

class SetPin extends React.Component {
  static propTypes = {
    userData: ImmutablePropTypes.contains({
      email: PropTypes.string,
      token: PropTypes.string,
    }).isRequired,
  }

  state = { pin: '', pinConfirm: '', error: '' }

  onChangeTextFunc = name => value => this.setState({ [name]: value, error: '' })

  onSetPin = () => {
    const { pin, pinConfirm } = this.state;
    const { userData } = this.props;
    if (pin.length === 0) {
      return this.setState({ error: 'PIN should not be empty.' });
    }
    if (pin !== pinConfirm) {
      return this.setState({ error: 'Please confirm PIN again.' });
    }

    const email = userData.get('email');
    const token = userData.get('token');
    if (!pin || !token) return null;
    const encryptedToken = encrypt(token, pin);
    const tokenFingerPrint = encrypt(token, 'pin-finger-print');
    return AsyncStorage.multiSet([['token', encryptedToken], ['tokenFingerPrint', tokenFingerPrint], ['email', email]], () => Actions.setPinConfirm());
  }

  render() {
    const { error } = this.state;
    return (
      <AuthContainer>
        <AuthHeading
          title="SET YOUR PIN"
          subTitle="Please set a PIN"
        />
        <View>
          {
            error
              ? <AuthErrorBlock>{error}</AuthErrorBlock>
              : null
          }
          <AuthInput placeholder="PIN" keyboardType="numeric" onChangeText={this.onChangeTextFunc('pin')} secureTextEntry />
          <AuthInput placeholder="Confirm PIN" keyboardType="numeric" onChangeText={this.onChangeTextFunc('pinConfirm')} secureTextEntry />
          <AuthButton onPress={this.onSetPin}>Save PIN</AuthButton>
        </View>
        <View />
      </AuthContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: userSelector(state),
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SetPin);
