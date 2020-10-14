import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  image: {
    width: 120,
    height: 140,
    borderRadius: 8,
    marginRight: 6,
    overflow: 'hidden',
  },
  title: {
    marginBottom: 15,
  },
  imagesContainer: {},
  liveText: {
    paddingHorizontal: 8,
    margin: 6,
    borderRadius: 100,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  liveTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
});
