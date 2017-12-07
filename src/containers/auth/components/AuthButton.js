import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import Button from 'react-native-button';

const styles = StyleSheet.create({
  button: { backgroundColor: '#F09600', padding: 10, marginTop: 12, fontSize: 12, color: 'white' },
  highlightButton: { backgroundColor: '#F09600', padding: 10, marginTop: 12, fontSize: 13, fontWeight: 'bold', color: 'white' },
});

const AuthButton = props => (
  <Button
    {...props}
    style={props.highlight ? styles.highlightButton : styles.button}
  >
    {props.children}
  </Button>
);

AuthButton.propTypes = {
  children: PropTypes.node.isRequired,
  highlight: PropTypes.bool,
};

AuthButton.defaultProps = {
  highlight: false,
};

export default AuthButton;
