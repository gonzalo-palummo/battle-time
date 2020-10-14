import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  voteImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: 'transparent',
  },
  winnerImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  users: {
    flexDirection: 'row',
  },
  modalVote: {
    alignItems: 'center',
    position: 'absolute',
    right: 5,
    left: 5,
    top: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 40,
  },
  modalBackground: {
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'black',
    zIndex: 300,
  },
  modalWinner: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: '70%',
    borderRadius: 10,
  },
  user: {
    marginHorizontal: 10,
    width: '30%',
  },
  vsContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vsText: {
    textTransform: 'uppercase',
    padding: 10,
    textAlign: 'center',
    borderRadius: 100,
  },
});
