import * as actionTypes from '@actions/actionTypes';

const userDataObject = {
  id: null,
  name: null,
  lastName: null,
  nickname: null,
  email: null,
  avatar: null,
  points: null,
  biography: null,
  country: {
    name: null,
  },
  level: {
    name: null,
  },
  profile: {
    id: null,
    name: null,
  },
  googleId: null,
  facebookId: null,
  battleViews: null,
  won: null,
  losses: null,
  trophies: [],
  shells: null,
  tournamentUser: {
    position: null,
  },
};

const initialState = {
  isLoggedIn: false,
  token: null,
  id: null,
  profileConfigured: false,
  firebaseToken: null,
  userData: userDataObject,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        token: action.userData.token,
        id: action.userData.id,
        profileConfigured: action.userData.profileConfigured,
      };
    case actionTypes.CONFIG_PROFILE:
      return {
        ...state,
        profileConfigured: true,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        id: null,
        profileConfigured: false,
        userData: userDataObject,
      };
    case actionTypes.SET_USER_DATA:
      return {
        ...state,
        userData: action.userData,
      };
    case actionTypes.SET_FIREBASE_TOKEN:
      return {
        ...state,
        firebaseToken: action.firebaseToken,
      };
    default:
      return state;
  }
};
