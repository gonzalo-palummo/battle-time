import {StyleSheet} from 'react-native';

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
  circle: {
    width: 70,
    height: 70,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'black',
  },
  centerText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordContainer: {
    position: 'absolute',
    top: -80,
    bottom: undefined,
    right: -100,
    left: -100,
  },
  word: {
    alignSelf: 'center',
    textTransform: 'capitalize',
    backgroundColor: '#00000099',
    borderRadius: 40,
    padding: 15,
    color: 'white',
  },
});
