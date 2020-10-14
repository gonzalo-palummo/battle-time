import React, {useState, useEffect} from 'react';
import {View, ScrollView, ImageBackground, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {BaseStyle, useTheme, Images} from '@config';
import {SafeAreaView, Text, Loading, Icon, Button, Header} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {formatDate, checkAvailabilityToJoinInTournament} from '@utils';
import CountDown from 'react-native-countdown-component';
import {RepositoryFactory} from '@repositories/RepositoryFactory';

const tournamentsRepository = RepositoryFactory.get('tournaments');

export default function TournamentProfile({navigation, route}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const [tournamentData, setTournamentData] = useState(route.params.data);
  const [secondsRemaining, setSecondsRemaining] = useState(null);

  const checkHasJoined = () => {
    return tournamentData.users.find(user => user.id === userData.id);
  };

  const checkIsInCurrentPhase = () => {
    //return tournamentData.phases[0].users.find(user => user.id === userData.id); TODO: UNCOMMENT
    return true;
  };

  const unjoinTournament = async tournamentId => {
    const tournamentUpdated = await tournamentsRepository.unjoin(tournamentId);
    //setTournamentData(tournamentUpdated); TODO: UNCOMMENT THIS
  };

  const joinTournament = async tournamentId => {
    const tournamentUpdated = await tournamentsRepository.join(tournamentId);
    //setTournamentData(tournamentUpdated); TODO: UNCOMMENT THIS
  };

  const calculateSecondsRemaining = () => {
    const currentDate = new Date().getTime();
    const tournamentDate = new Date(
      `${tournamentData.date} ${tournamentData.time}`,
    ).getTime();
    const milisecondsRemaining = tournamentDate - currentDate;
    return milisecondsRemaining / 1000;
  };

  useEffect(() => {
    setSecondsRemaining(calculateSecondsRemaining());
  }, []);

  return (
    <>
      <ImageBackground
        source={{uri: tournamentData.image}}
        style={styles.backgroundImage}>
        <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
          <Header
            title=""
            renderLeft={() => {
              return <Icon name="angle-left" size={28} />;
            }}
            onPressLeft={() => navigation.goBack()}
          />
          <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
            <View style={styles.container}>
              <View style={styles.topInfo}>
                <View style={{flex: 2, paddingRight: 10}}>
                  <Text title2 semibold style={{marginBottom: 15}}>
                    {tournamentData.name}
                  </Text>
                  <Text body2 semibold grayColor numberOfLines={4}>
                    {tournamentData.description}
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <Text caption2>Min: {tournamentData.minLevel}</Text>
                  <Text caption2>Max: {tournamentData.maxLevel}</Text>
                  <View style={styles.iconWithText}>
                    <Image source={Images.shell} style={styles.shell} />
                    <Text>{tournamentData.entryShells}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.midInfo}>
                <View>
                  <Text body1 semibold style={{marginBottom: 10}}>
                    {t('participants')}
                  </Text>

                  <View style={{flexDirection: 'row'}}>
                    {tournamentData.users.length > 1 ? (
                      <Text style={{marginRight: 10}}>
                        +{tournamentData.users.length - 1}
                      </Text>
                    ) : (
                      <Text style={{marginRight: 10}}>
                        {tournamentData.users.length}
                      </Text>
                    )}

                    <Icon color={colors.primary} name="user-friends" size={18} />
                  </View>
                </View>
                <View>
                  <Text body1 semibold style={{marginBottom: 10}}>
                    {t('date')}
                  </Text>
                  <Text body2>
                    {formatDate(tournamentData.date)} ({tournamentData.time} hs)
                  </Text>
                </View>
              </View>
              <View style={styles.bottomInfo}>
                <Icon
                  color={colors.primary}
                  name="fire"
                  size={26}
                  style={{marginRight: 10}}
                />
                <Text body1 grayColor semibold>
                  WIN {tournamentData.prize}
                </Text>
              </View>

              {secondsRemaining > 0 ? (
                <>
                  <Text grayColor body1 textAlign="center" style={{paddingTop: 25}}>
                    {t('tournament_time_remaining')}
                  </Text>
                  <CountDown
                    size={20}
                    until={secondsRemaining}
                    onFinish={() => alert('Finished')}
                    digitStyle={[{backgroundColor: colors.primary}, styles.timerDigit]}
                    timeLabelStyle={[
                      {
                        color: colors.primary,
                      },
                      styles.timerLabel,
                    ]}
                    timeToShow={['D', 'H', 'M', 'S']}
                    timeLabels={{d: 'D', h: 'H', m: 'M', s: 'S'}}
                  />

                  {checkHasJoined() ? (
                    <Button
                      upperFont
                      style={{marginTop: 25}}
                      outline
                      styleText={{fontSize: 14}}
                      onPress={() => {
                        unjoinTournament(tournamentData.id);
                      }}>
                      {t('leave')}
                    </Button>
                  ) : (
                    <Button
                      upperFont
                      style={{marginTop: 15}}
                      styleText={{fontSize: 14}}
                      onPress={() => {
                        joinTournament(tournamentData.id);
                      }}
                      disabled={
                        !checkAvailabilityToJoinInTournament(tournamentData, userData)
                      }>
                      {t('join_tournament')}
                    </Button>
                  )}
                </>
              ) : (
                checkIsInCurrentPhase() && (
                  <Button
                    upperFont
                    style={{marginTop: 25}}
                    styleText={{fontSize: 14}}
                    onPress={() => {
                      navigation.navigate('TournamentHall', {tournamentData});
                    }}>
                    {t('go_to_hall')}
                  </Button>
                )
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
      <Loading />
    </>
  );
}
