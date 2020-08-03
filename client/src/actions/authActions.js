import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  GET_USER,
  GET_ALL_USERS
} from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  dispatch(setUserLoading());
  axios
    .post("/api/users/register", userData)
    .then(res => {
      dispatch(setUserLoading());
      history.push("/login")
    }) // re-direct to login on successful register
    .catch(err =>{
      dispatch(setUserLoading());
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }
    );
};

// Register User without redirecting
export const createUser = (userData) => dispatch => {
  dispatch(setUserLoading());
  axios
    .post("/api/users/register", userData)
    .then(res => {
      dispatch(setUserLoading());
    }) 
    .catch(err =>{
      dispatch(setUserLoading());
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  dispatch(setUserLoading());
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setUserLoading());
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch(setUserLoading());
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }
    );
};

// Get user 
export const getUser = acctNum => dispatch => {
  axios.get(`/api/users/${acctNum}`).then(res => {
    dispatch({
      type: GET_USER,
      payload: res.data
    })
  })
}

// Get all users
export const getAllUsers = () => dispatch => {
  axios.get(`/api/users`).then(res => {
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data
    })
  }).catch(err => {
    console.log(err);
  })
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Remove a user
export const deleteUser = (userEmail) => dispatch => {
  axios.delete(`api/users/user/${userEmail}`).then(res => {
    console.log(res.data);
  }).catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.message
    })
  })
}