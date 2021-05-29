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
  GET_TEST_SUCCESS,
  GET_TEST_REQUEST,
  GET_TEST_FAIL,
  UPDATE_TEST_SUCCESS,
  UPDATE_TEST_REQUEST,
  UPDATE_TEST_FAIL,
} from '../constants/testConstants';
import axios from 'axios';

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

    const { data } = await axios.get(`/api/tests/teacher`, config);
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

    const { data } = await axios.get(`/api/tests/`, config);
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
    const { data } = await axios.post(`/api/tests/teacher`, newTest, config);

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
    const { data } = await axios.get(`/api/tests/${id}`, config);

    dispatch({ type: GET_TEST_SUCCESS, payload: data });
  } catch (error) {
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
        `/api/tests/${id}`,
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
