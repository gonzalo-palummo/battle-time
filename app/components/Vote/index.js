import React, {useState, useEffect} from 'react';
import {Text, Button, FadeInView} from '@components';
import {
  TouchableOpacity,
  Image,
  View,
  Alert,
  ImageBackground,
  Animated,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {useTheme, Images, BaseStyle} from '@config';
import PropTypes from 'prop-types';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

export default function Vote({
  battle,
  handleVoted,
  winnerId,
  navigateTo,
  limitVoteTime,
  onFinishTime,
}) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [userSelected, setUserSelected] = useState(null);

  const getWinner = () => {
    return battle.users.filter(user => user.id === winnerId)[0];
  };

  useEffect(() => {
    if (winnerId !== null) {
      setTimeout(() => {
        navigateTo('Home');
      }, 10000);
    }
  }, [winnerId]);

  return (
    <View style={styles.modalBackground}>
      {winnerId ? (
        <ImageBackground
          source={Images.backgroundBattleWinner}
          style={[BaseStyle.backgroundImage, {width: '100%', alignItems: 'center'}]}>
          <FadeInView style={styles.modalWinner} duration={2}>
            <Image style={styles.winnerImage} source={{uri: getWinner().avatar}} />
            <View style={{padding: 20}}>
              <Text title3 semibold>
                {t('the_winner_is')}
              </Text>
              <Text
                semibold
                primaryColor
                title3
                style={{textAlign: 'center', marginTop: 10}}>
                {getWinner().nickname}
              </Text>
            </View>
          </FadeInView>
        </ImageBackground>
      ) : (
        <FadeInView style={styles.modalVote} duration={1}>
          <Text title2 semibold style={{marginBottom: 30}}>
            {t('choose_winner')}
          </Text>
          <View style={styles.users}>
            <TouchableOpacity
              onPress={() => {
                setUserSelected(battle.users[0].id);
              }}
              style={styles.user}>
              <Image
                style={[
                  styles.voteImage,
                  userSelected === battle.users[0].id && {
                    borderColor: colors.primary,
                  },
                ]}
                source={{uri: battle.users[0].avatar}}
              />
              <Text semibold headline style={{textAlign: 'center', marginTop: 10}}>
                {battle.users[0].nickname}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setUserSelected(battle.users[1].id);
              }}
              style={styles.user}>
              <Image
                style={[
                  styles.voteImage,
                  userSelected === battle.users[1].id && {
                    borderColor: colors.primary,
                  },
                ]}
                source={{uri: battle.users[1].avatar}}
              />
              <Text semibold headline style={{textAlign: 'center', marginTop: 10}}>
                {battle.users[1].nickname}
              </Text>
            </TouchableOpacity>
            <View style={styles.vsContainer}>
              <Text
                style={[
                  styles.vsText,
                  {
                    backgroundColor: colors.primary,
                  },
                ]}
                bold
                title2>
                VS
              </Text>
            </View>
          </View>

          <Button
            style={{width: '50%', marginVertical: 30}}
            upperFont
            onPress={() =>
              userSelected
                ? handleVoted(userSelected)
                : Alert.alert('', t('select_an_user'))
            }>
            {t('vote')}
          </Button>

          {limitVoteTime && (
            <CountdownCircleTimer
              isPlaying
              size={80}
              strokeWidth={4}
              duration={limitVoteTime}
              onComplete={onFinishTime}
              colors={[['#F6B000', 0.4], ['#ED7D31', 0.4], ['#A30000', 0.2]]}>
              {({remainingTime, animatedColor}) => (
                <Animated.Text style={{color: animatedColor, fontSize: 22}}>
                  {remainingTime}
                </Animated.Text>
              )}
            </CountdownCircleTimer>
          )}
        </FadeInView>
      )}
    </View>
  );
}

Vote.propTypes = {
  battle: PropTypes.object.isRequired,
  handleVoted: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  onFinishTime: PropTypes.func.isRequired,
  limitVoteTime: PropTypes.func,
  winnerId: PropTypes.number,
};

Vote.defaultProps = {
  winnerId: null,
  limitVoteTime: null,
};
