import {
  GET_TESTS_FAIL,
  GET_TESTS_REQUEST,
  GET_TESTS_SUCCESS,
  GET_ACTIVE_TESTS_FAIL,
  GET_ACTIVE_TESTS_REQUEST,
  GET_ACTIVE_TESTS_SUCCESS,
  POST_TEST_FAIL,
  POST_TEST_REQUEST,
  POST_TEST_SUCCESS,
  POST_TEST_RESULT_FAIL,
  POST_TEST_RESULT_REQUEST,
  POST_TEST_RESULT_SUCCESS,
  GET_TEST_FAIL,
  GET_TEST_REQUEST,
  GET_TEST_SUCCESS,
  GET_TEST_RESET,
  UPDATE_TEST_FAIL,
  UPDATE_TEST_REQUEST,
  UPDATE_TEST_SUCCESS,
  UPDATE_TEST_RESET,
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

export const activeTestsReducer = (state = { activeTests: null }, action) => {
  switch (action.type) {
    case GET_ACTIVE_TESTS_REQUEST:
      return { loading: true, activeTests: [] };
    case GET_ACTIVE_TESTS_SUCCESS:
      return { loading: false, activeTests: action.payload, success: true };
    case GET_ACTIVE_TESTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postTestReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_TEST_REQUEST:
      return { loading: true };
    case POST_TEST_SUCCESS:
      return { loading: false, test: action.payload, success: true };
    case POST_TEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getTestReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TEST_REQUEST:
      return { loading: true };
    case GET_TEST_SUCCESS:
      return { loading: false, test: action.payload, success: true };
    case GET_TEST_FAIL:
      return { loading: false, error: action.payload };
    case GET_TEST_RESET:
      return {};
    default:
      return state;
  }
};

export const updateTestReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TEST_REQUEST:
      return { loading: true };
    case UPDATE_TEST_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_TEST_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_TEST_RESET:
      return {};
    default:
      return state;
  }
};

export const postTestResultReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_TEST_RESULT_REQUEST:
      return { loading: true };
    case POST_TEST_RESULT_SUCCESS:
      return { loading: false, testResult: action.payload, success: true };
    case POST_TEST_RESULT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
