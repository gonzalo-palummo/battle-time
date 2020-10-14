import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  modal: {
    position: 'absolute',
    right: 30,
    left: 30,
    top: 50,
    bottom: 50,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  modalBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'grey',
  },
  image: {
    width: 200,
    height: 200,
  },
});
