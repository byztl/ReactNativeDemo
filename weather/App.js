import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import { fetchLcation, fetchWeather, fetchLocationId } from './utils/api';
import getImageForWeather from './utils/getImageForWeather'

import SearchInput from './components/SearchInput';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      location: '',
      temperature: 0,
      weather: '',
    }
  }

  handleUpdateLocation = async city => {
    if (!city) return;
    this.setState({ loading: true }, async () => {
      try {
        const locationId = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather(
          locationId
        );
        const weatherInfo = await fetchWeather(
          locationId
        );
        console.log(JSON.stringify(weatherInfo));
        

        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature
        });
      } catch (error) {
        this.setState({
          loading: false,
          error,
        })
      }
    });
  };


  componentDidMount() {
    this.handleUpdateLocation('San Francisco');
  }

  render() {
    const { loading, location, error, weather, temperature } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {/* 
          comsumize statusBar words text color 
        */}
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />
            {!loading && (
              <View>
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Could not load weather, please try a different city.
                  </Text>
                )}
              </View>
            )}

            {!error && (
              <View>
                <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
                <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
                <Text style={[styles.largeText, styles.textStyle]}>{`${Math.round(temperature)}°`}</Text>
              </View>
            )}

            <SearchInput
              placeholder="Search any city"
              onSubmit={this.handleUpdateLocation}
            />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
});
