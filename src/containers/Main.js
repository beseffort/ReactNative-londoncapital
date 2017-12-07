import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import Video from 'react-native-video';
import { Actions } from 'react-native-router-flux';

import AppIntroVideo from '../assets/videos/app_intro.mp4';

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
  },
});
class Main extends React.Component {
  onVideoEnd = () => {
    AsyncStorage.getItem('token', (err, encryptedToken) => {
      if (err || !encryptedToken) return Actions.login();
      return Actions.loginPin();
    });
  }

  render() {
    return (
      <View style={styles.background}>
        <Video
          source={AppIntroVideo}
          rate={1.0}
          volume={1.0}
          muted={false}
          paused={false}
          resizeMode="cover"
          onEnd={this.onVideoEnd}
          style={styles.background}
        />
      </View>
    );
  }
}

export default Main;
