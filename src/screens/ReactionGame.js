import React, { useState, useEffect, useRef } from 'react';
import { useTransition, animated } from 'react-spring';
import { getQuestions } from './../actions/questionActions';
import { useDispatch, useSelector } from 'react-redux';
import EndGame from './../components/EndGame';
import CountdownTimer from './../components/CountdownTimer';
import Loader from './../components/Loader';
import Alert from './../components/Alert';
import Meta from './../components/Meta';
import { useLocation } from 'react-router-dom';
import { getTest } from '../actions/testActions';
import { getTestResult } from '../actions/testResultsActions';

//shuffle questions fisher-yates
const shuffle = (array) => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};
//REMOVE STATE OF THE PREVIOUS QUESTION
const remove = () => {
  const allItems = document.querySelectorAll('.items');
  Array.from(allItems).forEach((e) => {
    e.classList.remove('show');
    e.classList.remove('wrong');
    e.classList.remove('correct-chosen');
  });
  const allAnswers = document.querySelectorAll('.answers');
  Array.from(allAnswers).forEach((e) => {
    e.innerHTML = '';
  });
};

const ReactionGame = ({ history }) => {
  //game related
  //state
  const [playing, setPlaying] = useState(false);
  const [end, setEnd] = useState(false);
  const [next, setNext] = useState(true); //next question
  const [timerRun, setTimerRun] = useState(0);
  //no rerendering
  const playPressed = useRef(false);
  const endState = useRef('Congratulations!');
  const preference = useRef('random');
  const shuffled = useRef(false); //shuffle question array at the beginning, once
  const timerLeft = useRef(null); //points to the current timer
  const question = useRef(0); // index of the current question
  const maxQuestion = useRef(0); // index of the current question
  const answered = useRef(false);
  const answer1 = useRef(0); // correct answer
  const answer2 = useRef(0); // incorrect answer
  const score = useRef(0); // current score

  //redux stuffs
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector((state) => state.questions);
  const { userInfo } = useSelector((state) => state.userLogin);

  //for the test
  const {
    test,
    loading: testLoading,
    error: testError,
  } = useSelector((state) => state.getTest);
  const {
    testResult,
    loading: loadingGetTestResult,
    error: errorGetTestResult,
  } = useSelector((state) => state.getTestResult);
  const location = useLocation();
  const testID = location.pathname
    ? location.pathname.split('/test/')[1]
    : undefined;

  //ANIMATION
  const transition = useTransition(playing, {
    from: { opacity: 0, x: -200 },
    enter: { opacity: 1, x: 0 },
  });

  useEffect(() => {
    if (testID !== undefined) dispatch(getTestResult(testID));
    if (!userInfo) history.push('/login');
  }, [userInfo, history]);

  useEffect(() => {
    if (playing && !loading && !end && !error) {
      //if pressed PLAY button

      if (!shuffled.current) {
        if (testID === undefined) {
          //for quiz
          shuffle(questions);
          maxQuestion.current = questions.length;
        } else if (test && test.questions) {
          //for test
          shuffle(test.questions);
          maxQuestion.current = test.questions.length;
        }
        shuffled.current = true;
      }

      //check if reached the end of the questions
      if (
        testID === undefined &&
        question.current === questions.length &&
        !loading
      ) {
        setEnd(true);
      } else if (
        testID &&
        test &&
        question.current === test.questions.length &&
        !loading
      ) {
        setEnd(true);
      }
      //else next questions
      else {
        remove(); //REMOVE STATE OF THE PREVIOUS QUESTION
        let ans1, ans2;
        ans1 = Math.floor(Math.random() * 9) + 1;
        ans2 = Math.floor(Math.random() * 9) + 1;
        if (ans1 === ans2)
          ans2 = ans1 === 9 ? (ans2 -= 1) : ans1 === 1 ? (ans2 += 1) : ans1++;
        answer1.current = ans1;
        answer2.current = ans2;

        if (questions || (test && test.questions)) {
          //cái này là để tránh lúc mà có alert error, không có item-ans1 trên màn hình mà vẫn cố mount
          document.getElementById(`item-${ans1}`).classList.add('show');
          document.getElementById(`item-${ans2}`).classList.add('show');
          document.getElementById(`item-ans-${ans1}`).innerHTML =
            testID === undefined
              ? questions[question.current].correct_answer
              : test.questions[question.current].correct_answer;
          document.getElementById(`item-ans-${ans2}`).innerHTML =
            testID === undefined
              ? questions[question.current].incorrect_answers[0]
                  .incorrect_answer
              : test.questions[question.current].incorrect_answers[0]
                  .incorrect_answer;

          // timer;
          const idTimeout = setTimeout(() => {
            endState.current = 'Game Over!';
            setEnd(true);
          }, 15000);
          timerLeft.current = idTimeout;
          setTimerRun(15);
          // THIS ONE TRICKS THE RERENDER OF QUESTION, TIMER, QUESTION/QUESTIONS, POINTS
          // !IMPORTANT
        }
      }
    }
  }, [next, playing, loading, end, error, questions]);

  //clear on unmount ngon ngon ngon
  useEffect(() => {
    return () => {
      clearTimeout(timerLeft.current);
    };
  }, []);

  //handlers
  //handlers
  //handlers
  const playHandler = () => {
    if (!playPressed.current) {
      playPressed.current = true;

      if (testID === undefined)
        dispatch(
          getQuestions({ type: 'reaction', preference: preference.current })
        );
      else dispatch(getTest(testID));

      document.querySelector('.playButton').classList.add('playButtonPressed');
      setTimeout(() => {
        setPlaying(true);
      }, 1500);
    }
  };

  const clickHandler = (id) => {
    if (id === answer1.current) {
      clearTimeout(timerLeft.current);
      document
        .getElementById(`item-${answer1.current}`)
        .classList.remove('show');
      document
        .getElementById(`item-${answer2.current}`)
        .classList.remove('show');
      document.getElementById(`item-${id}`).classList.add('correct-chosen');
      document.getElementById(`item-${answer2.current}`).classList.add('wrong');
      answered.current = 'Very cool!';
      setTimerRun(0);
      setTimeout(() => {
        question.current = question.current + 1;
        score.current += 2;
        setNext(!next);
      }, 2500);
    } else if (id === answer2.current) {
      clearTimeout(timerLeft.current);
      document
        .getElementById(`item-${answer1.current}`)
        .classList.remove('show');
      document
        .getElementById(`item-${answer2.current}`)
        .classList.remove('show');
      document.getElementById(`item-${id}`).classList.add('wrong');
      document
        .getElementById(`item-${answer1.current}`)
        .classList.add('correct-chosen');
      answered.current = 'Try again!';
      setTimerRun(0);
      setTimeout(() => {
        score.current = score.current - 1 <= 0 ? 0 : score.current - 1;
        setNext(!next);
      }, 2500);
    }
  };

  return (
    <div className='h-auto min-h-screen'>
      <Meta
        title='Reaction Game'
        description='Leo English Quiz App for Kids | Reaction Game'
      />
      {loadingGetTestResult ? (
        <></>
      ) : errorGetTestResult ? (
        <Alert>{errorGetTestResult}</Alert>
      ) : !playing ? (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
          {testID === undefined || (testResult && testResult.length === 0) ? (
            <button
              className='playButton bg-purple-600 hover:bg-purple-700'
              onClick={playHandler}
            >
              {testID === undefined ? 'Play' : 'Go'}
              <i className='ml-3 fas fa-play' />
            </button>
          ) : (
            <>
              <button className='playButton bg-purple-600 opacity-50' disabled>
                {testID === undefined ? 'Play' : 'Go'}
                <i className='ml-3 fas fa-play' />
              </button>
              <div className='preferences text-purple-800 dark:text-purple-50 mt-5'>
                You already finished this test!
              </div>
            </>
          )}
          {testID === undefined && (
            <div className='mt-5 flex flex-col'>
              <label className='preferences text-purple-800 dark:text-purple-50'>
                <input
                  type='radio'
                  className='form-radio w-4 h-4 md:w-7 md:h-7'
                  name='preference'
                  value='random'
                  onChange={(e) => (preference.current = e.target.value)}
                />
                <span className='ml-2'>Random Questions</span>
              </label>
              <label className='preferences text-purple-800 dark:text-purple-50 mt-2'>
                <input
                  type='radio'
                  className='form-radio w-4 h-4 md:w-7 md:h-7'
                  name='preference'
                  value='newest'
                  onChange={(e) => (preference.current = e.target.value)}
                />
                <span className='ml-2'>New Questions</span>
              </label>
            </div>
          )}
        </div>
      ) : end ? (
        <EndGame
          title={endState.current}
          score={score.current}
          color='purple'
          history={history}
          preference={preference.current}
          type='reaction'
          testID={testID}
        />
      ) : loading || testLoading ? (
        <div className='h-screen'>
          <Loader
            loader={Math.floor(Math.random() * 10) + 1}
            color={Math.floor(Math.random() * 10) + 1}
          />
        </div>
      ) : error || testError ? (
        <Alert>{error || testError}</Alert>
      ) : (
        <div>
          {transition((style) => (
            <animated.div style={style} className='container mx-auto mt-4'>
              <div className='flex justify-center items-center '>
                <div
                  className='text-center bg-backGroundColorLight dark:bg-backGroundColorDark text-xl lg:text-2xl italic font-sans font-bold text-purple-900 dark:text-purple-50 shadow-md rounded-lg py-2 px-3'
                  id='question'
                >
                  {testID === undefined
                    ? question.current < maxQuestion.current &&
                      maxQuestion.current !== 0 &&
                      questions[question.current] &&
                      questions[question.current].question
                    : question.current < maxQuestion.current &&
                      maxQuestion.current !== 0 &&
                      test.questions[question.current] &&
                      test.questions[question.current].question}
                </div>
              </div>

              <div className='mt-4 mx-1 flex items-center bg-backGroundColorLight dark:bg-backGroundColorDark'>
                <div className='flex-1 max-w-2xl mx-auto'>
                  <ul className='grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2 question-answer-container'>
                    <li
                      className='answerTiles items'
                      id='item-1'
                      onClick={() => clickHandler(1)}
                    >
                      <div id='item-ans-1' className='answers'></div>
                    </li>
                    <li
                      className='answerTiles items'
                      id='item-2'
                      onClick={() => clickHandler(2)}
                    >
                      <div id='item-ans-2' className='answers'></div>
                    </li>
                    <li
                      className='answerTiles items'
                      id='item-3'
                      onClick={() => clickHandler(3)}
                    >
                      <div id='item-ans-3' className='answers'></div>
                    </li>
                    <li
                      className='answerTiles items'
                      id='item-4'
                      onClick={() => clickHandler(4)}
                    >
                      <div id='item-ans-4' className='answers'></div>
                    </li>
                    <li
                      className='answerTiles items'
                      id='item-5'
                      onClick={() => clickHandler(5)}
                    >
                      <div id='item-ans-5' className='answers'></div>
                    </li>
                    <li
                      className='answerTiles items'
                      id='item-6'
                      onClick={() => clickHandler(6)}
                    >
                      <div id='item-ans-6' className='answers'></div>
                    </li>
                    <li
                      className='answerTiles items'
                      id='item-7'
                      onClick={() => clickHandler(7)}
                    >
                      <div id='item-ans-7' className='answers'></div>
                    </li>
                    <li
                      className='answerTiles items'
                      id='item-8'
                      onClick={() => clickHandler(8)}
                    >
                      <div id='item-ans-8' className='answers'></div>
                    </li>
                    <li
                      className='answerTiles items'
                      id='item-9'
                      onClick={() => clickHandler(9)}
                    >
                      <div id='item-ans-9' className='answers'></div>
                    </li>
                    <li className='answerTiles items md:hidden' id='item-10'>
                      <div id='item-ans-10' className='answers'></div>
                    </li>
                  </ul>
                  <div className='flex justify-between mt-6'>
                    <div className='text-left italic font-mono lg:text-lg font-bold w-5/12 text-purple-900 dark:text-purple-50'>
                      Your Score:{' '}
                      {score.current > 9 ? score.current : '0' + score.current}
                    </div>

                    {timerRun ? (
                      <div className='w-3/12'>
                        <CountdownTimer
                          color='purple'
                          initialMinute={0}
                          initialSeconds={timerRun * 1}
                        />
                      </div>
                    ) : (
                      <div className='flex flex-col'>
                        <div className='bg-purple-700 text-center lg:text-lg font-bold italic font-sans text-white px-2 py-2 rounded-full'>
                          {answered.current}
                        </div>
                        <div className='py-2 text-gray-100 dark:text-gray-900 w-2/12'>
                          .
                        </div>
                      </div>
                    )}
                    <div className='text-right italic font-mono lg:text-lg font-bold w-5/12 text-purple-900 dark:text-purple-50'>
                      Question: {question.current + 1}/{maxQuestion.current}
                    </div>
                  </div>
                </div>
              </div>
            </animated.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReactionGame;
