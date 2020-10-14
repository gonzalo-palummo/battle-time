import React, {useState, useEffect, useRef} from 'react';
import {View, Platform, ImageBackground} from 'react-native';
import {
  SafeAreaView,
  FloatingWords,
  Icon,
  Button,
  BattleTimer,
  Text,
  Vote,
} from '@components';
import {useTheme, BaseSetting} from '@config';
import * as Utils from '@utils';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import RtcEngine, {RtcLocalView, RtcRemoteView} from 'react-native-agora';
import KeepAwake from 'react-native-keep-awake';
import SocketIOClient from 'socket.io-client';
import {useSelector} from 'react-redux';
import {battleMapper} from './../../repositories/mappers/battlesMappers';

export default function VideoCall({navigation, route}) {
  const LocalView = RtcLocalView.SurfaceView;
  const RemoteView = RtcRemoteView.SurfaceView;

  const agoraRtcEngine = useRef();
  const timeoutGoBack = useRef();
  const userData = useSelector(state => state.auth);
  const socket = useRef();
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [appId, setAppId] = useState(BaseSetting.agoraAppId);
  const [peerIds, setPeerIds] = useState([]);
  const [showViews, setShowViews] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [currentFloatingWord, setCurrentFloatingWord] = useState(null);
  const [opponentTurn, setOpponentTurn] = useState(null);
  const [myTurn, setMyTurn] = useState(null);
  const [roundTime, setRoundTime] = useState(null);
  const [battleData, setBattleData] = useState(null);
  const [battleWords, setBattleWords] = useState(null);
  const [roundWords, setRoundWords] = useState(null);
  const [showVote, setShowVote] = useState(false);
  const [winnerId, setWinnerId] = useState(null);
  const [voteTime, setVoteTime] = useState(null);
  const battleType = route.params.data.battleType;
  const userRole = route.params.data.userRole;

  const handleVoted = userVoted => {
    socket.current.emit(
      'battleWinnerId',
      userData.id,
      battleData.id,
      userVoted,
      battleData.users[0].id === userVoted
        ? battleData.users[1].id
        : battleData.users[0].id,
    );
  };

  const handleFinishTime = () => {
    const numberRandom = Math.floor(Math.random() * 2) + 1 - 1;
    socket.current.emit(
      'battleWinnerId',
      userData.id,
      battleData.id,
      battleData.users[numberRandom].id,
      numberRandom === 0 ? battleData.users[1].id : battleData.users[0].id,
    );
  };

  useEffect(() => {
    const requestAndroidCameraAndAudioPermission = async () => {
      const permissionsEnabled = await Utils.requestAndroidCameraAndAudioPermission(
        t,
        navigation,
      );
      if (permissionsEnabled) {
        initConnection();
      }
    };
    async function initConnection() {
      socket.current = SocketIOClient(BaseSetting.serverUrl);

      switch (battleType) {
        case 'normal':
          socket.current.emit('joinBattleNormal', userData.token, userRole);
          break;
        case 'tournament':
          socket.current.emit(
            'joinBattleTournament',
            userData.token,
            route.params.data.tournament.id,
            //route.params.data.tournament.phases[0].id,
            1,
          );
          break;
      }
      setShowLoading(true);

      socket.current.on('startBattle', (battle, socketRoundTime, socketWords) => {
        console.log('startBattle event called');
        setBattleData(battleMapper(battle));
        setRoundTime(socketRoundTime);
        if (userRole === 'competitor') {
          setShowLoading(false);
          initCall(battle.id.toString());
        } else if (userRole === 'jury') {
          setTimeout(() => {
            setShowLoading(false);
            initCall(battle.id.toString());
          }, 2000);
        }

        setBattleWords(socketWords);
      });

      socket.current.on('juryNeeded', battleId => {
        if (userRole === 'jury') {
          socket.current.emit('juryAvailable', battleId, userData.token);
        }
      });

      socket.current.on('preStart', (userStart, audioStartBattle, audioApplause) => {
        if (userRole === 'competitor') {
          if (userStart === userData.id) {
            agoraRtcEngine.current.playEffect(
              1,
              audioStartBattle,
              0,
              1,
              0.0,
              100.0,
              true,
            );
            agoraRtcEngine.current.playEffect(2, audioApplause, 0, 1, 0.0, 100.0, true);
          } else {
            setOpponentTurn(true);
            agoraRtcEngine.current.muteLocalAudioStream(true);
          }
        }
      });

      socket.current.on('startUserRound', (data, audioStartRound, audioApplause) => {
        console.log('Start user round called', data);
        agoraRtcEngine.current.muteLocalAudioStream(false);
        agoraRtcEngine.current.startAudioMixing(data.beat, false, false, 1);
        agoraRtcEngine.current.playEffect(3, audioApplause, 0, 1, 0.0, 100.0, true);
        agoraRtcEngine.current.playEffect(4, audioStartRound, 0, 1, 0.0, 100.0, true);
        setOpponentTurn(false);
        setMyTurn(true);
      });

      socket.current.on('startRound', userStart => {
        let battleWordsCopy;
        let extractedWords;

        if (userRole === 'competitor' && userStart !== userData.id) {
          agoraRtcEngine.current.muteLocalAudioStream(true);
        }

        setBattleWords(oldBattleWords => {
          battleWordsCopy = JSON.parse(JSON.stringify(oldBattleWords));
          extractedWords = battleWordsCopy.splice(0, 6);
          return battleWordsCopy;
        });
        setRoundWords(extractedWords);
        setShowTimer(true);
      });

      socket.current.on('finishRound', () => {
        setShowTimer(false);
      });

      socket.current.on('finishUserRound', (audioApplause, audioFinishRound) => {
        agoraRtcEngine.current.playEffect(5, audioFinishRound, 0, 1, 0.0, 100.0, true);
        agoraRtcEngine.current.playEffect(6, audioApplause, 0, 1, 0.0, 100.0, true);
        agoraRtcEngine.current.stopAudioMixing();
        setOpponentTurn(true);
        setMyTurn(false);
        console.log('Finish user round called');
      });

      socket.current.on('messageToShow', data => {
        console.log('Message to show called: ', data);
        setCurrentFloatingWord(data);
      });

      socket.current.on('disconnect', () => {
        console.log('Disconnected');
      });

      socket.current.on('finishBattle', limitVoteTime => {
        setCurrentFloatingWord('La batalla ha terminado');
        if (userRole === 'jury') {
          setShowVote(true);
          setVoteTime(limitVoteTime);
        } else if (userRole === 'competitor') {
          setOpponentTurn(false);
          setMyTurn(false);
          agoraRtcEngine.current.muteLocalAudioStream(false);
          setCurrentFloatingWord(`El jurado tiene ${limitVoteTime} segundos para votar`);
        }
      });

      socket.current.on('winnerAnnouncement', winnerId => {
        setShowVote(true);
        setWinnerId(winnerId);
      });
    }

    if (Platform.OS === 'android') {
      requestAndroidCameraAndAudioPermission();
    } else {
      initConnection();
    }

    function handleUserJoined(data) {
      if (peerIds.indexOf(data) === -1) {
        setPeerIds(currentState => [...currentState, data]);
        console.log('peer joined: ', data);
      }
    }

    function handleUserOffline() {
      if (!showVote && timeoutGoBack.current === undefined) {
        timeoutGoBack.current = setTimeout(() => {
          navigation.goBack();
        }, 5000);
      }
    }

    function handleJoinSucceed() {
      setShowViews(true);
    }

    async function initCall(channelName) {
      agoraRtcEngine.current = await RtcEngine.create(appId);

      const events = {
        handleUserJoined,
        handleUserOffline,
        handleJoinSucceed,
      };
      Utils.agoraRtcEngine(
        agoraRtcEngine.current,
        channelName,
        events,
        null,
        false,
        userRole,
      );
    }

    return () => {
      if (agoraRtcEngine.current) {
        agoraRtcEngine.current.removeAllListeners();
        agoraRtcEngine.current.leaveChannel();
        agoraRtcEngine.current.destroy();
      }
      if (socket.current) socket.current.close();
      if (timeoutGoBack.current) clearTimeout(timeoutGoBack.current);
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <KeepAwake />
      {showViews && (
        <SafeAreaView style={{flex: 1}} forceInset={{top: 'always'}}>
          {showTimer && (
            <BattleTimer time={roundTime} words={roundWords} myTurn={myTurn} />
          )}
          <View style={{flex: 1}}>
            {peerIds.length > 0 ? (
              <View style={{flex: 1}}>
                {myTurn === true && (
                  <View style={styles.micMuted}>
                    <Icon name="microphone-slash" size={64} color={colors.primary} />
                  </View>
                )}
                <RemoteView style={{flex: 1}} uid={peerIds[0]} renderMode={1} />
              </View>
            ) : null}
            {userRole === 'competitor' && (
              <View style={{flex: 1}}>
                {opponentTurn === true && (
                  <View style={styles.micMuted}>
                    <Icon name="microphone-slash" size={64} color={colors.primary} />
                  </View>
                )}
                <LocalView style={{flex: 1}} zOrderMediaOverlay={true} renderMode={1} />
              </View>
            )}
            {userRole === 'jury' && peerIds.length > 1 ? (
              <View style={{flex: 1}}>
                <RemoteView style={{flex: 1}} uid={peerIds[1]} renderMode={1} />
              </View>
            ) : null}

            {currentFloatingWord && <FloatingWords bigText word={currentFloatingWord} />}
          </View>
        </SafeAreaView>
      )}

      {showLoading && (
        <>
          <FloatingWords
            loading
            word={
              battleType === 'tournament'
                ? t('waiting_for_the_opponent')
                : userRole === 'competitor'
                ? t('looking_for_a_opponent')
                : t('looking_for_a_battle')
            }
          />
          {battleType !== 'tournament' && (
            <View style={styles.cancelButton}>
              <Button onPress={() => navigation.goBack()}>{t('cancel')}</Button>
            </View>
          )}
        </>
      )}

      {showVote && (
        <Vote
          battle={battleData}
          handleVoted={handleVoted}
          winnerId={winnerId}
          navigateTo={screen => {
            navigation.navigate(screen);
          }}
          limitVoteTime={voteTime}
          onFinishTime={handleFinishTime}
        />
      )}
    </View>
  );
}
