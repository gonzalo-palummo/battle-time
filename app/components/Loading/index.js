import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from './styles';
import {useTheme} from '@config';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

export default function Loading({alwaysLoading}) {
  const {colors} = useTheme();
  const loadingCounter = useSelector(state => state.application.loading);
  return alwaysLoading === true || loadingCounter > 0 ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  ) : null;
}

Loading.propTypes = {
  alwaysLoading: PropTypes.bool,
};

Loading.defaultProps = {
  alwaysLoading: false,
};
