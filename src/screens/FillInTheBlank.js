import React, { useState, useEffect, useRef } from 'react';
import { getQuestions } from './../actions/questionActions';
import { useDispatch, useSelector } from 'react-redux';
import EndGame from './../components/EndGame';
import Loader from './../components/Loader';
import Meta from './../components/Meta';
import Alert from './../components/Alert';
import { useForm } from 'react-hook-form';

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

const FillInTheBlank = ({ history }) => {
  //state
  const [playing, setPlaying] = useState(false);
  const [end, setEnd] = useState(false);
  const [next, setNext] = useState(true); //next question
  const [answered, setAnswered] = useState(false);
  const [triggerFirstTimeRerender, setTriggerFirstTimeRerender] = useState(
    false
  );
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

  useEffect(() => {
    if (!userInfo) history.push('/login');
  }, [userInfo, history]);
  useEffect(() => {
    if (playing && !loading && !end) {
      //if pressed PLAY button
      if (!shuffled.current) {
        shuffled.current = true;
        maxQuestion.current = questions.length;
        shuffle(questions);
      }
      if (question.current === questions.length && !loading) {
        setEnd(true);
      } else {
        answer1.current = questions[question.current].correct_answer;
        if (!triggerFirstTimeRerender) setTriggerFirstTimeRerender(true);
      }
    }
  }, [next, playing, loading, end]);

  //pre-fectch the images
  useEffect(() => {
    if (questions) {
      questions.map((question) => {
        const img = new Image();
        if (question.question_image) img.src = question.question_image;
      });
    }
  }, [shuffled.current]);

  const playHandler = () => {
    if (!playPressed.current) {
      playPressed.current = true;
      dispatch(
        getQuestions({ type: 'fillintheblank', preference: preference.current })
      );
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
      {!playing ? (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
          <button
            className='playButton bg-teal-600 hover:bg-teal-700'
            onClick={playHandler}
          >
            Play <i className='ml-3 fas fa-play' />
          </button>
          <div className='mt-4 flex flex-col'>
            <label className='preferences text-teal-800 dark:text-teal-50'>
              <input
                type='radio'
                className='form-radio w-4 h-4 md:w-7 md:h-7'
                name='preference'
                value='random'
                onChange={(e) => (preference.current = e.target.value)}
              />
              <span className='ml-2'>Random Questions</span>
            </label>
            <label className='preferences text-teal-800 dark:text-teal-50 mt-2'>
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
          <div className='text-base md:text-lg text-teal-800 dark:text-teal-50 mt-5  text-center'>
            If a question is too hard.
          </div>
          <div className='text-base md:text-lg text-teal-800 dark:text-teal-50 text-center'>
            Submit <strong className='font-extrabold'>-skip</strong> to skip
            that question
          </div>
        </div>
      ) : end ? (
        <EndGame
          title={endState.current}
          score={score.current}
          color='teal'
          history={history}
          preference={preference.current}
          type='fillintheblank'
          questions={questions}
        />
      ) : loading ? (
        <div className='h-screen'>
          <Loader
            loader={Math.floor(Math.random() * 10) + 1}
            color={Math.floor(Math.random() * 10) + 1}
          />
        </div>
      ) : error ? (
        <Alert>{error}</Alert>
      ) : (
        <div className='flex justify-center lg:space-x-5 container mx-auto w-full mt-4'>
          <div className='lg:w-6/12 w-full'>
            <div className='w-full flex flex-col md:flex-row justify-center items-center px-1'>
              <div
                className={`text-center bg-backGroundColorLight dark:bg-backGroundColorDark text-lg md:text-xl lg:text-2xl italic font-sans font-bold text-teal-800 dark:text-teal-50 shadow-md rounded-lg py-2 ${
                  question.current < maxQuestion.current &&
                  questions[question.current] &&
                  questions[question.current].question_image
                    ? 'w-full md:w-4/12'
                    : 'w-full'
                } lg:w-full`}
                id='question'
              >
                {question.current < maxQuestion.current &&
                  maxQuestion.current !== 0 &&
                  questions[question.current] &&
                  questions[question.current].question}
              </div>
              {question.current < maxQuestion.current &&
                questions[question.current] &&
                questions[question.current].question_image && (
                  <div className='w-full md:w-8/12 lg:w-0 select-none mt-2 md:pl-1 lg:pl-0'>
                    <img
                      className='w-full object-cover overflow-hidden rounded-2xl md:max-h-96'
                      src={questions[question.current].question_image}
                      alt='quiz-pic'
                    />
                  </div>
                )}
            </div>

            <div className='mt-6 mx-1 flex items-center bg-backGroundColorLight dark:bg-backGroundColorDark'>
              <div className='flex-1 max-w-2xl mx-auto'>
                <form onSubmit={handleSubmit(answerHandler)} id='answerForm'>
                  <div className='flex'>
                    <input
                      className='rounded-l-full w-full py-5 pl-8 shadow-md appearance-none font-semibold focus:ring-4 focus:ring-opacity-75 focus:ring-teal-600 focus:outline-none dark:bg-teal-900 text-teal-700 dark:text-teal-50 placeholder-teal-700 dark:placeholder-teal-50 text-sm lg:text-base'
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
                  <div className='text-left italic font-mono lg:text-lg font-bold w-5/12 text-teal-800 dark:text-teal-50'>
                    Your Score:{' '}
                    {score.current > 9 ? score.current : '0' + score.current}
                  </div>

                  {answered ? (
                    !wrongAnswer.current ? (
                      <div className='bg-emerald-600 text-center lg:text-lg font-bold italic font-sans text-white px-2 py-2 rounded-full animate-bounce w-3/12'>
                        {answered && 'Very cool!'}
                        {/* THIS ONE! MUỐN RENDER LẠI CÁI NÀY THÌ PHẢI ĐẶT CÁI THAY ĐỔI VÀO TRONG DIV */}
                      </div>
                    ) : (
                      <div className='bg-orange-600 text-center lg:text-lg font-bold italic font-sans text-white px-2 py-2 rounded-full animate-wiggle w-3/12'>
                        {answered && 'Try again!'}
                        {/* THIS ONE! MUỐN RENDER LẠI CÁI NÀY THÌ PHẢI ĐẶT CÁI THAY ĐỔI VÀO TRONG DIV */}
                      </div>
                    )
                  ) : (
                    <div className='py-2 text-gray-100 dark:text-gray-900 w-3/12'>
                      .
                    </div>
                  )}
                  <div className='text-right italic font-mono lg:text-lg font-bold w-5/12 text-teal-800 dark:text-teal-50'>
                    Question: {question.current + 1}/{maxQuestion.current}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='h-screen w-0 lg:w-6/12 select-none'>
            {question.current < maxQuestion.current &&
            questions[question.current] &&
            questions[question.current].question_image ? (
              <img
                className='w-full lg:h-3/4 max-h-screen mt-2 object-cover overflow-hidden rounded-2xl'
                src={questions[question.current].question_image}
                alt='quiz-pic'
              />
            ) : (
              <div className='mt-2 hidden lg:flex justify-center items-center md:w-full max-h-96 h-full bg-orange-200 dark:bg-teal-900 rounded-full animate-pulse font-semibold text-teal-800 dark:text-teal-50'>
                No picture for this question!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FillInTheBlank;
