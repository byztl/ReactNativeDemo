import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, View} from 'react-native';

import AuthorRow from './AuthorRow';

export default class Card extends React.Component {
  static propTypes = {
    fullName: PropTypes.string.isRequired,
    image: Image.propTypes.source.isRequired,
    linkText: PropTypes.string,
    onPressLinkText: PropTypes.func,
  };

  static defaultProps = {
    linkText: '',
    onPressLinkText: () => {},
  }

  render() {
    const { fullName, image, linkText, onPressLinkText } = this.props;

    return (
      <View>
        <AuthorRow 
          fullname={fullName}
          linkText={linkText}
          onPressLinkText={onPressLinkText}
        />
        <Image style={styles.image} source={image} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    backgroundColor: 'rgba(0,0,0,0.02)',
  }
})
