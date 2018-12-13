import React from 'react';
import {
  ActivityIndicator,
  Text,
  ViewPropType,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';

import { fetchImages } from '../utils/api';
import CardList from '../components/CardList';
