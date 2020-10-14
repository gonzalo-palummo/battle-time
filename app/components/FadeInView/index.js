import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';
import PropTypes from 'prop-types';

export default function FadeInView(props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: props.duration * 1000,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
}

FadeInView.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  duration: PropTypes.number.isRequired,
};

FadeInView.defaultProps = {
  style: {},
};
