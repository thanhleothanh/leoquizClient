import {
  GET_QUESTIONS_FAIL,
  GET_QUESTIONS_REQUEST,
  GET_QUESTIONS_SUCCESS,
  QUESTIONS_RESET,
  POST_QUESTION_FAIL,
  POST_QUESTION_REQUEST,
  POST_QUESTION_RESET,
  POST_QUESTION_SUCCESS,
} from '../constants/questionConstants';

export const questionsReducer = (state = { questions: null }, action) => {
  switch (action.type) {
    case GET_QUESTIONS_REQUEST:
      return { loading: true, questions: [] };
    case GET_QUESTIONS_SUCCESS:
      return { loading: false, questions: action.payload };
    case GET_QUESTIONS_FAIL:
      return { loading: false, error: action.payload };
    case QUESTIONS_RESET:
      return { questions: null };
    default:
      return state;
  }
};

export const postQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_QUESTION_REQUEST:
      return { loading: true };
    case POST_QUESTION_SUCCESS:
      return { loading: false, success: true, newQuestion: action.payload };
    case POST_QUESTION_FAIL:
      return { loading: false, error: action.payload };
    case POST_QUESTION_RESET:
      return {};
    default:
      return state;
  }
};
