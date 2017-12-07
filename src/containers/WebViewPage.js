
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { StyleSheet, WebView } from 'react-native';
import { connect } from 'react-redux';

import {
  userSelector,
} from '../redux/auth/selectors';

const styles = StyleSheet.create({
  background: {},
});

const WebViewPage = ({ userData }) => (
  <WebView
    source={{ uri: `https://staging.landc-portal.growcreate.co.uk/umbraco/surface/account/logintoken?email=${userData.get('email')}&token=${userData.get('token')}` }}
    style={[styles.background]}
    javaScriptEnabled
  />
);

WebViewPage.propTypes = {
  userData: ImmutablePropTypes.contains({
    email: PropTypes.string,
    token: PropTypes.string,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    userData: userSelector(state),
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(WebViewPage);
