import React from 'react';
import { StyleSheet, Platform, NetInfo, StatusBar, View, Text } from 'react-native';
import { Constants } from 'expo';

const statusHeight = (Platform.OS === 'ios' ? Constants.statusBarHeight : 0);

export default class Status extends React.Component {
  state = {
    info: null,
  };



  async componentWillMount() {
    this.subscription = NetInfo.addEventListener('connectionChange', this.handleChange);

    const info = await NetInfo.getConnectionInfo();

    this.setState({ info });
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  handleChange = (info) => {
    this.setState({ info });
    StatusBar.setBarStyle(info === 'none' ? 'light-content' : 'dark-content');
  }



  render() {
    const { info } = this.state;

    const isConnected = info !== 'none';
    const backgroundColor = isConnected ? 'white' : 'red';

    const statusBar = (
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={isConnected ? 'dark-content' : 'light-content'}
        animated={false}
      />
    );

    const messageContainer = (
      <View style={styles.messageContainer} PointerEvent={'none'}>
        {statusBar}
        {!isConnected && (
          <View style={styles.bubble}>
            <Text style={styles.text}>No network connection</Text>
          </View>
        )}
      </View>
    )

    if (Platform.OS === 'ios') {
      return <View style={[styles.status, {backgroundColor}]}>{messageContainer}</View>
    }

    return messageContainer;
  }
}

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight
  },
  messageContainer: {
    zIndex: 1,
    position: 'absolute',
    top: statusHeight + 100,
    right: 0,
    left: 0,
    height: 80,
    alignItems: 'center',
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
  }
});
