import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contain: {
    padding: 25,
  },

  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  profileImage: {
    width: '50%',
    maxWidth: 300,
    height: 100,
  },
  profileText: {
    padding: 20,
  },
  profileSelected: {
    borderWidth: 2,
    borderColor: 'white',
  },
});
