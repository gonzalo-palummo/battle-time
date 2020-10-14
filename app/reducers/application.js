import * as actionTypes from '@actions/actionTypes';
const initialState = {
  font: null,
  language: null,
  loading: 0,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.CHANGE_FONT:
      return {
        ...state,
        font: action.font,
      };
    case actionTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };
    case actionTypes.INCREMENT_LOADING:
      return {
        ...state,
        loading: state.loading + 1,
      };
    case actionTypes.DECREMENT_LOADING:
      return {
        ...state,
        loading: state.loading - 1,
      };
    case actionTypes.RESET_LOADING:
      return {
        ...state,
        loading: 0,
      };
    default:
      return state;
  }
};
