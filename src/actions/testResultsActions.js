import {
  GET_TEST_RESULT_SUCCESS,
  GET_TEST_RESULT_REQUEST,
  GET_TEST_RESULT_FAIL,
  GET_TEST_RESULTS_OF_TEST_SUCCESS,
  GET_TEST_RESULTS_OF_TEST_REQUEST,
  GET_TEST_RESULTS_OF_TEST_FAIL,
  GET_TEST_RESULTS_OF_STUDENT_SUCCESS,
  GET_TEST_RESULTS_OF_STUDENT_REQUEST,
  GET_TEST_RESULTS_OF_STUDENT_FAIL,
} from '../constants/testResultsConstants';
import axios from 'axios';

export const getTestResultsOfTest = (testID) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TEST_RESULTS_OF_TEST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/testResults/teacher/${testID}`,
      config
    );
    dispatch({ type: GET_TEST_RESULTS_OF_TEST_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.response.message
      ? error.message
      : "There's a problem";

    dispatch({
      type: GET_TEST_RESULTS_OF_TEST_FAIL,
      payload: errorMessage,
    });
  }
};

export const getTestResultsOfStudent = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TEST_RESULTS_OF_STUDENT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/testResults/student`, config);
    dispatch({ type: GET_TEST_RESULTS_OF_STUDENT_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.response.message
      ? error.message
      : "There's a problem";

    dispatch({
      type: GET_TEST_RESULTS_OF_STUDENT_FAIL,
      payload: errorMessage,
    });
  }
};

export const getTestResult = (testID) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TEST_RESULT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/testResults/${testID}`, config);
    dispatch({ type: GET_TEST_RESULT_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.response.message
      ? error.message
      : "There's a problem";

    dispatch({
      type: GET_TEST_RESULT_FAIL,
      payload: errorMessage,
    });
  }
};
