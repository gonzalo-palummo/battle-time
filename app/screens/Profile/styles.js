import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  profileMain: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 26,
    marginTop: 200,
  },
  statistics: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 12,
    borderRadius: 5,
    backgroundColor: 'white',
    zIndex: 1000,
  },
  profileMainTop: {
    flexDirection: 'row',
  },
  profileMainTopRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  profileMainTopLeft: {
    flex: 1,
    marginBottom: 5,
  },

  levelName: {
    padding: 10,
    borderRadius: 100,
    marginTop: 10,
  },
  trophy: {
    marginVertical: 10,
    width: 95,
    height: 95,
  },
  trophies: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingTop: 15,
  },
});
