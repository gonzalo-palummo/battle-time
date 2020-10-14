import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    backgroundColor: 'black',
    borderRadius: 500,
  },
  modal: {
    position: 'absolute',
    bottom: 110,
    right: 10,
    left: 10,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    justifyContent: 'center',
    zIndex: 10,
  },
  gameType: {
    backgroundColor: 'black',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',

    // DELETE LATER
    marginRight: 15,
  },
  timesIcon: {
    width: 25,
    height: 25,
  },
  battleIcon: {
    width: 45,
    height: 45,
  },
});
