import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  centerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 200,
  },
  centerImage: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textShadowColor: 'rgba(0,0,0, 1)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
  },
  micMuted: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 200,
  },
  cancelButton: {
    position: 'absolute',
    bottom: 30,
    right: 0,
    left: 0,
    alignItems: 'center',
    zIndex: 201,
  },
});
