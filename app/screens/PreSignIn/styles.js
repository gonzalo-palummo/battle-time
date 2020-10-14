import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  contain: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
  logoContainer: {
    marginTop: 80,
    marginBottom: 30,
    width: windowWidth * 0.4,
    height: windowWidth * (976 / 1000) * 0.4,
  },
  imageButton: {
    width: 50,
    height: 50,
  },
  containerImageButton: {
    width: 70,
    height: 70,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 70,
  },
  imageButtons: {
    flexDirection: 'row',
    marginVertical: 10,
  },
});
