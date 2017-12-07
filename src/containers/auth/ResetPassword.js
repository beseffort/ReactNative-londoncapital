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
  AuthErrorBlock,
  AuthTouch,
} from './components';

import {
  userSelector,
  resetPasswordSelector,
} from '../../redux/auth/selectors';

import {
  resetPassword,
  setUserData,
} from '../../redux/auth/actions';

class ResetPassword extends React.Component {
  static propTypes = {
    resetPassword: PropTypes.func.isRequired,
    setUserData: PropTypes.func.isRequired,
    userData: ImmutablePropTypes.contains({
      email: PropTypes.string,
      token: PropTypes.string,
      pin: PropTypes.string,
    }).isRequired,
    resetPasswordData: ImmutablePropTypes.contains({
      requesting: PropTypes.bool,
      error: PropTypes.string,
    }).isRequired,
  }

  state = { email: '', error: '' }

  componentWillMount() {
    this.setState({ email: this.props.userData.get('email') });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userData.get('email') !== this.props.userData.get('email')) {
      this.setState({ email: nextProps.userData.get('email') });
    }
    if (!nextProps.resetPasswordData.get('requesting') && this.props.resetPasswordData.get('requesting') && !nextProps.resetPasswordData.get('error')) {
      Actions.resetPasswordConfirm();
    }
  }

  onResetPassword = () => {
    const {
      resetPassword: resetPasswordAction,
      setUserData: setUserDataAction,
      userData: { token, pin },
    } = this.props;
    const { email } = this.state;
    setUserDataAction(email, token, pin);
    resetPasswordAction(email);
  }

  onBackToLogin = () => {
    Actions.pop();
  }

  onChangeTextFunc = name => value => this.setState({ [name]: value })

  render() {
    const { email } = this.state;
    const { resetPasswordData } = this.props;
    const loading = resetPasswordData.get('requesting');
    const error = resetPasswordData.get('error');
    return (
      <AuthContainer loading={loading}>
        <AuthHeading title="Reset Password" subTitle="Please enter your email address." />
        <View>
          {
            error
              ? <AuthErrorBlock>{error}</AuthErrorBlock>
              : null
          }
          <AuthInput placeholder="Email" keyboardType="email-address" value={email} onChangeText={this.onChangeTextFunc('email')} />
          <AuthButton onPress={this.onResetPassword}>Reset Password</AuthButton>
        </View>
        <AuthTouch onPress={this.onBackToLogin}>BACK TO LOGIN</AuthTouch>
      </AuthContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: userSelector(state),
    resetPasswordData: resetPasswordSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetPassword: email => dispatch(resetPassword(email)),
    setUserData: (email, token, pin) => dispatch(setUserData(email, token, pin)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
