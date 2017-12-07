import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  block: { paddingHorizontal: 10, paddingVertical: 5, color: '#CC0000', fontSize: 12, textAlign: 'center' },
});

const AuthErrorBlock = ({ children }) => (
  <Text style={styles.block}>
    {children}
  </Text>
);

AuthErrorBlock.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthErrorBlock;
