import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, Vote, FloatingWords, Icon, BattleTimer} from '@components';
import styles from './styles';
import Video from 'react-native-video';
import {useTheme} from '@config';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Alert, View} from 'react-native';
import battlesRepository from '@repositories/battlesRepository';
import {searchEvent} from '@utils';

export default function VideoRecorded({navigation, route}) {
  console.log(route.params.battle);
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [showLoading, setShowLoading] = useState(true);
  const [currentTextEvent, setCurrentTextEvent] = useState({time: null, text: null});
  const [currentMethodEvent, setCurrentMethodEvent] = useState({
    time: null,
    method: null,
  });
  const urlVideo = route.params.battle.urlMp4;
  const battleId = route.params.battle.id;
  const player = useRef();
  const roundTime = 60;
  const [battleWords, setBattleWords] = useState(route.params.battle.words.split(','));
  const [roundWords, setRoundWords] = useState(null);
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    async function saveView() {
      await battlesRepository.saveView(battleId);
    }
    saveView();
  }, []);

  const onVideoError = data => {
    console.log('On video error: ', data);
    Alert.alert(t('connection_error_has_occurred'), t('try_again'), [
      {text: 'Aceptar', onPress: () => navigation.goBack()},
    ]);
  };

  const onLoad = data => {
    setShowLoading(false);
    console.log('On load: ', data);
  };

  const onEnd = () => {
    setShowTimer(false);
  };

  const onProgress = data => {
    const currentTime = Math.trunc(data.currentTime);
    const user1 = route.params.battle.users[0];
    const user2 = route.params.battle.users[1];
    const time = 1;
    const messages = {
      user1Turn: 'Es el turno de ' + user1.nickname,
      user2Turn: 'Es el turno de ' + user2.nickname,
      battleWillStart: 'La batalla comienza en 20 segundos',
    };

    function extractRoundWords() {
      const battleWordsCopy = JSON.parse(JSON.stringify(battleWords));
      const extractedWords = battleWordsCopy.splice(0, 6);
      setRoundWords(extractedWords);
      setBattleWords(battleWordsCopy);
      console.log(extractedWords);
      console.log(battleWordsCopy);
    }

    const eventFound = searchEvent(
      [
        {time: time * 0, text: messages.battleWillStart},
        {time: time * 5, text: messages.user2Turn},
        {
          time: time * 15,
          method: () => {
            extractRoundWords();
            setShowTimer(true);
          },
        },
        {time: time * 75, method: () => setShowTimer(false)},
        {time: time * 77, text: messages.user1Turn},
        {
          time: time * 87,
          method: () => {
            extractRoundWords();
            setShowTimer(true);
          },
        },
        {time: time * 147, method: () => setShowTimer(false)},
        {time: time * 149, text: messages.user2Turn},
        {
          time: time * 159,
          method: () => {
            extractRoundWords();
            setShowTimer(true);
          },
        },
        {time: time * 219, method: () => setShowTimer(false)},
        {time: time * 221, text: messages.user1Turn},
        {
          time: time * 231,
          method: () => {
            extractRoundWords();
            setShowTimer(true);
          },
        },
        {time: time * 291, method: () => setShowTimer(false)},
      ],
      currentTime,
    );

    if (
      eventFound !== undefined &&
      ((eventFound.text !== undefined && eventFound.time !== currentTextEvent.time) ||
        (eventFound.method !== undefined && eventFound.time !== currentMethodEvent.time))
    ) {
      if (eventFound.text) {
        setCurrentTextEvent(eventFound);
      } else {
        setCurrentMethodEvent(eventFound);
        eventFound.method();
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      {showLoading && (
        <ActivityIndicator size="large" color={colors.primary} style={styles.fullSize} />
      )}

      <Video
        source={{
          uri: urlVideo,
        }}
        ref={player}
        onLoad={onLoad}
        onError={onVideoError}
        onEnd={onEnd}
        onProgress={onProgress}
        style={!showLoading && styles.fullSize}
        resizeMode="cover"
      />

      {currentTextEvent.text && <FloatingWords bigText word={currentTextEvent.text} />}

      {showTimer && <BattleTimer time={roundTime} words={roundWords} />}
    </SafeAreaView>
  );
}
