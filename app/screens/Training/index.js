import React, {useState, useEffect, useRef} from 'react';
import {View, SafeAreaView} from 'react-native';
import {RNCamera} from 'react-native-camera';
import KeepAwake from 'react-native-keep-awake';
import {FloatingWords, BattleTimer, Loading} from '@components';
import {RepositoryFactory} from '@repositories/RepositoryFactory';
import {Player} from '@react-native-community/audio-toolkit';

const battlesRepository = RepositoryFactory.get('battles');

export default function Training({navigation, route}) {
  const [beat] = useState(route.params.beat);
  const [words, setWords] = useState(null);
  const [showTimer, setShowTimer] = useState(false);
  const roundTime = 150;
  const player = useRef(null);

  const fetchWords = async () => {
    setWords(await battlesRepository.getWords());
    setShowTimer(true);
  };

  const replay = () => {
    setShowTimer(false);
    setTimeout(() => {
      fetchWords();
    }, 1000);
  };

  useEffect(() => {
    fetchWords();
    player.current = new Player(beat.audioUrl).play();
    player.current.looping = true;
    return () => {
      player.current.destroy();
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <KeepAwake />

      <SafeAreaView style={{flex: 1}} forceInset={{top: 'always'}}>
        {showTimer && (
          <BattleTimer
            time={roundTime}
            words={words}
            myTurn={true}
            onFinishTime={replay}
          />
        )}
        <View style={{flex: 1}}>
          <RNCamera type="front" style={{flex: 1}} />
        </View>
      </SafeAreaView>

      <Loading />
    </View>
  );
}
