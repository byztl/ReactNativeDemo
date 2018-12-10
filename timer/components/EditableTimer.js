import React from 'react';
import { StyleSheet, TextInput, View, Text} from 'react-native';

import PropTypes from 'prop-types';
import TimerForm from './TimerForm';
import Timer from './Timer';

export default class EditableTimer extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    elapsed: PropTypes.number.isRequired,
    isRunning: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onRemovePress: PropTypes.func.isRequired,
    onStartPress: PropTypes.func.isRequired,
    onStopPress: PropTypes.func.isRequired,
};


  state = {
    editFormOpen: false,
  };

  handleEditPress = () => {
    this.openForm();
  };

  handleFormClose = () => {
    this.closeForm();
  };

  handleSubmit = timer => {
    const { onFormSubmit } = this.props;
    onFormSubmit(timer);  // timer 接受的是 TimerForm 传来的参数, 三个实参被自动装箱成一个形参 (ES6语法)
    this.closeForm();
  };

  closeForm = () => {
    this.setState({ editFormOpen: false });
  };

  openForm = () => {
    this.setState({ editFormOpen: true });
  };

  render() {
    const { id, 
            title, 
            project, 
            elapsed, 
            isRunning, 
            onTimerRemove, 
            onStartPress,
            onStopPress,
          } = this.props;
    const { editFormOpen } = this.state;
    if (editFormOpen) {
      return <TimerForm 
              id={id} 
              title={title} 
              project={project} 
              onFormSubmit={this.handleSubmit}
              onFormClose={this.handleFormClose}
            />
    } 
    return (
      <Timer
        id={id}
        title={title}
        project={project}
        elapsed={elapsed}
        isRunning={isRunning}
        onEditPress={this.handleEditPress}
        onRemovePress={onTimerRemove}
        onStartPress={onStartPress}
        onStopPress={onStopPress}
      />
    )
  }
}
