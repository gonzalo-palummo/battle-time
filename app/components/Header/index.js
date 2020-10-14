import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {View, TouchableOpacity, StatusBar, Image} from 'react-native';
import {Text} from '@components';
import styles from './styles';
import PropTypes from 'prop-types';
import {Images} from '@config';

export default function Header(props) {
  const forceDark = useSelector(state => state.application.force_dark);
  const {
    style,
    styleLeft,
    styleCenter,
    styleRight,
    title,
    subTitle,
    onPressLeft,
    onPressShells,
    onPressRight,
    renderLeft,
    renderRight,
    barStyle,
    shells,
    blackTheme,
  } = props;

  useEffect(() => {
    let option = 'light-content';

    if (barStyle) {
      option = barStyle;
    }
    StatusBar.setBarStyle(option, true);
  });

  return (
    <View
      style={[
        styles.contain,
        style,
        (title || blackTheme) && {backgroundColor: 'black'},
      ]}>
      {renderLeft && (
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={[styles.contentLeft, styleLeft]}
            onPress={onPressLeft}>
            {renderLeft()}
          </TouchableOpacity>
        </View>
      )}
      <View style={[styles.contentCenter, styleCenter]}>
        <View style={styles.titleRow} />
        <Text title2 primaryColor semibold numberOfLines={1}>
          {title}
        </Text>

        {subTitle != '' && (
          <Text caption2 light>
            {subTitle}
          </Text>
        )}
      </View>
      <View style={styles.right}>
        <TouchableOpacity
          style={[styles.contentRightSecond, styleRight]}
          onPress={onPressRight}>
          {renderRight()}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.contentRight, styleRight]}
          onPress={onPressShells}>
          {shells !== null && (
            <View style={styles.shells}>
              <Image source={Images.shell} style={styles.shell} />
              <Text primaryColor title3 bold>
                {shells}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

Header.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleCenter: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
  onPressRight: PropTypes.func,
  onPressLeft: PropTypes.func,
  onPressShells: PropTypes.func,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  barStyle: PropTypes.string,
  shells: PropTypes.number,
  blackTheme: PropTypes.bool,
};

Header.defaultProps = {
  style: {},
  styleLeft: {},
  styleCenter: {},
  styleRight: {},
  renderLeft: null,
  renderRight: () => {},
  onPressLeft: () => {},
  onPressShells: () => {},
  onPressRight: () => {},
  title: 'Title',
  subTitle: '',
  barStyle: '',
  shells: null,
  blackTheme: false,
};
