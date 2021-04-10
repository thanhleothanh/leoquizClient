import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  questionsReducer,
  postQuestionReducer,
} from './reducers/questionReducers';
import { testsReducer } from './reducers/testReducers';
import {
  userLoginReducer,
  userSignupReducer,
  userUpdateScoreReducer,
  userUpdatePasswordReducer,
  userGetTestTakenReducer,
  userSkipNewestReducer,
  userUpdateStarReducer,
  userGameTicketsReducer,
  scoreboardReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  questions: questionsReducer,
  postQuestion: postQuestionReducer,
  tests: testsReducer,
  scoreboard: scoreboardReducer,
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userUpdateScore: userUpdateScoreReducer,
  userUpdateStar: userUpdateStarReducer,
  userUpdatePassword: userUpdatePasswordReducer,
  userGetTestTaken: userGetTestTakenReducer,
  userSkipNewest: userSkipNewestReducer,
  userGameTickets: userGameTicketsReducer,
});

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const gameTicketsFromLocalStorage = localStorage.getItem('gameTickets')
  ? JSON.parse(localStorage.getItem('gameTickets'))
  : 0;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
  userGameTickets: { gameTickets: gameTicketsFromLocalStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
