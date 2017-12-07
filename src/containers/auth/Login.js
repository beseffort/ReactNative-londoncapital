import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {
  AuthContainer,
  AuthHeading,
  AuthInput,
  AuthButton,
  AuthTouch,
  AuthErrorBlock,
} from './components';

import {
  loginSelector,
  userSelector,
} from '../../redux/auth/selectors';

import {
  login,
  setUserData,
} from '../../redux/auth/actions';

class Login extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    setUserData: PropTypes.func.isRequired,
    loginData: ImmutablePropTypes.contains({
      requesting: PropTypes.bool,
      error: PropTypes.string,
    }).isRequired,
    userData: ImmutablePropTypes.contains({
      email: PropTypes.string,
      token: PropTypes.string,
      pin: PropTypes.string,
    }).isRequired,
  }

  state = { email: '', password: '' }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loginData.get('requesting') && this.props.loginData.get('requesting') && !nextProps.loginData.get('error')) {
      Actions.loginPinFirst();
    }
    if (nextProps.userData.get('email') !== this.props.userData.get('email')) {
      this.setState({ email: nextProps.userData.get('email') || 'theo@growmediagroup.co.uk' });
    }
  }

  onLogin = () => {
    const { login: loginAction } = this.props;
    const { email, password } = this.state;
    loginAction(email, password);
  }

  onForgotPassword = () => {
    const {
      setUserData: setUserDataAction,
      userData: { token, pin },
    } = this.props;
    const { email } = this.state;
    setUserDataAction(email, token, pin);
    Actions.resetPassword();
  }

  onChangeTextFunc = name => value => this.setState({ [name]: value })

  render() {
    const { email, password } = this.state;
    const { loginData } = this.props;
    const error = loginData.get('error');
    const loading = loginData.get('requesting');
    return (
      <AuthContainer loading={loading}>
        <AuthHeading subTitle="Please enter your details" />
        <View>
          {
            error
              ? <AuthErrorBlock>{error}</AuthErrorBlock>
              : null
          }
          <AuthInput placeholder="Email" value={email} keyboardType="email-address" onChangeText={this.onChangeTextFunc('email')} />
          <AuthInput placeholder="Password" secureTextEntry value={password} onChangeText={this.onChangeTextFunc('password')} />
          <AuthButton onPress={this.onLogin}>LOGIN</AuthButton>
        </View>
        <AuthTouch onPress={this.onForgotPassword}>FORGOT YOUR PASSWORD?</AuthTouch>
      </AuthContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginData: loginSelector(state),
    userData: userSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (email, password) => dispatch(login(email, password)),
    setUserData: (email, token, pin) => dispatch(setUserData(email, token, pin)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
