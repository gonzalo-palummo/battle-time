import React, {useState, useEffect} from 'react';
import {View, Animated} from 'react-native';
import {useTheme} from '@config';
import {Text} from '@components';
import PropTypes from 'prop-types';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import styles from './styles';

export default function BattleTimer(props) {
  const {colors} = useTheme();
  const [time, setTime] = useState(props.time);
  const [words, setWords] = useState(props.words);
  const [word, setWord] = useState(null);
  useEffect(() => {
    let currentTimerTimeout;
    function onTimer() {
      setTime(oldTime => {
        if (oldTime > 0) {
          currentTimerTimeout = setTimeout(onTimer, 1000);
          return oldTime - 1;
        } else {
          props.onFinishTime();
          return null;
        }
      });
    }

    let currentWordTimeout;
    function onWord() {
      if (words.length > 0) {
        setWord(() => {
          currentWordTimeout = setTimeout(onWord, 10000);
          setWords(oldWords => {
            const newArray = oldWords;
            newArray.shift();
            return newArray;
          });
          return words[0];
        });
      } else {
        setWord(null);
      }
    }

    onTimer();

    if (words) {
      onWord();
    }

    return () => {
      clearTimeout(currentTimerTimeout);
      clearTimeout(currentWordTimeout);
    };
  }, []);
  return (
    time !== null && (
      <View style={styles.centerView}>
        <View style={[styles.circle]}>
          <CountdownCircleTimer
            isPlaying
            size={80}
            strokeWidth={4}
            duration={time}
            onComplete={props.onFinishTime}
            colors={[['#F6B000', 0.4], ['#ED7D31', 0.4], ['#A30000', 0.2]]}>
            {({remainingTime, animatedColor}) => (
              <Animated.Text style={{color: animatedColor, fontSize: 22}}>
                {remainingTime}
              </Animated.Text>
            )}
          </CountdownCircleTimer>

          {word && (
            <View
              style={[
                styles.wordContainer,
                props.myTurn && {bottom: -80, top: undefined},
              ]}>
              <Text bold title3 style={styles.word} numberOfLines={1}>
                {word}
              </Text>
            </View>
          )}
        </View>
      </View>
    )
  );
}

BattleTimer.propTypes = {
  time: PropTypes.number.isRequired,
  words: PropTypes.arrayOf(PropTypes.string),
  myTurn: PropTypes.bool,
  onFinishTime: PropTypes.func,
};

BattleTimer.defaultProps = {
  words: [],
  onFinishTime: () => {},
};
