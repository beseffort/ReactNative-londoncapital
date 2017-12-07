import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Image } from 'react-native';
import LoginAppLogo from '../../../assets/images/landc-logo.png';

const styles = StyleSheet.create({
  container: { display: 'flex', alignItems: 'center', paddingVertical: 10 },
  logo: { width: '100%', resizeMode: 'contain' },
  title: { color: '#201646', fontSize: 15, fontWeight: 'bold', marginTop: 40 },
  subTitle: { color: '#201646', fontSize: 12, marginTop: 10 },
  description: { color: '#201646', fontSize: 10, marginTop: 1, textAlign: 'center', opacity: 0.6 },
});

const AuthHeading = ({ title, subTitle, description }) => (
  <View style={styles.container}>
    <Image source={LoginAppLogo} style={styles.logo} />
    {title ? <Text style={styles.title}>{title}</Text> : null}
    {subTitle ? <Text style={styles.subTitle}>{subTitle}</Text> : null}
    {description ? <Text style={styles.description}>{description}</Text> : null}
  </View>
);

AuthHeading.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  description: PropTypes.string,
};

AuthHeading.defaultProps = {
  title: 'LOGIN',
  subTitle: 'Enter your PIN',
  description: null,
};

export default AuthHeading;
