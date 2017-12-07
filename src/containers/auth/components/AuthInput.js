import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: { backgroundColor: 'white', padding: 10, marginTop: 10, fontSize: 12, color: '#201646' },
});

const AuthInput = props => (
  <TextInput {...props} style={styles.input} underlineColorAndroid="transparent" />
);

export default AuthInput;
