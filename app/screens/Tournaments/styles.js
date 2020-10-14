import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  imageError: {
    width: windowWidth * 0.6,
    height: windowWidth * 0.6,
  },
});
