import React, {useEffect, useState, useRef} from 'react';
import {View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, Text, Icon, Loading, Button} from '@components';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {RepositoryFactory} from '@repositories/RepositoryFactory';
import {Player} from '@react-native-community/audio-toolkit';

const beatsRepository = RepositoryFactory.get('beats');

export default function TrainingConfig({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [beats, setBeats] = useState(null);
  const [beatSelected, setBeatSelected] = useState(null);
  const [beatPlaying, setBeatPlaying] = useState(null);
  const player = useRef(null);

  const fetchBeats = async () => {
    setBeats(await beatsRepository.get());
  };

  useEffect(() => {
    fetchBeats();
    return () => {
      if (player.current !== null) player.current.destroy();
    };
  }, []);

  const playAudio = audioUrl => {
    if (beatPlaying !== null) {
      player.current.destroy();
    }

    player.current = new Player(audioUrl).play();
    player.current.looping = true;
  };

  return (
    <>
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title=""
          renderLeft={() => {
            return <Icon name="angle-left" size={28} />;
          }}
          onPressLeft={() => navigation.goBack()}
          blackTheme
        />
        <ScrollView>
          <Text title1 semibold primaryColor style={styles.headerTitle}>
            {t('training')}
          </Text>
          <View style={{padding: 20}}>
            <Text title3 semibold>
              {t('choose_the_beat')}
            </Text>
            {beats ? (
              beats.length ? (
                <View style={{paddingVertical: 15}}>
                  {beats.map(beat => (
                    <TouchableOpacity
                      style={[
                        styles.beat,
                        beatSelected?.id === beat.id && styles.beatSelected,
                      ]}
                      onPress={() => setBeatSelected(beat)}
                      key={beat.id}>
                      <Icon
                        name={beatPlaying === beat.id ? 'pause' : 'play'}
                        size={28}
                        color={colors.primary}
                        style={{marginRight: 20}}
                        onPress={() => {
                          if (beatPlaying === beat.id) {
                            player.current.destroy();
                            setBeatPlaying(null);
                          } else {
                            playAudio(beat.audioUrl);
                            setBeatPlaying(beat.id);
                          }
                        }}
                      />
                      <Text semibold body1>
                        {beat.name}
                      </Text>

                      <Icon
                        name={beatSelected?.id === beat.id ? 'check-circle' : 'circle'}
                        fill
                        size={28}
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <Text>No hay beats</Text>
              )
            ) : (
              <Text>No se ha podido traer la información</Text>
            )}
          </View>
        </ScrollView>
        <Button
          onPress={() => {
            if (player.current !== null) player.current.destroy();
            navigation.navigate('Training', {beat: beatSelected});
          }}
          style={styles.goButton}
          upperFont
          styleText={{fontSize: 22}}
          disabled={beatSelected === null}>
          {t('go')}
        </Button>
      </SafeAreaView>
      <Loading />
    </>
  );
}
