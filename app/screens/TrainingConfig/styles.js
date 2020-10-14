import {StyleSheet, Dimensions} from 'react-native';
export default StyleSheet.create({
  headerTitle: {
    backgroundColor: 'black',
    padding: 20,
    paddingTop: 0,
    marginBottom: 20,
  },
  beat: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#EEE',
    borderRadius: 10,
  },
  beatSelected: {
    borderWidth: 1,
  },
  goButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    paddingHorizontal: 30,
  },
});
