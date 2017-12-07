import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, View } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

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
  loginPinSelector,
} from '../../redux/auth/selectors';

import {
  loginPin,
} from '../../redux/auth/actions';

class LoginPinFirst extends React.Component {
  static propTypes = {
    loginPin: PropTypes.func.isRequired,
    userData: ImmutablePropTypes.contains({
      email: PropTypes.string,
      token: PropTypes.string,
      pin: PropTypes.string,
    }).isRequired,
    loginPinData: ImmutablePropTypes.contains({
      requesting: PropTypes.bool,
      error: PropTypes.string,
    }).isRequired,
  }

  state = { pin: '' }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loginPinData.get('requesting') && this.props.loginPinData.get('requesting') && !nextProps.loginPinData.get('error')) {
      const pin = nextProps.userData.get('pin');
      const token = nextProps.userData.get('token');
      const email = nextProps.userData.get('email');
      if (!pin || !token) return;
      const encryptedToken = encrypt(token, pin);
      AsyncStorage.multiSet([['token', encryptedToken], ['email', email]], () => Actions.setPin());
    }
  }

  onLoginPin = () => {
    const { loginPin: loginPinAction, userData } = this.props;
    const { pin } = this.state;
    loginPinAction(userData.get('email'), pin);
  }

  onChangeTextFunc = name => value => this.setState({ [name]: value })

  render() {
    const { pin } = this.state;
    const { loginPinData } = this.props;
    const error = loginPinData.get('error');
    const loading = loginPinData.get('requesting');
    return (
      <AuthContainer loading={loading}>
        <AuthHeading
          description="Your PIN was sent to your mobile via SMS. Please enter it below."
        />
        <View>
          {
            error
              ? <AuthErrorBlock>{error}</AuthErrorBlock>
              : null
          }
          <AuthInput placeholder="PIN" keyboardType="numeric" value={pin} onChangeText={this.onChangeTextFunc('pin')} secureTextEntry />
          <AuthButton onPress={this.onLoginPin}>LOGIN</AuthButton>
        </View>
        <View />
      </AuthContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: userSelector(state),
    loginPinData: loginPinSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginPin: (email, pin) => dispatch(loginPin(email, pin)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPinFirst);
