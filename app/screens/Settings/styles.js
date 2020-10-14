import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
  headerTitle: {
    backgroundColor: 'black',
    padding: 20,
    paddingTop: 0,
    marginBottom: 20,
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  item: {
    width: screenWidth * 0.35,
    height: screenWidth * 0.35,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  iconContainer: {
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
  },
});
