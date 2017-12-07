import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {
  AuthContainer,
  AuthHeading,
  AuthTouch,
  AuthConfirmBlock,
} from './components';

import {
  resetPasswordSelector,
} from '../../redux/auth/selectors';

class ResetPasswordConfirm extends React.Component {
  static propTypes = {
    resetPasswordData: ImmutablePropTypes.contains({
      requesting: PropTypes.bool,
      error: PropTypes.string,
    }).isRequired,
  }

  onBackToLogin = () => {
    Actions.pop();
    Actions.pop();
  }

  render() {
    const { resetPasswordData } = this.props;
    const message = resetPasswordData.getIn(['response', 'message']);
    return (
      <AuthContainer>
        <AuthHeading
          title="Reset Password"
          subTitle={null}
        />
        <AuthConfirmBlock>
          {message}
        </AuthConfirmBlock>
        <AuthTouch onPress={this.onBackToLogin}>BACK TO LOGIN</AuthTouch>
      </AuthContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    resetPasswordData: resetPasswordSelector(state),
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordConfirm);
