import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  buttonBar: {
    height: 60,
    display: 'flex',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  localVideoStyle: {
    width: '100%',
  },
  iconStyle: {
    borderRadius: 0,
    padding: 10,
    paddingLeft: 18,
  },
  streamingText: {
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
});
