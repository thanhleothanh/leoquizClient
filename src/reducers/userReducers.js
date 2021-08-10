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
  USER_UPDATE_SCORE_RESET,
  USER_UPDATE_SCORE_SUCCESS,
  USER_UPDATE_STAR_FAIL,
  USER_UPDATE_STAR_REQUEST,
  USER_UPDATE_STAR_SUCCESS,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_FAIL,
  GET_SCOREBOARD_FAIL,
  GET_SCOREBOARD_REQUEST,
  GET_SCOREBOARD_RESET,
  GET_SCOREBOARD_SUCCESS,
  GET_STUDENTS_FAIL,
  GET_STUDENTS_REQUEST,
  GET_STUDENTS_RESET,
  GET_STUDENTS_SUCCESS,
  USER_SKIP_NEWEST,
  USER_GAME_TICKETS_ADD,
  USER_GAME_TICKETS_MINUS,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return { loading: false, userSignup: action.payload };
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNUP_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateScoreReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_SCORE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SCORE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_SCORE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_SCORE_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateStarReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_STAR_REQUEST:
      return { loading: true };
    case USER_UPDATE_STAR_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_STAR_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_SCORE_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdatePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PASSWORD_REQUEST:
      return { loading: true };
    case USER_UPDATE_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userSkipNewestReducer = (
  state = {
    skipNewestReaction: 1,
    skipNewestMultiple: 1,
    skipNewestFillintheblank: 1,
  },
  action
) => {
  switch (action.type) {
    case USER_SKIP_NEWEST:
      if (action.payload === 'reaction') state.skipNewestReaction++;
      else if (action.payload === 'multiple') state.skipNewestMultiple++;
      else state.skipNewestFillintheblank++;
      return { ...state };
    default:
      return state;
  }
};

export const userGameTicketsReducer = (state = { gameTickets: 0 }, action) => {
  switch (action.type) {
    case USER_GAME_TICKETS_ADD:
      state.gameTickets++;
      localStorage.setItem('gameTickets', state.gameTickets);
      return { ...state };
    case USER_GAME_TICKETS_MINUS:
      state.gameTickets =
        state.gameTickets - 1 <= 0 ? 0 : state.gameTickets - 1;
      localStorage.setItem('gameTickets', state.gameTickets);
      return { ...state };
    default:
      return state;
  }
};

export const scoreboardReducer = (state = { scoreboard: null }, action) => {
  switch (action.type) {
    case GET_SCOREBOARD_REQUEST:
      return { loading: true };
    case GET_SCOREBOARD_SUCCESS:
      return { loading: false, scoreboard: action.payload, success: true };
    case GET_SCOREBOARD_FAIL:
      return { loading: false, error: action.payload };
    case GET_SCOREBOARD_RESET:
      return { scoreboard: null };
    default:
      return state;
  }
};

export const getStudentsReducer = (state = { students: null }, action) => {
  switch (action.type) {
    case GET_STUDENTS_REQUEST:
      return { loading: true };
    case GET_STUDENTS_SUCCESS:
      return { loading: false, students: action.payload, success: true };
    case GET_STUDENTS_FAIL:
      return { loading: false, error: action.payload };
    case GET_STUDENTS_RESET:
      return { students: null };
    default:
      return state;
  }
};
