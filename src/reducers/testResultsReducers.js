import {
  GET_TEST_RESULTS_OF_STUDENT_FAIL,
  GET_TEST_RESULTS_OF_STUDENT_REQUEST,
  GET_TEST_RESULTS_OF_STUDENT_SUCCESS,
  GET_TEST_RESULTS_OF_STUDENT_RESET,
  GET_TEST_RESULTS_OF_TEST_FAIL,
  GET_TEST_RESULTS_OF_TEST_REQUEST,
  GET_TEST_RESULTS_OF_TEST_SUCCESS,
  GET_TEST_RESULT_FAIL,
  GET_TEST_RESULT_REQUEST,
  GET_TEST_RESULT_SUCCESS,
  GET_TEST_RESULTS_OF_TEST_RESET,
  GET_TEST_RESULT_RESET,
} from '../constants/testResultsConstants';

export const getTestResultReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TEST_RESULT_REQUEST:
      return { loading: true };
    case GET_TEST_RESULT_SUCCESS:
      return { loading: false, testResult: action.payload, success: true };
    case GET_TEST_RESULT_FAIL:
      return { loading: false, error: action.payload };
    case GET_TEST_RESULT_RESET:
      return {};
    default:
      return state;
  }
};

export const getTestResultsOfStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TEST_RESULTS_OF_STUDENT_REQUEST:
      return { loading: true };
    case GET_TEST_RESULTS_OF_STUDENT_SUCCESS:
      return { loading: false, testResults: action.payload, success: true };
    case GET_TEST_RESULTS_OF_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_TEST_RESULTS_OF_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getTestResultsOfTestReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TEST_RESULTS_OF_TEST_REQUEST:
      return { loading: true };
    case GET_TEST_RESULTS_OF_TEST_SUCCESS:
      return { loading: false, testResults: action.payload, success: true };
    case GET_TEST_RESULTS_OF_TEST_FAIL:
      return { loading: false, error: action.payload };
    case GET_TEST_RESULTS_OF_TEST_RESET:
      return {};
    default:
      return state;
  }
};
