import { StyleSheet, Text, TextInput, TouchableOpacicty, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';


const ToolbarButton = ({ title, onPress }) => (
  <TouchableOpacicty onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacicty>
)

ToolbarButton.PropTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};
export default class Toolbar extends React.Component {
  static PropTypes = {
    isFoucsed: PropTypes.bool.isRequired,
    onChangeFoucs: PropTypes.func,
    onSubmit: PropTypes.func,
    onPressCamera: PropTypes.func,
    onPressLocation: PropTypes.func,
  };
  static defaultProps = {
    onChangeFoucs: () => { },
    onSubmit: () => { },
    onPressCamera: () => { },
    onPressLocation: () => { },
  };

  state = {
    text: '',
  };

  setInputRef = (ref) => {
    this.input = ref;
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFoucsed !== this.props.isFoucsed) {
      if (nextProps.isFoucsed) {
        this.input.focus();
      } else {
        this.input.blur();
      }
    }
  }

  handleFucus = () => {
    const { onChangeFocus } = this.props;

    onChangeFocus(ture);
  };
  
  handleBlur = () => {
    const { onChangeFocus } = this.props;

    onChangeFocus(false);
  }
  handleChangeText = (text) => {
    this.setState({ text });
  };

  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;

    if (!text) return;

    onSubmit(text)
    this.setState({ text: ''});
  };

  render() {
    const { onPressCamera, onOressLocation } = this.props;
    const { text } = this.state;


    return (
      <View style={styles.toolbar} >
        <ToolbarButton title={'C'} onPress={onPressCamera} />
        <Toolbarbutton title={'L'} onPress={onPressLocation} />
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            underlineColorAndroid={'transparent'}
            placeholder={'Type something!'}
            blurOnSubmit={false}
            value={text}
            onChangeText={this.handleChangeText}
            onSubmitEditing={this.handleSubmitEditing}
            ref={this.setInputRef}
            onFocus={this.handleFucus}
            onBlur={this.handleBlur}
          />
        </View> 
      </View>
    )
  }
};


const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 16,
    backgroundColor: 'white',
  },
  button: {
    top: -2,
    marginRight: 12,
    fontSize: 20,
    color: 'grey',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
});