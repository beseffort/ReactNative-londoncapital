import React from 'react';
import PropTypes from 'prop-types';
import { View, NetInfo, StyleSheet, StatusBar } from 'react-native';
import AuthConfirmBlock from './auth/components/AuthConfirmBlock';

const styles = StyleSheet.create({
  root: { display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 },
});

class Root extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = { isConnected: false }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('change', this.handleConnectionChange);

    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({ isConnected }); },
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this.handleConnectionChange);
  }

  handleConnectionChange = (isConnected) => {
    this.setState({ isConnected });
  }

  render() {
    const { isConnected } = this.state;
    const { children } = this.props;
    if (isConnected) {
      return (
        <View style={styles.root}>
          <StatusBar hidden />
          {children}
        </View>
      );
    }
    return (
      <View style={styles.root}>
        <StatusBar hidden />
        <AuthConfirmBlock>
          No Internet Connection found
        </AuthConfirmBlock>
      </View>
    );
  }
}

export default Root;
