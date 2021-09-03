import {
  GET_TESTS_FAIL,
  GET_TESTS_REQUEST,
  GET_TESTS_SUCCESS,
  GET_ACTIVE_TESTS_FAIL,
  GET_ACTIVE_TESTS_REQUEST,
  GET_ACTIVE_TESTS_SUCCESS,
  POST_TEST_SUCCESS,
  POST_TEST_REQUEST,
  POST_TEST_FAIL,
  POST_TEST_RESULT_SUCCESS,
  POST_TEST_RESULT_REQUEST,
  POST_TEST_RESULT_FAIL,
  GET_TEST_SUCCESS,
  GET_TEST_REQUEST,
  GET_TEST_FAIL,
  UPDATE_TEST_SUCCESS,
  UPDATE_TEST_REQUEST,
  UPDATE_TEST_FAIL,
} from '../constants/testConstants';
import axios from 'axios';
import { API_URL } from '../utils/config';

export const getTests = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TESTS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API_URL}/api/tests/teacher`, config);
    dispatch({ type: GET_TESTS_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.response.message
      ? error.message
      : "There's a problem";

    dispatch({
      type: GET_TESTS_FAIL,
      payload: errorMessage,
    });
  }
};

export const getActiveTests = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ACTIVE_TESTS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API_URL}/api/tests/`, config);
    dispatch({ type: GET_ACTIVE_TESTS_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.response.message
      ? error.message
      : "There's a problem";

    dispatch({
      type: GET_ACTIVE_TESTS_FAIL,
      payload: errorMessage,
    });
  }
};

export const postTest = (newTest) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_TEST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `${API_URL}/api/tests/teacher`,
      newTest,
      config
    );

    dispatch({ type: POST_TEST_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.response.message
      ? error.message
      : "There's a problem";

    dispatch({
      type: POST_TEST_FAIL,
      payload: errorMessage,
    });
  }
};

export const getTest = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TEST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${API_URL}/api/tests/${id}`, config);

    dispatch({ type: GET_TEST_SUCCESS, payload: data });
  } catch (error) {
    console.log('object');
    const errorMessage = error.response
      ? error.response.data.message
      : error.response.message
      ? error.message
      : "There's a problem";

    dispatch({
      type: GET_TEST_FAIL,
      payload: errorMessage,
    });
  }
};

export const updateTest =
  (id, questions, active) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_TEST_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.patch(
        `${API_URL}/api/tests/${id}`,
        { questions, active },
        config
      );

      dispatch({ type: UPDATE_TEST_SUCCESS, payload: data });
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.response.message
        ? error.message
        : "There's a problem";

      dispatch({
        type: UPDATE_TEST_FAIL,
        payload: errorMessage,
      });
    }
  };

export const postTestResult = (newTestResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_TEST_RESULT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `${API_URL}/api/testResults`,
      newTestResult,
      config
    );

    dispatch({ type: POST_TEST_RESULT_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.response.message
      ? error.message
      : "There's a problem";

    dispatch({
      type: POST_TEST_RESULT_FAIL,
      payload: errorMessage,
    });
  }
};
