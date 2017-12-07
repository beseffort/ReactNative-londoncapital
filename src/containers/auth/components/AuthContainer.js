import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Root from '../../Root';

const styles = StyleSheet.create({
  container: { backgroundColor: 'rgba(228, 227, 233, 0.5)', position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 },
  loading: { opacity: 0.5 },
  content: { position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, padding: 30, display: 'flex', justifyContent: 'space-around' },
  splitContent: { justifyContent: 'space-between' },
});

const AuthContainer = ({ children, split, loading }) => (
  <Root>
    <KeyboardAwareScrollView
      style={[styles.container, loading && styles.loading]}
      contentContainerStyle={[styles.content, split && styles.splitContent]}
      pointerEvents={loading ? 'none' : 'auto'}
    >
      {children}
    </KeyboardAwareScrollView>
  </Root>
);

AuthContainer.propTypes = {
  children: PropTypes.node.isRequired,
  split: PropTypes.bool,
  loading: PropTypes.bool,
};

AuthContainer.defaultProps = {
  split: false,
  loading: false,
};

export default AuthContainer;
