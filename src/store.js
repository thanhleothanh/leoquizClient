import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
import {
  questionsReducer,
  postQuestionReducer,
} from './reducers/questionReducers';
import {
  testsReducer,
  postTestReducer,
  getTestReducer,
  updateTestReducer,
  activeTestsReducer,
  postTestResultReducer,
} from './reducers/testReducers';
import {
  getTestResultReducer,
  getTestResultsOfStudentReducer,
  getTestResultsOfTestReducer,
} from './reducers/testResultsReducers';
import {
  userLoginReducer,
  userSignupReducer,
  userUpdateScoreReducer,
  userUpdatePasswordReducer,
  userSkipNewestReducer,
  userUpdateStarReducer,
  userGameTicketsReducer,
  scoreboardReducer,
  getStudentsReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  questions: questionsReducer,
  postQuestion: postQuestionReducer,
  //
  tests: testsReducer,
  activeTests: activeTestsReducer,
  postTest: postTestReducer,
  getTest: getTestReducer,
  updateTest: updateTestReducer,
  postTestResult: postTestResultReducer,
  //
  getTestResultsOfTest: getTestResultsOfTestReducer,
  getTestResultsOfStudent: getTestResultsOfStudentReducer,
  getTestResult: getTestResultReducer,
  //
  getStudents: getStudentsReducer,
  scoreboard: scoreboardReducer,
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userUpdateScore: userUpdateScoreReducer,
  userUpdateStar: userUpdateStarReducer,
  userUpdatePassword: userUpdatePasswordReducer,
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
  applyMiddleware(...middleware)
);

export default store;
