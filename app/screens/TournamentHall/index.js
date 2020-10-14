import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, ScrollView, ImageBackground, View} from 'react-native';
import {Images, BaseSetting, useTheme, BaseColor} from '@config';
import {useTranslation} from 'react-i18next';
import {Loading, Text, Button} from '@components';
import SocketIOClient from 'socket.io-client';
import {useSelector} from 'react-redux';
import styles from './styles';

export default function TournamentHall({navigation, route}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [opponentInfo, setOpponentInfo] = useState(null);
  const userData = useSelector(state => state.auth);
  const tournamentData = route.params.tournamentData;
  const socket = useRef();

  const goToBattle = () => {
    navigation.navigate('VideoCall', {
      data: {
        battleType: 'tournament',
        userRole: 'competitor',
        tournament: tournamentData,
      },
    });
  };

  useEffect(() => {
    socket.current = SocketIOClient(BaseSetting.serverUrl);
    socket.current.emit('joinTournamentHall', userData.token, tournamentData.id);
    socket.current.on('usersInfoUpdate', usersInfo => {
      if (usersInfo.users[0].id === userData.id) {
        setOpponentInfo(usersInfo.users[1]);
      } else {
        setOpponentInfo(usersInfo.users[0]);
      }
    });
    return () => {
      if (socket.current) socket.current.close();
    };
  }, []);

  return (
    <>
      <ImageBackground
        source={
          Images['rapper2']
          // {uri: tournamentData.image}
        }
        style={styles.backgroundImage}>
        <SafeAreaView>
          <ScrollView contentContainerStyle={{padding: 20}}>
            {opponentInfo && (
              <View style={styles.container}>
                <View style={styles.textsContainer}>
                  <Text body1 semibold>
                    {t('you_are_in_phase')}:
                  </Text>
                  <Text
                    style={[
                      styles.badge,
                      {borderColor: colors.primary, borderWidth: 1},
                    ]}>
                    {tournamentData.phases[0].name}
                  </Text>
                </View>
                <View style={styles.textsContainer}>
                  <Text body1 semibold>
                    {t('your_opponent_is')}:
                  </Text>
                  <Text
                    style={[
                      styles.badge,
                      {borderColor: colors.primary, borderWidth: 1},
                    ]}>
                    {opponentInfo.nickname}
                  </Text>
                </View>
                <View style={styles.textsContainer}>
                  <Text body1 semibold>
                    {t('battle_starts_at')}:
                  </Text>
                  <Text
                    style={[
                      styles.badge,
                      {borderColor: colors.primary, borderWidth: 1},
                    ]}>
                    {tournamentData.phases[0].time}
                  </Text>
                </View>
                <View style={styles.textsContainer}>
                  <Text body1 semibold>
                    {t('opponent_status')}:
                  </Text>
                  <Text
                    style={[
                      styles.badge,
                      {
                        backgroundColor: opponentInfo.tournament_user.live
                          ? BaseColor.greenColor
                          : BaseColor.opaqueRed,
                      },
                    ]}
                    whiteColor>
                    {opponentInfo.tournament_user.live
                      ? t('connected')
                      : t('disconnected')}
                  </Text>
                </View>
                <Button
                  upperFont
                  style={{marginTop: 25}}
                  styleText={{fontSize: 14}}
                  onPress={() => goToBattle()}
                  disabled={!opponentInfo.tournament_user.live}>
                  {t('go_to_the_battle')}
                </Button>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
      {!opponentInfo && <Loading alwaysLoading={true} />}
    </>
  );
}
