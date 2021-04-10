import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_RESET,
  USER_LOGOUT,
  USER_UPDATE_SCORE_FAIL,
  USER_UPDATE_SCORE_REQUEST,
  USER_UPDATE_SCORE_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,
  USER_UPDATE_STAR_SUCCESS,
  USER_UPDATE_STAR_REQUEST,
  USER_UPDATE_STAR_FAIL,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_GET_TESTTAKEN_SUCCESS,
  USER_GET_TESTTAKEN_FAIL,
  USER_GET_TESTTAKEN_REQUEST,
  GET_SCOREBOARD_FAIL,
  GET_SCOREBOARD_SUCCESS,
  GET_SCOREBOARD_REQUEST,
} from '../constants/userConstants';
import axios from 'axios';

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${`https://leoquizapp.herokuapp.com/api/users/login`}`,
      { username, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
    //
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.response.message
      ? error.message
      : "There's a problem";
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: errorMessage,
    });
  }
};

export const signup = (username, name, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SIGNUP_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${`https://leoquizapp.herokuapp.com/api/users/signup`}`,
      { username, name, password },
      config
    );

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_SIGNUP_RESET,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
    //
  } catch (error) {
    let errorMessage = error.response
      ? error.response.data.message
      : error.response.message
      ? error.message
      : "There's a problem";
    if (errorMessage === undefined)
      errorMessage =
        'It seems that you have created too many accounts! Or there might be some internal errors in the server! Please try again later!';
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: errorMessage,
    });
  }
};

export const logOut = () => async (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
  localStorage.removeItem('userInfo');
};

export const updateScore = (score) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_SCORE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.patch(
      `${`https://leoquizapp.herokuapp.com/api/users/${userInfo._id}`}`,
      score,
      config
    );

    dispatch({
      type: USER_UPDATE_SCORE_SUCCESS,
      payload: data,
    });

    //
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.response.message
      ? error.message
      : "There's a problem";
    dispatch({
      type: USER_UPDATE_SCORE_FAIL,
      payload: errorMessage,
    });
  }
};

export const updateStar = (star, studentId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_STAR_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.patch(
      `${`https://leoquizapp.herokuapp.com/api/users/students/${studentId}`}`,
      star,
      config
    );

    dispatch({
      type: USER_UPDATE_STAR_SUCCESS,
      payload: data,
    });

    //
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.response.message
      ? error.message
      : "There's a problem";
    dispatch({
      type: USER_UPDATE_STAR_FAIL,
      payload: errorMessage,
    });
  }
};

export const updatePassword = (password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PASSWORD_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.patch(
      `${`https://leoquizapp.herokuapp.com/api/users/${userInfo._id}/changePassword`}`,
      password,
      config
    );

    dispatch({
      type: USER_UPDATE_PASSWORD_SUCCESS,
      payload: data,
    });

    //
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.response.message
      ? error.message
      : "There's a problem";
    dispatch({
      type: USER_UPDATE_PASSWORD_FAIL,
      payload: errorMessage,
    });
  }
};

export const getScoreboard = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_SCOREBOARD_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `${`https://leoquizapp.herokuapp.com/api/users`}`,
      config
    );

    dispatch({
      type: GET_SCOREBOARD_SUCCESS,
      payload: data,
    });

    //
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.response.message
      ? error.message
      : "There's a problem";
    dispatch({
      type: GET_SCOREBOARD_FAIL,
      payload: errorMessage,
    });
  }
};

export const getTestTaken = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_GET_TESTTAKEN_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `${`https://leoquizapp.herokuapp.com/api/users/${userInfo._id}`}`,
      config
    );

    dispatch({
      type: USER_GET_TESTTAKEN_SUCCESS,
      payload: data,
    });

    //
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.response.message
      ? error.message
      : "There's a problem";
    dispatch({
      type: USER_GET_TESTTAKEN_FAIL,
      payload: errorMessage,
    });
  }
};
