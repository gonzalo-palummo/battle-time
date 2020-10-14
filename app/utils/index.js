import {
  Platform,
  UIManager,
  LayoutAnimation,
  PixelRatio,
  Dimensions,
  I18nManager,
  Alert,
} from 'react-native';
import RNRestart from 'react-native-restart';
import messaging from '@react-native-firebase/messaging';
import {store} from 'app/store';
import {AuthActions} from '@actions';
import {PermissionsAndroid} from 'react-native';

const scaleValue = PixelRatio.get() / 2;

export const enableExperimental = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

export const scaleWithPixel = (size, limitScale = 1.2) => {
  /* setting default upto 20% when resolution device upto 20% with defalt iPhone 7 */
  const value = scaleValue > limitScale ? limitScale : scaleValue;
  return size * value;
};

export const heightHeader = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const landscape = width > height;

  if (Platform.OS === 'android') return 45;
  if (Platform.isPad) return 65;
  switch (height) {
    case 375:
    case 414:
    case 812:
    case 896:
      return landscape ? 45 : 88;
    default:
      return landscape ? 45 : 65;
  }
};

export const heightTabView = () => {
  const height = Dimensions.get('window').height;
  let size = height - heightHeader();
  switch (height) {
    case 375:
    case 414:
    case 812:
    case 896:
      size -= 30;
      break;
    default:
      break;
  }

  return size;
};

export const getWidthDevice = () => {
  return Dimensions.get('window').width;
};

export const getHeightDevice = () => {
  return Dimensions.get('window').height;
};

export const scrollEnabled = (contentWidth, contentHeight) => {
  return contentHeight > Dimensions.get('window').height - heightHeader();
};

export const languageFromCode = code => {
  switch (code) {
    case 'en':
      return 'English';
    case 'es':
      return 'Spanish';
    default:
      return 'Unknown';
  }
};

export const isLanguageRTL = code => {
  switch (code) {
    case 'ar':
    case 'he':
      return true;
    default:
      return false;
  }
};

export const reloadLocale = (oldLanguage, newLanguage) => {
  const oldStyle = isLanguageRTL(oldLanguage);
  const newStyle = isLanguageRTL(newLanguage);
  if (oldStyle != newStyle) {
    I18nManager.forceRTL(newStyle);
    RNRestart.Restart();
  }
};

export const formatDate = string => {
  var options = {
    month: 'numeric',
    day: 'numeric',
  };
  return new Date(string).toLocaleDateString([], options);
};

export const formatTime = string => {
  var options = {
    hour: 'numeric',
    minute: 'numeric',
  };
  return new Date(string).toLocaleDateString([], options);
};

export const validateEmail = email => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const getNotificationsPermission = async () => {
  let permissionRejected = false;
  const getToken = async () => {
    let fcmToken = store.getState().auth.firebaseToken;
    if (!fcmToken) {
      fcmToken = await messaging().getToken();

      if (fcmToken) {
        // user has a device token
        store.dispatch(AuthActions.setFirebaseToken(fcmToken));
      }
    }
  };

  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      // User has authorised
      getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
      permissionRejected = true;
    }
  };

  const enabled = await messaging().hasPermission();
  if (enabled) {
    getToken();
  } else {
    await requestPermission();
    if (permissionRejected) {
      Alert.alert(
        '',
        'Se necesita activar las notificaciones para notificarle cuando comience la batalla',
        [
          {
            text: 'Aceptar',
            onPress: () => {
              getNotificationsPermission();
            },
          },
        ],
      );
    }
  }
};

export const subscribeNotificationsInApp = messaging().onMessage(async message => {
  Alert.alert(message.notification.title, message.notification.body);
});

export const requestAndroidCameraAndAudioPermission = async (t, navigation) => {
  const showAlert = () => {
    Alert.alert('', t('needs_permission'), [
      {
        text: 'Aceptar',
        onPress: () => {
          navigation.goBack();
        },
      },
    ]);
  };
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    if (
      granted['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      return true;
    } else {
      showAlert();
    }
  } catch (err) {
    console.warn(err);
    showAlert();
  }
};

export const agoraRtcEngine = async (
  agoraRtcInstance,
  channelName,
  events,
  clientRole,
  live,
  userRole,
) => {
  if (live) agoraRtcInstance.setChannelProfile(1);
  if (clientRole) agoraRtcInstance.setClientRole(clientRole);
  agoraRtcInstance.setDefaultAudioRoutetoSpeakerphone(true);
  agoraRtcInstance.joinChannel(null, channelName, null, 0); // JOIN CHANNEL USING NULL TOKEN

  agoraRtcInstance.enableVideo();
  agoraRtcInstance.enableAudio();
  if (userRole === 'jury') {
    agoraRtcInstance.muteLocalVideoStream(true);
    agoraRtcInstance.muteLocalAudioStream(true);
  }
  //agoraRtcInstance.adjustPlaybackSignalVolume(100); // MUSIC AND VOICE VOLUME FROM ALL USERS. DEFAULT 100

  agoraRtcInstance.addListener('UserJoined', events.handleUserJoined);
  agoraRtcInstance.addListener('UserOffline', events.handleUserOffline);
  agoraRtcInstance.addListener('JoinChannelSuccess', events.handleJoinSucceed);

  return agoraRtcInstance;
};

export const setTimeoutWithArray = (method, time, array) => {
  return new Promise((resolve, reject) => {
    for (var x = 0; x <= array.length; x++) {
      if (array[x]) {
        setTimeout(y => method(array[y]), x * time, x);
      } else {
        setTimeout(() => {
          method('');
          resolve();
        }, x * time);
      }
    }
  });
};

export const searchEvent = (events, currentTime) => {
  let eventFound;
  events.some(event => {
    if (event.time === currentTime) {
      eventFound = event;
      return true;
    }
  });
  return eventFound;
};

export const checkAvailabilityToJoinInTournament = (tournament, userData) => {
  const checkLevel = () => {
    return (
      tournament.minLevel >= userData.points && tournament.maxLevel <= userData.points
    );
  };

  const checkShells = () => {
    return tournament.entryShells <= userData.shells;
  };

  const checkCapacity = () => {
    return tournament.users.length < 16;
  };

  return checkLevel() && checkShells() && checkCapacity();
};

export const getCategoryColor = points => {
  if (points < 50) {
    return '#FED801';
  } else if (points < 2000) {
    return '#F19F69';
  } else if (points < 10000) {
    return '#ED7D31';
  } else if (points < 250000) {
    return '#FF0000';
  } else if (points < 800000) {
    return '#D0CECE';
  } else if (points >= 800000) {
    return '#000';
  }
};
