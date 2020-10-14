import React, {useState, useEffect, useRef} from 'react';
import {View, Alert, Platform} from 'react-native';
import {SafeAreaView, Text, FloatingWords} from '@components';
import {useTheme} from '@config';
import * as Utils from '@utils';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import RtcEngine, {RtcLocalView, RtcRemoteView} from 'react-native-agora';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SocketIOClient from 'socket.io-client/dist/socket.io.js';

export default function LiveStreamingVideoCall({navigation, route}) {
  const LocalView = RtcLocalView.SurfaceView;
  const RemoteView = RtcRemoteView.SurfaceView;
  const agoraRtcEngine = useRef();

  const {t} = useTranslation();
  const {colors} = useTheme();
  const appId = '6a27db57049a4fc0a7bb66d729975b39';
  const channelName = 'test5';
  const [hostsIds, setHostsIds] = useState([]);
  const [showViews, setShowViews] = useState(false);
  const [currentFloatingWord, setCurrentFloatingWord] = useState(' ');
  const [wordsList, setWordsList] = useState([
    'Amazonas',
    'Hipocresía',
    'Malaria',
    'Estrago',
    'Instituto',
    'Coraje',
  ]);
  const [battleInfo, setBattleInfo] = useState({
    beats: [
      'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Yung_Kartz/August_2019/Yung_Kartz_-_05_-_Picture_Perfect.mp3',
    ],
  });
  const endCall = () => {
    setShowViews(false);
    navigation.goBack();
  };

  useEffect(() => {
    /*const socket = SocketIOClient('http://3.128.39.215:8000');
    socket.on('newUser', data => {
      console.log(data);
    });*/

    const requestAndroidCameraAndAudioPermission = async () => {
      const permissionsEnabled = await Utils.requestAndroidCameraAndAudioPermission(
        t,
        navigation,
      );
      if (permissionsEnabled) {
        initCall();
      }
    };

    if (Platform.OS === 'android') {
      requestAndroidCameraAndAudioPermission();
    } else {
      initCall();
    }

    function handleJoinSucceed() {
      setShowViews(true);
    }

    function handleUserJoined(newHost) {
      console.log('handle Host Joined: ', newHost);

      setHostsIds(currentHosts => {
        return currentHosts.indexOf(newHost) === -1
          ? [...currentHosts, newHost]
          : currentHosts;
      });
    }

    function handleUserOffline(userOfflineUid) {
      setHostsIds(currentState => {
        return currentState.filter(currentUid => currentUid !== userOfflineUid);
      });
    }

    async function initCall() {
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
        route.params.clientRole,
        true,
      );
    }

    function initRound() {
      Utils.setTimeoutWithArray(setCurrentFloatingWord, 10000, wordsList);
    }

    async function initBattle() {
      await agoraRtcEngine.current.startAudioMixing(
        'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Yung_Kartz/August_2019/Yung_Kartz_-_05_-_Picture_Perfect.mp3',
        false,
        false,
        -1,
      );
      setBattleInfo(prevData => {
        return {...prevData, beats: prevData.beats.shift()};
      });
      await Utils.setTimeoutWithArray(setCurrentFloatingWord, 1000, [
        '3',
        '2',
        '1',
        'Battle!',
      ]);
      setTimeout(() => initRound(), 5000);
    }

    setCurrentFloatingWord(t('the_battle_starts_in_30_seconds'));
    setTimeout(() => initBattle(), 30000);

    return () => {
      if (agoraRtcEngine.current) {
        agoraRtcEngine.current.removeAllListeners();
        agoraRtcEngine.current.leaveChannel();
        agoraRtcEngine.current.destroy();
      }
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      {showViews && (
        <SafeAreaView style={{flex: 1}} forceInset={{top: 'always'}}>
          <View style={{flex: 1}}>
            {route.params.clientRole === 2 && (
              <>
                {hostsIds.length === 0 && (
                  <View>
                    <Text style={styles.streamingText} accentColor>
                      There is no host now
                    </Text>
                  </View>
                )}

                {hostsIds.length === 1 && (
                  <RemoteView style={{flex: 1}} uid={hostsIds[0]} renderMode={1} />
                )}

                {hostsIds.length === 2 && (
                  <View style={{flex: 1}}>
                    <RemoteView style={{flex: 1}} uid={hostsIds[0]} renderMode={1} />
                    <RemoteView style={{flex: 1}} uid={hostsIds[1]} renderMode={1} />
                  </View>
                )}
              </>
            )}

            {route.params.clientRole === 1 && ( //view for local video
              <>
                <Text style={styles.streamingText} accentColor>
                  Streaming
                </Text>
                <LocalView
                  style={[
                    styles.localVideoStyle,
                    {height: hostsIds.length > 0 ? '50%' : '100%'},
                  ]}
                  channelId={channelName}
                  zOrderMediaOverlay={true}
                  renderMode={1}
                />
                {hostsIds.length > 0 && (
                  <RemoteView style={{flex: 1}} uid={hostsIds[0]} renderMode={1} />
                )}
              </>
            )}

            <View style={styles.buttonBar}>
              <Icon.Button
                style={styles.iconStyle}
                size={28}
                backgroundColor={colors.primary}
                name="call-end"
                onPress={endCall}
              />
            </View>

            {currentFloatingWord !== '' && <FloatingWords word={currentFloatingWord} />}
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
