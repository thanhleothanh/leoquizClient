import React, { useState, useEffect, useRef } from 'react';
import { useTransition, animated } from 'react-spring';
import { getQuestions } from './../actions/questionActions';
import { useDispatch, useSelector } from 'react-redux';
import EndGame from './../components/EndGame';
import CountdownTimer from './../components/CountdownTimer';
import Loader from './../components/Loader';
import Meta from './../components/Meta';
import Alert from './../components/Alert';
import { useLocation } from 'react-router-dom';
import { getTest } from '../actions/testActions';
import { getTestResult } from '../actions/testResultsActions';

//thy flow for thy test:
//đầu tiên fetch test result với testID trên address bar, fetch ngay khi zô, useEffect
//nếu đã có test result cho testID này nghĩa là đã làm test này rồi => GO button disabled
//nếu chưa có thì cho bấm GO, fetch câu hỏi test

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
const remove = () => {
  const allItems = document.querySelectorAll('.items');
  Array.from(allItems).forEach((e) => {
    e.classList.remove('wrong');
    e.classList.remove('correct-chosen');
  });
  const allAnswers = document.querySelectorAll('.answers');
  Array.from(allAnswers).forEach((e) => {
    e.innerHTML = '';
  });
};

const MultipleChoice = ({ history }) => {
  //state
  const [playing, setPlaying] = useState(false);
  const [end, setEnd] = useState(false);
  const [next, setNext] = useState(true); //next question
  const [triggerFirstTimeRerender, setTriggerFirstTimeRerender] =
    useState(false);
  //no rerendering
  const playPressed = useRef(false);
  const endState = useRef('Congratulations!');
  const preference = useRef('random');
  const timerLeft = useRef(null);
  const shuffled = useRef(false); //shuffle question array at the beginning, once
  const maxQuestion = useRef(0);
  const question = useRef(0); // index of the current question
  const answer1 = useRef(0); // correct answer
  const score = useRef(0); // current score
  //redux stuffs
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector((state) => state.questions);
  const { userInfo } = useSelector((state) => state.userLogin);

  //for the test
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
    //if pressed PLAY button
    if (playing && !loading && !end) {
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

        // timer;
        const idTimeout = setTimeout(() => {
          endState.current = 'Game Over!';
          setEnd(true);
        }, 300000);
        timerLeft.current = idTimeout; //useRef for clearing timeout on unmount
      }

      if (
        testID === undefined &&
        question.current === questions.length &&
        !loading
      ) {
        clearTimeout(timerLeft.current); //clear timeout
        setEnd(true);
      } else if (
        testID &&
        test &&
        question.current === test.questions.length &&
        !loading
      ) {
        clearTimeout(timerLeft.current); //clear timeout
        setEnd(true);
      } else {
        //REMOVE STATE OF THE PREVIOUS QUESTION
        remove();
        let ans;
        ans = Math.floor(Math.random() * 4) + 1;
        answer1.current = ans;

        if (questions || (test && test.questions)) {
          //cái này là để tránh lúc mà có alert error, không có item-ans1 trên màn hình mà vẫn cố mount
          //mount correct answer
          document.getElementById(`item-ans-${ans}`).innerHTML =
            testID === undefined
              ? questions[question.current].correct_answer
              : test.questions[question.current].correct_answer;
          Array.from(document.querySelectorAll('.items')).forEach((item) =>
            item.classList.add('showMultiple')
          );

          //shuffle wrong answers array
          if (testID === undefined && questions)
            shuffle(questions[question.current].incorrect_answers);
          else if (test && test.questions)
            shuffle(test.questions[question.current].incorrect_answers);

          //mount wrong answers
          let j = 0;
          for (let i = 1; i <= 4; i++) {
            if (i === ans) continue;
            document.getElementById(`item-ans-${i}`).innerHTML =
              testID === undefined
                ? questions[question.current].incorrect_answers[j++]
                    .incorrect_answer
                : test.questions[question.current].incorrect_answers[j++]
                    .incorrect_answer;
          }
        }
      }
      if (!triggerFirstTimeRerender) setTriggerFirstTimeRerender(true);
    }
  }, [next, playing, loading, end]);

  //pre-fectch the images
  useEffect(() => {
    if (testID === undefined && questions) {
      questions.map((question) => {
        const img = new Image();
        if (question.question_image) img.src = question.question_image;
      });
    } else if (test && test.questions) {
      test.questions.map((question) => {
        const img = new Image();
        if (question.question_image) img.src = question.question_image;
      });
    }
  }, [shuffled.current]);

  useEffect(() => {
    return () => {
      clearTimeout(timerLeft.current);
    };
  }, []);

  const playHandler = () => {
    if (!playPressed.current) {
      playPressed.current = true;

      if (testID === undefined)
        dispatch(
          getQuestions({ type: 'multiple', preference: preference.current })
        );
      else dispatch(getTest(testID));

      document.querySelector('.playButton').classList.add('playButtonPressed');
      setTimeout(() => {
        setPlaying(true);
      }, 2000);
    }
  };

  const clickHandler = (id) => {
    if (id === answer1.current) {
      Array.from(document.querySelectorAll('.items')).forEach((item) =>
        item.classList.remove('showMultiple')
      );
      document.getElementById(`item-${id}`).classList.add('correct-chosen');
      setTimeout(() => {
        question.current = question.current + 1;
        score.current = score.current + 2;
        setNext(!next);
      }, 2500);
    } else {
      Array.from(document.querySelectorAll('.items')).forEach((item) =>
        item.classList.remove('showMultiple')
      );
      document.getElementById(`item-${id}`).classList.add('wrong');
      document
        .getElementById(`item-${answer1.current}`)
        .classList.add('correct-chosen');
      setTimeout(() => {
        score.current = score.current - 1 <= 0 ? 0 : score.current - 1;
        setNext(!next);
      }, 2500);
    }
  };

  return (
    <div className='h-auto min-h-screen'>
      <Meta
        title='Multiple Choice'
        description='Leo English Quiz App for Kids | Multiple Choice Game'
      />
      {loadingGetTestResult ? (
        <></>
      ) : errorGetTestResult ? (
        <Alert>{errorGetTestResult}</Alert>
      ) : !playing ? (
        <div className='flex flex-col items-center justify-center w-full h-screen'>
          {testID === undefined || (testResult && testResult.length === 0) ? (
            <button
              className='playButton bg-lightBlue-600 hover:bg-lightBlue-700'
              onClick={playHandler}
            >
              {testID === undefined ? 'Play' : 'Go'}{' '}
              <i className='ml-3 fas fa-play' />
            </button>
          ) : (
            <>
              <button
                className='opacity-50 playButton bg-lightBlue-600'
                disabled
              >
                {testID === undefined ? 'Play' : 'Go'}
                <i className='ml-3 fas fa-play' />
              </button>
              <div className='mt-5 preferences text-lightBlue-800 dark:text-lightBlue-50'>
                You already finished this test!
              </div>
            </>
          )}
          {testID === undefined && (
            <div className='flex flex-col mt-4'>
              <label className='preferences text-lightBlue-800 dark:text-lightBlue-50'>
                <input
                  type='radio'
                  className='w-4 h-4 form-radio md:w-7 md:h-7'
                  name='preference'
                  value='random'
                  onChange={(e) => (preference.current = e.target.value)}
                />
                <span className='ml-2'>Random Quizzes</span>
              </label>
              <label className='mt-2 preferences text-lightBlue-800 dark:text-lightBlue-50'>
                <input
                  type='radio'
                  className='w-4 h-4 form-radio md:w-7 md:h-7'
                  name='preference'
                  value='newest'
                  onChange={(e) => (preference.current = e.target.value)}
                />
                <span className='ml-2'>New Quizzes</span>
              </label>
            </div>
          )}
        </div>
      ) : end ? (
        <EndGame
          title={endState.current}
          score={score.current}
          color='lightBlue'
          history={history}
          preference={preference.current}
          type='multiple'
          testID={testID}
        />
      ) : loading || testLoading ? (
        <div className='h-screen'>
          <Loader
            loader={Math.floor(Math.random() * 10 + 1)}
            color={Math.floor(Math.random() * 10 + 1)}
          />
        </div>
      ) : error || testError ? (
        <Alert>{error || testError}</Alert>
      ) : (
        <div>
          {transition((style) => (
            <animated.div
              style={style}
              className='container flex justify-center w-full mx-auto mt-4 lg:space-x-5'
            >
              <div className='w-full lg:w-1/2'>
                <div className='flex items-center justify-center w-full px-1'>
                  <div
                    className={`text-center bg-backGroundColorLight dark:bg-backGroundColorDark text-lg sm:text-xl lg:text-2xl italic font-sans font-bold  text-lightBlue-800 dark:text-lightBlue-50 shadow-sm rounded-lg py-2 mt-2 lg:mr-0 ${
                      testID === undefined
                        ? question.current < maxQuestion.current &&
                          questions[question.current] &&
                          questions[question.current].question_image
                          ? 'w-4/12 mr-1'
                          : 'w-full mr-0'
                        : question.current < maxQuestion.current &&
                          test.questions[question.current] &&
                          test.questions[question.current].question_image
                        ? 'w-4/12 mr-1'
                        : 'w-full mr-0'
                    } lg:w-full`}
                    id='question'
                  >
                    {testID === undefined
                      ? question.current < maxQuestion.current &&
                        maxQuestion.current !== 0 &&
                        questions[question.current].question
                      : question.current < maxQuestion.current &&
                        maxQuestion.current !== 0 &&
                        test.questions[question.current].question}
                  </div>
                  {testID === undefined
                    ? question.current < maxQuestion.current &&
                      questions[question.current] &&
                      questions[question.current].question_image && (
                        <div className='w-9/12 mt-2 select-none lg:w-0'>
                          <img
                            className='object-cover w-full overflow-hidden rounded-2xl max-h-96'
                            src={questions[question.current].question_image}
                            alt='quiz-pic'
                          />
                        </div>
                      )
                    : question.current < maxQuestion.current &&
                      test.questions[question.current] &&
                      test.questions[question.current].question_image && (
                        <div className='w-9/12 mt-2 select-none lg:w-0'>
                          <img
                            className='object-cover w-full overflow-hidden rounded-2xl max-h-96'
                            src={
                              test.questions[question.current].question_image
                            }
                            alt='quiz-pic'
                          />
                        </div>
                      )}
                </div>

                <div className='flex items-center mx-1 mt-6 bg-backGroundColorLight dark:bg-backGroundColorDark'>
                  <div className='flex-1 max-w-2xl mx-auto'>
                    <ul className='grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2 question-answer-container'>
                      <li
                        className=' answerTilesMultipleChoice items'
                        id='item-1'
                        onClick={() => clickHandler(1)}
                      >
                        <div id='item-ans-1' className='answers'></div>
                      </li>
                      <li
                        className='answerTilesMultipleChoice items'
                        id='item-2'
                        onClick={() => clickHandler(2)}
                      >
                        <div id='item-ans-2' className='answers'></div>
                      </li>
                      <li
                        className=' answerTilesMultipleChoice items'
                        id='item-3'
                        onClick={() => clickHandler(3)}
                      >
                        <div id='item-ans-3' className='answers'></div>
                      </li>
                      <li
                        className=' answerTilesMultipleChoice items'
                        id='item-4'
                        onClick={() => clickHandler(4)}
                      >
                        <div id='item-ans-4' className='answers'></div>
                      </li>
                    </ul>
                    <div className='flex justify-between mt-6 '>
                      <div className='w-5/12 font-mono text-base italic font-bold text-left lg:text-lg text-lightBlue-800 dark:text-lightBlue-50'>
                        Score:{' '}
                        {score.current > 9
                          ? score.current
                          : '0' + score.current}
                      </div>
                      <div className='w-3/12'>
                        <CountdownTimer
                          color='lightBlue'
                          initialMinute={5}
                          initialSeconds={0}
                        />
                      </div>
                      <div className='w-5/12 font-mono text-base italic font-bold text-right lg:text-lg text-lightBlue-800 dark:text-lightBlue-50'>
                        Quiz: {question.current + 1}/{maxQuestion.current}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-0 h-screen select-none lg:w-1/2'>
                {testID === undefined ? (
                  question.current < maxQuestion.current &&
                  questions[question.current] &&
                  questions[question.current].question_image ? (
                    <img
                      className='object-cover w-full max-h-screen mt-2 overflow-hidden lg:h-3/4 rounded-2xl'
                      src={questions[question.current].question_image}
                      alt='quiz-pic'
                    />
                  ) : (
                    <div className='items-center justify-center hidden h-full mt-4 font-semibold bg-orange-200 rounded-full lg:flex md:w-full max-h-96 dark:bg-lightBlue-800 animate-pulse text-lightBlue-800 dark:text-lightBlue-50'>
                      No picture for this question!
                    </div>
                  )
                ) : question.current < maxQuestion.current &&
                  test.questions[question.current] &&
                  test.questions[question.current].question_image ? (
                  <img
                    className='object-cover w-full max-h-screen mt-2 overflow-hidden lg:h-3/4 rounded-2xl'
                    src={test.questions[question.current].question_image}
                    alt='quiz-pic'
                  />
                ) : (
                  <div className='items-center justify-center hidden h-full mt-4 font-semibold bg-orange-200 rounded-full lg:flex md:w-full max-h-96 dark:bg-lightBlue-800 animate-pulse text-lightBlue-800 dark:text-lightBlue-50'>
                    No picture for this question!
                  </div>
                )}
              </div>
            </animated.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultipleChoice;
