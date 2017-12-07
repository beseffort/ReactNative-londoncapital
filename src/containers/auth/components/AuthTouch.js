import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import Button from 'react-native-button';

const styles = StyleSheet.create({
  button: { padding: 10, marginTop: 12, fontSize: 11, color: '#675DC6' },
});

const AuthTouch = props => (
  <Button {...props} style={styles.button}>{props.children}</Button>
);

AuthTouch.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthTouch;
