import React, { useState, useEffect, useRef } from 'react';
import { useTransition, animated } from 'react-spring';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import EndGame from './../components/EndGame';
import Loader from './../components/Loader';
import Meta from './../components/Meta';
import Alert from './../components/Alert';
import { getQuestions } from './../actions/questionActions';
import { getTestResult } from '../actions/testResultsActions';
import { getTest } from '../actions/testActions';
import shuffle from '../utils/shuffleArray';

const FillInTheBlank = ({ history }) => {
  //state
  const [playing, setPlaying] = useState(false);
  const [end, setEnd] = useState(false);
  const [next, setNext] = useState(true); //next question
  const [answered, setAnswered] = useState(false);
  const [triggerFirstTimeRerender, setTriggerFirstTimeRerender] =
    useState(false);
  //no rerendering
  const playPressed = useRef(false);
  const endState = useRef('Congratulations!');
  const preference = useRef('random');
  const shuffled = useRef(false); //shuffle question array at the beginning, once
  const answer1 = useRef(''); // correct answer
  const wrongAnswer = useRef(false);
  const maxQuestion = useRef(0); // index of the current question
  const question = useRef(0); // index of the current question
  const score = useRef(0); // current score
  //redux stuffs
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm(); // initialize the hook
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
    if (playing && !loading && !testLoading && !testError && !end && !error) {
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
      } else {
        if (questions || (test && test.questions)) {
          answer1.current =
            testID === undefined
              ? questions[question.current].correct_answer
              : test.questions[question.current].correct_answer;
          if (!triggerFirstTimeRerender) setTriggerFirstTimeRerender(true);
        }
      }
    }
  }, [
    next,
    playing,
    questions,
    loading,
    end,
    error,
    testError,
    test,
    testLoading,
  ]);

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

  const playHandler = () => {
    if (!playPressed.current) {
      playPressed.current = true;

      if (testID === undefined)
        dispatch(
          getQuestions({
            type: 'fillintheblank',
            preference: preference.current,
          })
        );
      else dispatch(getTest(testID));

      document.querySelector('.playButton').classList.add('playButtonPressed');
      setTimeout(() => {
        setPlaying(true);
      }, 2000);
    }
  };

  const answerHandler = (data) => {
    const submitBtn = document.getElementById('submit-btn');
    const answerForm = document.getElementById('answerForm');
    const answerField = document.getElementById('answerField');
    if (data.answer.toLowerCase().trim() === answer1.current.toLowerCase()) {
      //UI UX related
      answerField.value = '';
      answerForm.disabled = true;
      wrongAnswer.current = false;
      submitBtn.disabled = true;
      submitBtn.classList.remove('submitBtnFillintheblank');
      submitBtn.classList.add('disableSubmitBtnFillintheblank');
      setAnswered(!answered);
      setTimeout(() => setAnswered(false), 2500);
      setTimeout(() => {
        answerForm.disabled = false;
        submitBtn.disabled = false;
        submitBtn.classList.remove('disableSubmitBtnFillintheblank');
        submitBtn.classList.add('submitBtnFillintheblank');
      }, 2500);
      //next question
      setTimeout(() => {
        question.current = question.current + 1;
        score.current = score.current + 3;
        setNext(!next);
      }, 2500);
    } else if (data.answer.toLowerCase() === '-skip') {
      answerField.value = '';
      question.current = question.current + 1;
      setNext(!next);
    } else {
      //UI UX related
      answerForm.disabled = true;
      wrongAnswer.current = true;
      submitBtn.disabled = true;
      submitBtn.classList.remove('submitBtnFillintheblank');
      submitBtn.classList.add('disableSubmitBtnFillintheblank');
      setAnswered(!answered);
      score.current = score.current - 1 <= 0 ? 0 : score.current - 1;
      setTimeout(() => setAnswered(false), 1000);
      setTimeout(() => {
        answerForm.disabled = false;
        submitBtn.disabled = false;
        submitBtn.classList.remove('disableSubmitBtnFillintheblank');
        submitBtn.classList.add('submitBtnFillintheblank');
      }, 1000);
    }
  };

  return (
    <div className='h-auto min-h-screen'>
      <Meta
        title='Fill In The Blank'
        description='Leo English Quiz App for Kids | Fill in the blank Game'
      />
      {loadingGetTestResult ? (
        <></>
      ) : errorGetTestResult ? (
        <Alert>{errorGetTestResult}</Alert>
      ) : !playing ? (
        <div className='flex flex-col items-center justify-center w-full h-screen'>
          {testID === undefined || (testResult && testResult.length === 0) ? (
            <button
              className='bg-indigo-600 playButton hover:bg-indigo-700'
              onClick={playHandler}
            >
              {testID === undefined ? 'Play' : 'Go'}{' '}
              <i className='ml-3 fas fa-play' />
            </button>
          ) : (
            <>
              <button className='bg-indigo-600 opacity-50 playButton' disabled>
                {testID === undefined ? 'Play' : 'Go'}
                <i className='ml-3 fas fa-play' />
              </button>
              <div className='mt-5 text-indigo-800 preferences dark:text-indigo-50'>
                You already finished this test!
              </div>
            </>
          )}
          {testID === undefined && (
            <div className='flex flex-col mt-5'>
              <label className='text-indigo-800 preferences dark:text-indigo-50'>
                <input
                  type='radio'
                  className='w-4 h-4 form-radio md:w-7 md:h-7'
                  name='preference'
                  value='random'
                  onChange={(e) => (preference.current = e.target.value)}
                />
                <span className='ml-2'>Random Quizzes</span>
              </label>
              <label className='mt-2 text-indigo-800 preferences dark:text-indigo-50'>
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
          <div className='mt-5 text-base text-center text-indigo-800 dark:text-indigo-50'>
            If a quiz is too hard <br />
            Submit <strong className='font-extrabold'>-skip</strong> to skip it
          </div>
        </div>
      ) : end ? (
        <EndGame
          title={endState.current}
          score={score.current}
          color='indigo'
          history={history}
          preference={preference.current}
          type='fillintheblank'
          questions={testID === undefined ? questions : test.questions}
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
            <animated.div
              style={style}
              className='container flex justify-center w-full mx-auto mt-4 lg:space-x-5'
            >
              <div className='w-full lg:w-6/12'>
                <div className='flex flex-col items-center justify-center w-full px-1 md:flex-row'>
                  <div
                    className={`text-center bg-backGroundColorLight dark:bg-backGroundColorDark text-lg sm:text-xl lg:text-2xl italic font-sans font-bold text-indigo-800 dark:text-indigo-50 shadow-sm rounded-lg py-2 mt-2 lg:mr-0 md:mr-1 ${
                      testID === undefined
                        ? question.current < maxQuestion.current &&
                          questions[question.current] &&
                          questions[question.current].question_image
                          ? 'w-full md:w-4/12'
                          : 'w-full'
                        : question.current < maxQuestion.current &&
                          test.questions[question.current] &&
                          test.questions[question.current].question_image
                        ? 'w-full md:w-4/12'
                        : 'w-full'
                    } lg:w-full`}
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
                  {testID === undefined ? (
                    question.current < maxQuestion.current &&
                    questions[question.current] &&
                    questions[question.current].question_image ? (
                      <div className='w-full mt-4 select-none md:w-8/12 lg:w-0'>
                        <img
                          className='object-cover w-full overflow-hidden rounded-2xl md:max-h-96'
                          src={questions[question.current].question_image}
                          alt='quiz-pic'
                        />
                      </div>
                    ) : (
                      <div className='flex items-center justify-center w-full h-48 mt-4 text-sm font-semibold text-indigo-800 bg-orange-200 rounded-full opacity-50 lg:hidden dark:bg-indigo-900 dark:text-indigo-50'>
                        No picture for this question!
                      </div>
                    )
                  ) : question.current < maxQuestion.current &&
                    test.questions[question.current] &&
                    test.questions[question.current].question_image ? (
                    <div className='w-full mt-4 select-none md:w-8/12 lg:w-0'>
                      <img
                        className='object-cover w-full overflow-hidden rounded-2xl md:max-h-96'
                        src={test.questions[question.current].question_image}
                        alt='quiz-pic'
                      />
                    </div>
                  ) : (
                    <div className='flex items-center justify-center w-full h-48 mt-4 text-sm font-semibold text-indigo-800 bg-orange-200 rounded-full opacity-50 lg:hidden dark:bg-indigo-900 dark:text-indigo-50'>
                      No picture for this question!
                    </div>
                  )}
                </div>

                <div className='flex items-center mx-1 mt-6 bg-backGroundColorLight dark:bg-backGroundColorDark'>
                  <div className='flex-1 max-w-2xl mx-auto'>
                    <form
                      onSubmit={handleSubmit(answerHandler)}
                      id='answerForm'
                    >
                      <div className='flex'>
                        <input
                          className='w-full py-5 pl-8 text-sm font-semibold text-indigo-700 placeholder-indigo-700 rounded-l-full shadow-md appearance-none focus:ring-4 focus:ring-opacity-75 focus:ring-indigo-600 focus:outline-none dark:bg-indigo-900 dark:text-indigo-50 dark:placeholder-indigo-50 lg:text-base'
                          name='answer'
                          id='answerField'
                          type='text'
                          required
                          autoComplete='off'
                          ref={register}
                          placeholder='Your answer (-skip to skip)'
                        />
                        <button
                          className='submitBtnFillintheblank'
                          id='submit-btn'
                          type='submit'
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                    <div className='flex justify-between mt-6'>
                      <div className='w-5/12 font-mono italic font-bold text-left text-indigo-800 lg:text-lg dark:text-indigo-50'>
                        Score:{' '}
                        {score.current > 9
                          ? score.current
                          : '0' + score.current}
                      </div>

                      {answered ? (
                        !wrongAnswer.current ? (
                          <div className='w-3/12 px-2 py-2 font-sans italic font-bold text-center text-white rounded-full bg-lime-600 lg:text-lg animate-bounce'>
                            {answered && 'Very cool!'}
                            {/* THIS ONE! MUỐN RENDER LẠI CÁI NÀY THÌ PHẢI ĐẶT CÁI THAY ĐỔI VÀO TRONG DIV */}
                          </div>
                        ) : (
                          <div className='w-3/12 px-2 py-2 font-sans italic font-bold text-center text-white bg-red-600 rounded-full lg:text-lg animate-wiggle'>
                            {answered && 'Try again!'}
                            {/* THIS ONE! MUỐN RENDER LẠI CÁI NÀY THÌ PHẢI ĐẶT CÁI THAY ĐỔI VÀO TRONG DIV */}
                          </div>
                        )
                      ) : (
                        <div className='w-3/12 py-2 text-gray-100 dark:text-gray-900'>
                          .
                        </div>
                      )}
                      <div className='w-5/12 font-mono italic font-bold text-right text-indigo-800 lg:text-lg dark:text-indigo-50'>
                        Quiz: {question.current + 1}/{maxQuestion.current}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-0 h-screen select-none lg:w-6/12'>
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
                    <div className='items-center justify-center hidden h-full mt-2 font-semibold text-indigo-800 bg-orange-200 rounded-full lg:flex md:w-full max-h-96 dark:bg-indigo-900 animate-pulse dark:text-indigo-50'>
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
                  <div className='items-center justify-center hidden h-full mt-2 font-semibold text-indigo-800 bg-orange-200 rounded-full lg:flex md:w-full max-h-96 dark:bg-indigo-900 animate-pulse dark:text-indigo-50'>
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

export default FillInTheBlank;
