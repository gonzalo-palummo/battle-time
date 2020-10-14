import {StyleSheet, Dimensions} from 'react-native';
import * as Utils from '@utils';

export default StyleSheet.create({
  image: {
    height: Utils.scaleWithPixel(90),
    width: Utils.scaleWithPixel(120),
    borderRadius: 8,
  },
  tournamentItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 8,
    marginVertical: 5,
  },
  mainTournamentItem: {
    flex: 1,
    paddingHorizontal: 20,
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomMainItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  topItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  inputSearch: {
    backgroundColor: '#F3F4F6',
    paddingLeft: 10,
    borderBottomWidth: 0,
    borderRadius: 5,
  },
  shell: {
    width: 20,
    height: 20,
  },
});
