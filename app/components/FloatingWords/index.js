import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Text} from '@components';
import styles from './styles';
import PropTypes from 'prop-types';
import {useTheme} from '@config';

export default function FloatingWords({word, bigText, loading}) {
  const {colors} = useTheme();
  const [showText, setShowText] = useState(word);
  useEffect(() => {
    setShowText(word);
    let timeout;
    if (!loading) {
      timeout = setTimeout(() => setShowText(null), 5000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [word, loading]);
  return (
    <View style={[styles.floatingWord, loading && {top: 0, bottom: 0}]}>
      {showText && (
        <Text
          body1={!bigText}
          title3={bigText}
          semibold
          style={[
            bigText && styles.bigText,
            loading && styles.marginBottom,
            bigText && {backgroundColor: colors.primary},
          ]}>
          {showText}
        </Text>
      )}
      {loading && <ActivityIndicator size="large" color={colors.primary} />}
    </View>
  );
}

FloatingWords.propTypes = {
  word: PropTypes.string.isRequired,
  bigText: PropTypes.bool,
  loading: PropTypes.bool,
};

FloatingWords.defaultProps = {
  bigText: false,
  loading: false,
};
