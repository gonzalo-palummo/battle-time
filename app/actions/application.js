import * as actionTypes from './actionTypes';

const onChangeFont = font => {
  return {
    type: actionTypes.CHANGE_FONT,
    font,
  };
};

const onChangeLanguage = language => {
  return {
    type: actionTypes.CHANGE_LANGUAGE,
    language,
  };
};

const onDecrementLoading = () => {
  return {
    type: actionTypes.DECREMENT_LOADING,
  };
};

const onIncrementLoading = () => {
  return {
    type: actionTypes.INCREMENT_LOADING,
  };
};

const onResetLoading = () => {
  return {
    type: actionTypes.RESET_LOADING,
  };
};

// EXPORTS

export const changeFont = font => dispatch => {
  dispatch(onChangeFont(font));
};

export const changeLanguage = language => dispatch => {
  dispatch(onChangeLanguage(language));
};

export const decrementLoading = () => dispatch => {
  dispatch(onDecrementLoading());
};

export const incrementLoading = () => dispatch => {
  dispatch(onIncrementLoading());
};

export const resetLoading = () => dispatch => {
  dispatch(onResetLoading());
};
