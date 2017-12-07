import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  block: { borderColor: '#F09600', borderWidth: 2, paddingHorizontal: 30, paddingVertical: 20, color: '#F09600', fontSize: 13, textAlign: 'center' },
});

const AuthConfirmBlock = ({ children }) => (
  <Text style={styles.block}>
    {children}
  </Text>
);

AuthConfirmBlock.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthConfirmBlock;
