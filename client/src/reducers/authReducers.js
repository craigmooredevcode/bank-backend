import {
    SET_CURRENT_USER,
    GET_USER,
    USER_LOADING
  } from "../actions/types";

  const isEmpty = require("is-empty");

  const initialState = {
    isAuthenticated: false,
    user: {},
    destinationUser: {},
    loading: false
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload
        };
      case GET_USER:
        return {
          ...state,
          destinationUser: action.payload
        }
      case USER_LOADING:
        return {
          ...state,
          loading: !state.loading
        };
      default:
        return state;
    }
}