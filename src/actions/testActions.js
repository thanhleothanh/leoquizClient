import {
  GET_TESTS_FAIL,
  GET_TESTS_REQUEST,
  GET_TESTS_SUCCESS,
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

    const { data } = await axios.get(
      `https://leoquizapp.herokuapp.com/api/tests`,
      config
    );

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
