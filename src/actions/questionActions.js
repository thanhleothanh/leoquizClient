import {
  GET_QUESTIONS_FAIL,
  GET_QUESTIONS_REQUEST,
  GET_QUESTIONS_SUCCESS,
  POST_QUESTION_SUCCESS,
  POST_QUESTION_REQUEST,
  POST_QUESTION_FAIL,
} from '../constants/questionConstants';
import axios from 'axios';

export const getQuestions = (request) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_QUESTIONS_REQUEST });
    let page = 1,
      additionalType = '';

    if (request.preference === 'newest') {
      const { userSkipNewest } = getState();
      if (request.type === 'reaction') page = userSkipNewest.skipNewestReaction;
      else if (request.type === 'multiple')
        page = userSkipNewest.skipNewestMultiple;
      else page = userSkipNewest.skipNewestFillintheblank;
    }
    if (request.type === 'multiple') additionalType = '&type=fillintheblank';

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${`/api/questions/${request.preference}?type=${request.type}${additionalType}&page=${page}`}`,
      config
    );

    dispatch({ type: GET_QUESTIONS_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.response.message
      ? error.message
      : "There's a problem";

    dispatch({
      type: GET_QUESTIONS_FAIL,
      payload: errorMessage,
    });
  }
};

export const postQuestion = (newQuestion) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_QUESTION_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${`/api/questions`}`,
      newQuestion,
      config
    );

    dispatch({ type: POST_QUESTION_SUCCESS, payload: data, success: true });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.response.message
      ? error.message
      : "There's a problem";

    dispatch({
      type: POST_QUESTION_FAIL,
      payload: errorMessage,
    });
  }
};
