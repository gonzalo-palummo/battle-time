import React from 'react';
import {TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import {BaseColor, useTheme} from '@config';
import PropTypes from 'prop-types';
import {Text} from '@components';
import styles from './styles';

export default function Button(props) {
  const {colors} = useTheme();
  const {
    style,
    styleText,
    icon,
    outline,
    full,
    round,
    loading,
    children,
    upperFont,
    onPress,
    disabled,
    ...rest
  } = props;

  return (
    <TouchableOpacity
      {...rest}
      style={StyleSheet.flatten([
        [styles.default, {backgroundColor: colors.primary}, disabled && {opacity: 0.4}],
        outline && [
          styles.outline,
          {backgroundColor: 'transparent', borderColor: colors.primary},
        ],
        full && styles.full,
        round && styles.round,
        style,
      ])}
      activeOpacity={disabled ? 0.4 : 0.9}
      onPress={disabled ? null : onPress}>
      {icon ? icon : null}
      <Text
        style={StyleSheet.flatten([
          styles.textDefault,
          upperFont && {textTransform: 'uppercase'},
          styleText,
        ])}
        numberOfLines={1}>
        {children || 'Button'}
      </Text>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={outline ? colors.primary : BaseColor.blackColor}
          style={{paddingLeft: 5}}
        />
      ) : null}
    </TouchableOpacity>
  );
}

Button.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.node,
  outline: PropTypes.bool,
  full: PropTypes.bool,
  round: PropTypes.bool,
  loading: PropTypes.bool,
  upperFont: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  style: {},
  icon: null,
  outline: false,
  full: false,
  round: true,
  loading: false,
  upperFont: false,
  disabled: false,
  onPress: () => {},
};
