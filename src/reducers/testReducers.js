import {
  GET_TESTS_FAIL,
  GET_TESTS_REQUEST,
  GET_TESTS_SUCCESS,
} from '../constants/testConstants';

export const testsReducer = (state = { tests: null }, action) => {
  switch (action.type) {
    case GET_TESTS_REQUEST:
      return { loading: true, tests: [] };
    case GET_TESTS_SUCCESS:
      return { loading: false, tests: action.payload, success: true };
    case GET_TESTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
