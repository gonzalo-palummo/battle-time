import {StyleSheet, Dimensions} from 'react-native';
import * as Utils from '@utils';

export default StyleSheet.create({
  avatar: {
    height: Utils.scaleWithPixel(50),
    width: Utils.scaleWithPixel(50),
    borderRadius: 50,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 8,
    marginVertical: 5,
  },
  mainUserItem: {
    textAlign: 'left',
    flex: 1,
    paddingHorizontal: 20,
  },
});
