import * as actionTypes from './actionTypes';

const onLogin = userData => {
  return {
    type: actionTypes.LOGIN,
    userData,
  };
};

const onLogout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

const onSetFirebaseToken = firebaseToken => {
  return {
    type: actionTypes.SET_FIREBASE_TOKEN,
    firebaseToken,
  };
};

const onConfigProfile = () => {
  return {
    type: actionTypes.CONFIG_PROFILE,
  };
};

const onSetUserData = userData => {
  return {
    type: actionTypes.SET_USER_DATA,
    userData,
  };
};

// EXPORTS

export const login = userData => dispatch => {
  dispatch(onLogin(userData));
};

export const logout = () => dispatch => {
  dispatch(onLogout());
};

export const setFirebaseToken = firebaseToken => dispatch => {
  dispatch(onSetFirebaseToken(firebaseToken));
};

export const configProfile = () => dispatch => {
  dispatch(onConfigProfile());
};

export const setUserData = userData => dispatch => {
  dispatch(onSetUserData(userData));
};
