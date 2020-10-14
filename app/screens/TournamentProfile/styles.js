import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 26,
    marginTop: 150,
  },
  topInfo: {
    flexDirection: 'row',
  },
  midInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  bottomInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shell: {
    width: 22 * (104 / 148),
    height: 22,
    marginRight: 10,
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  timerDigit: {
    borderRadius: 15,
    marginTop: 15,
  },
  timerLabel: {
    fontWeight: 'bold',
  },
});
