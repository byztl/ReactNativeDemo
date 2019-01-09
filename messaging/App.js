import React from 'react';
import { StyleSheet, View, Alert, Image, TouchableHighlight } from 'react-native';

import Toolbar from './components/Toolbar';
import MessageList from './components/MessageList';
import { createImageMessage, createLocationMessage, createTextMessage } from './utils/MessageUtils';
import Status from './components/Status';



export default class App extends React.Component {

  state = {
    messages: [
      createImageMessage('http://a.hiphotos.baidu.com/zhidao/pic/item/ae51f3deb48f8c548cbb8b3a3a292df5e0fe7fbe.jpg'),
      createTextMessage('World'),
      createTextMessage('Hello'),
      createLocationMessage({
        latitude: 37.78825,
        longitude: -122.4324,
      }),
    ],
    fullscreenImageId: null,
    isInputFocused: false,
  };

  handlePressToolbarCamera = () => {

  } 

  handlePressToolbarLocation = () => {

  }
  
  handleChangeFocus = (isFocused) => {
    this.setState({ isInputFocused: isFocused });
  }

  handleSubmit = (text) => {
    const { messages } = this.state;

    this.setState({
      messages: [createTextMessage(text), ...messages],
    });
  }

  renderToolbar() {
    alert('test');
    const { isInputFocused } = this.state;

    return (
      <View style={styles.toolbar}>
        <Toolbar 
          isFocused={isInputFocused}
          onSubmit={this.handleSubmit}
          onChangeFocus={this.handleChangeFocus}
          onPressCamera={this.handlePressToolbarCamera}
          onPressLocaiont={this.handlePressToolbarLocation}
        />
      </View>
    )
  }
  dismissFullscreenImage = () => {
    this.setState({ fullscreenImageId: null });
  }
 
  handlePressMessage = ({ id, type}) => {
    switch (type) {
      case 'text':
        Alert.alert(
          'Delete message?',
          'Are you sure you want to permanently delete this message?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            { text: 'Delete',
              style: 'destructive',
              onPress: () => {
                const { messages } = this.state;
                this.setState({messages: messages.filter(message => message.id !== id)});
              }
            }
          ]
        )
        break;
      case 'image':
        this.setState({ fullscreenImageId: id });
        break;
      default:
        break;
    }
  }

  renderFullscreenImage = () => {
    const { messages, fullscreenImageId } = this.state;

    if (!fullscreenImageId) return null;

    const image = messages.find(message => message.id === fullscreenImageId);

    if (!image) return null;

    const { uri } = image;

    return (
      <TouchableHighlight style={styles.fullscrenOverlay} onPress={this.dismissFullscreenImage}>
        <Image style={styles.fullscreenImage} source={{ uri }}/>
      </TouchableHighlight>
    )
  }



  renderMessageList() {
    const { messages } = this.state;

    return (
      <View style={styles.content}>
        <MessageList messages={messages} onPressMessage={this.handlePressMessage} />
      </View>
    );
  }

  renderInputMethoidEditor() {
    return (
      <View style={styles.inputMethodEditor}></View>
    );
  }

  renderToolbar() {
    return (
      <View style={styles.toolbar}></View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Status />
        {this.renderMessageList()}
        {this.renderToolbar()}
        {this.renderInputMethoidEditor()}
        {this.renderFullscreenImage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    borderBottomColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
  },
  fullscrenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 2,
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: 'contain',
  }
});
