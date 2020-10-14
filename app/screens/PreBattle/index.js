import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Images, useTheme} from '@config';
import {Text, Button} from '@components';
import {useSelector} from 'react-redux';
import styles from './styles';

export default function PreBattle({navigation, route}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const userData = useSelector(state => state.auth.userData);

  const checkShells = async () => {
    if (userData.shells > 0) {
      navigation.navigate('VideoCall', {
        data: {battleType: 'normal', userRole: 'competitor'},
      });
    } else {
      navigation.navigate('ModalInfo', {
        image: Images.shell,
        message: '¡Ups! Te quedaste sin cascarones',
        buttonTop: {text: 'Ir al shop', web: 'https://google.com'},
        buttonBottom: {text: 'No, gracias', screen: 'Home'},
      });
    }
  };

  const joinAsJury = () => {
    navigation.navigate('VideoCall', {
      data: {battleType: 'normal', userRole: 'jury'},
    });
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.buttonsContainer}>
          <Text semibold title2 style={{marginBottom: 30}}>
            {t('join_as')}:
          </Text>
          <Button
            upperFont
            style={styles.button}
            onPress={() => {
              checkShells();
            }}>
            {t('competitor')}
          </Button>
          <Button
            upperFont
            style={styles.button}
            onPress={() => {
              joinAsJury();
            }}>
            {t('jury')}
          </Button>
          <Text
            subhead
            style={{paddingHorizontal: 40, marginTop: 40}}
            textAlign="center">
            {t('if_you_abandon_the_battle_you_will_be_punished')}.
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
}
