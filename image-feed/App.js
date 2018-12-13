import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

import Avatar from './components/Avatar';
import AuthorRow from './components/AuthorRow';
import Card from './components/Card';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Card
          fullname={'First Last'}
          linkText={'Comments'}
          onPressLinkText={() => {
            console.log('Pressed link!');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
  },
});

