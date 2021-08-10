import React, { useEffect, useState, useRef } from 'react';
import { useTransition, animated } from 'react-spring';
import { useSelector, useDispatch } from 'react-redux';
import { getTest, updateTest } from './../actions/testActions';
import Loader from './../components/Loader';
import Alert from './../components/Alert';
import Message from './../components/Message';
import Meta from './../components/Meta';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import AnswersTable from '../components/AnswersTable';

const TeacherTestScreen = ({ history, match }) => {
  const [animation] = useState(false);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);

  const questionType = useRef('');
  const sentRequest = useRef(false);
  const changed = useRef(false);
  const [deleteQuestionModalIsOpen, setDeleteQuestionModalIsOpen] =
    useState(false);
  const [fillintheblankModalIsOpen, setFillintheblankModalIsOpen] =
    useState(false);
  const [reactionModalIsOpen, setReactionModalIsOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    test,
    loading: loadingGetTest,
    error: errorGetTest,
    success: successGetTest,
  } = useSelector((state) => state.getTest);

  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) history.push('/login');
    if (userInfo.role !== 'teacher' && userInfo.role !== 'admin') {
      history.push('/home');
    }
  }, [userInfo]);

  useEffect(() => {
    if (!sentRequest.current) {
      dispatch(getTest(match.params.id));
      sentRequest.current = true;
    }
    if (successGetTest) {
      setQuestions(test.questions);
      setActiveStatus(test.active);
    }
  }, [history, successGetTest]);

  //ANIMATION
  const transition = useTransition(animation, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
  });

  //ON THE SCREEN ON THE SCREEN ON THE SCREEN ON THE SCREEN ON THE SCREEN
  //ON THE SCREEN ON THE SCREEN ON THE SCREEN ON THE SCREEN ON THE SCREEN
  //ON THE SCREEN ON THE SCREEN ON THE SCREEN ON THE SCREEN ON THE SCREEN
  const closeModal = () => {
    setReactionModalIsOpen(false);
    setFillintheblankModalIsOpen(false);
    setDeleteQuestionModalIsOpen(false);
    reset();
  };
  const addQuestion = () => {
    if (test.type === 'reactiongame') setReactionModalIsOpen(true);
    else if (test.type === 'multiplechoice') {
      questionType.current = 'multiplechoice';
      setFillintheblankModalIsOpen(true);
    } else {
      questionType.current = 'fillintheblank';
      setFillintheblankModalIsOpen(true);
    }
  };

  //DELETE QUESTION
  //DELETE QUESTION
  const changeActiveStatus = () => {
    if (
      window.confirm(
        'Are you sure to change the active status of this test! Please check everything again and make sure the test is ready!'
      )
    ) {
      setActiveStatus(!activeStatus);
      changed.current = true;
    }
  };

  const updateTestQuestions = () => {
    if (changed.current)
      dispatch(updateTest(match.params.id, [...questions], activeStatus));
    setSendingRequest(true);
    setTimeout(() => history.push('/teacher'), 1000);
  };

  const deleteQuestion = (index) => {
    let tempQuestions = questions;
    tempQuestions.splice(index, 1);
    setQuestions([...tempQuestions]);
  };
  const deleteQuestionHandler = (data) => {
    if (window.confirm(`Are you sure to delete question #${data.index}?`)) {
      deleteQuestion(data.index * 1 - 1);
      changed.current = true;
      closeModal();
    }
  };
  const deleteQuestionModal = () => {
    return (
      <div>
        <Modal
          isOpen={deleteQuestionModalIsOpen}
          onRequestClose={closeModal}
          shouldCloseOnOverlayClick={false}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              maxHeight: '70%',
              maxWidth: '80%',
              minWidth: '40%',
            },
          }}
          contentLabel='New reaction question'
        >
          <div className='text-left font-bold text-red-900 dark:text-purple-800 text-xl lg:text-2xl py-3'>
            Delete a Question
          </div>
          <form
            className='bg-white rounded-b-2xl pt-4 pb-8  flex flex-col w-full'
            onSubmit={handleSubmit(deleteQuestionHandler)}
          >
            <label className='labelFieldAboutYou'>Question Number</label>
            <input
              className='fieldAboutYou'
              name='index'
              id='index'
              type='number'
              autoComplete='off'
              placeholder='#'
              required
              ref={register}
            />

            <div className='flex items-center justify-between outline-none mt-5'>
              <button className='buttonAboutYou' type='submit'>
                Delete question
              </button>
            </div>
          </form>
          <div className='flex justify-end'>
            <button
              className='text-base rounded-lg text-white font-bold px-5 py-2 focus:outline-none
              bg-orange-500 hover:bg-orange-700
              dark:bg-purple-500 dark:hover:bg-purple-700'
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    );
  };

  //REACTION GAME
  //REACTION GAME
  //REACTION GAME
  const postReactionHandler = (data) => {
    if (window.confirm(`Are you sure to post this question?`)) {
      setQuestions([
        ...questions,
        {
          question: data.question,
          correct_answer: data.correct_answer,
          incorrect_answers: [
            {
              incorrect_answer: data.incorrect_answer,
            },
          ],
        },
      ]);
      changed.current = true;
      closeModal();
    }
  };
  const reactionModal = () => {
    return (
      <div>
        <Modal
          isOpen={reactionModalIsOpen}
          onRequestClose={closeModal}
          shouldCloseOnOverlayClick={false}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              maxHeight: '70%',
              maxWidth: '80%',
              minWidth: '40%',
            },
          }}
          contentLabel='New reaction question'
        >
          <div className='text-left font-bold text-red-900 dark:text-purple-800 text-xl lg:text-2xl py-3'>
            Add a new Question
          </div>
          <form
            className='bg-white rounded-b-2xl pt-4 pb-8  flex flex-col w-full'
            onSubmit={handleSubmit(postReactionHandler)}
          >
            <label className='labelFieldAboutYou'>Question</label>
            <input
              className='fieldAboutYou'
              name='question'
              type='text'
              autoComplete='off'
              required
              ref={register}
            />

            <label className='labelFieldAboutYou'>Correct answer</label>
            <input
              className='fieldAboutYou '
              name='correct_answer'
              type='text'
              autoComplete='off'
              required
              ref={register}
            />
            <label className='labelFieldAboutYou'>Incorrect answer</label>
            <input
              className='fieldAboutYou '
              name='incorrect_answer'
              type='text'
              autoComplete='off'
              required
              ref={register}
            />
            <div className='flex items-center justify-between outline-none mt-5'>
              <button className='buttonAboutYou' type='submit'>
                Add question
              </button>
            </div>
          </form>
          <div className='flex justify-end'>
            <button
              className='text-base rounded-lg text-white font-bold px-5 py-2 focus:outline-none
              bg-orange-500 hover:bg-orange-700
              dark:bg-purple-500 dark:hover:bg-purple-700'
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    );
  };
  //FILL IN THE BLANK
  //FILL IN THE BLANK
  //FILL IN THE BLANK
  const postFillinblankHandler = (data) => {
    if (
      window.confirm(
        `Are you sure to post this question, check the information again please?`
      )
    ) {
      setQuestions([
        ...questions,
        {
          question: data.question,
          question_image: data.question_image,
          correct_answer: data.correct_answer,
          incorrect_answers: [
            {
              incorrect_answer: data.incorrect_answer1,
            },
            {
              incorrect_answer: data.incorrect_answer2,
            },
            {
              incorrect_answer: data.incorrect_answer3,
            },
          ],
        },
      ]);
      changed.current = true;
      closeModal();
    }
  };
  const fillintheblankModal = () => {
    return (
      <div>
        <Modal
          isOpen={fillintheblankModalIsOpen}
          onRequestClose={closeModal}
          shouldCloseOnOverlayClick={false}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              maxHeight: '70%',
              maxWidth: '80%',
              minWidth: '40%',
            },
          }}
          contentLabel='New reaction question'
        >
          <div className='text-left font-bold text-red-900 dark:text-purple-800 text-xl lg:text-2xl py-3'>
            Add a new Question
          </div>
          <form
            className='bg-white rounded-b-2xl pt-4 pb-8  flex flex-col w-full'
            onSubmit={handleSubmit(postFillinblankHandler)}
          >
            <label className='labelFieldAboutYou'>Question</label>
            <input
              className='fieldAboutYou'
              name='question'
              id='question'
              type='text'
              autoComplete='off'
              required
              ref={register}
            />

            <label className='labelFieldAboutYou'>
              Question's Image (use Google Images' URL only),
            </label>
            <input
              className='fieldAboutYou'
              name='question_image'
              id='question_image'
              type='text'
              autoComplete='off'
              ref={register}
            />

            <label className='labelFieldAboutYou mt-1'>CORRECT ANSWER</label>
            <input
              className='fieldAboutYou '
              name='correct_answer'
              id='correct_answer'
              type='text'
              autoComplete='off'
              required
              ref={register}
            />

            <label className='labelFieldAboutYou'>Incorrect answer 1</label>
            <input
              className='fieldAboutYou '
              name='incorrect_answer1'
              id='incorrect_answer1'
              type='text'
              autoComplete='off'
              required
              ref={register}
            />
            <label className='labelFieldAboutYou'>Incorrect answer 2</label>
            <input
              className='fieldAboutYou '
              name='incorrect_answer2'
              id='incorrect_answer2'
              type='text'
              autoComplete='off'
              required
              ref={register}
            />
            <label className='labelFieldAboutYou'>Incorrect answer 3</label>
            <input
              className='fieldAboutYou '
              name='incorrect_answer3'
              id='incorrect_answer3'
              type='text'
              autoComplete='off'
              required
              ref={register}
            />
            <div className='flex items-center justify-between outline-none mt-5'>
              <button className='buttonAboutYou' type='submit'>
                Add question
              </button>
            </div>
          </form>
          <div className='flex justify-end'>
            <button
              className='text-base rounded-lg text-white font-bold px-5 py-2 focus:outline-none
              bg-orange-500 hover:bg-orange-700
              dark:bg-purple-500 dark:hover:bg-purple-700'
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    );
  };
  //RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER
  //RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER
  //RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER
  return (
    <>
      <Meta
        title='For Teacher'
        description='Leo English Quiz App for Kids | Teacher'
      />
      <div
        className='flex flex-col md:items-baseline md:flex-row h-auto min-h-screen w-full mt-8 
                   px-1 sm:px-10 md:px-1 lg:px-7 md:space-x-2 space-y-16 md:space-y-0'
      >
        {loadingGetTest ? (
          <Loader
            loader={Math.floor(Math.random() * 10 + 1)}
            color={Math.floor(Math.random() * 10 + 1)}
          />
        ) : errorGetTest ? (
          <Alert>{errorGetTest}</Alert>
        ) : (
          test && (
            <>
              {test &&
                userInfo &&
                (userInfo.role === 'teacher' || userInfo.role === 'admin') && (
                  <div className='w-full md:w-2/5 lg:w-1/3'>
                    <div className='text-left shadow-md font-bold text-red-800 dark:text-purple-800 text-xl lg:text-2xl w-full bg-gray-50 dark:bg-backGroundColorLight rounded-t-2xl px-7 pt-2'>
                      Test's Detail <i className='fas fa-barcode' />
                    </div>
                    <div className='bg-gray-50 dark:bg-backGroundColorLight pb-5 px-7 rounded-b-2xl shadow-sm'>
                      <table className='table-fixed w-full'>
                        <thead>
                          <tr>
                            <th className='py-3 w-5/12 '></th>
                            <th className='py-3 w-7/12 '></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className='tableCell text-left'>Name:</td>
                            <td className='tableCell text-left'>
                              {test.test_name[0].toUpperCase() +
                                test.test_name.slice(1)}
                            </td>
                          </tr>
                          <tr>
                            <td className='tableCell text-left'>
                              Description:
                            </td>
                            <td className='tableCell text-left'>
                              {test.test_description[0].toUpperCase() +
                                test.test_description.slice(1)}
                            </td>
                          </tr>
                          <tr>
                            <td className='tableCell text-left'>Type:</td>
                            <td className='tableCell text-left'>{test.type}</td>
                          </tr>
                          <tr>
                            <td className='tableCell text-left'>
                              Change Active status:
                            </td>
                            <td className='tableCell text-left'>
                              <i
                                className={`text-2xl md:text-3xl fas fa-${
                                  activeStatus
                                    ? 'check text-green-500 hover:text-green-700'
                                    : 'times text-red-500 hover:text-red-700'
                                }`}
                                onClick={changeActiveStatus}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <Message className='mt-3' type='info'>
                      Teachers, only set the active status of your tests to{' '}
                      <i className='fas fa-check text-green-500' /> when
                      everything's ready!
                      <br />
                      (When the questions are complete)
                    </Message>
                    <button
                      className='buttonAboutYou mt-3 rounded-2xl'
                      onClick={() => updateTestQuestions()}
                    >
                      Save, Go back!
                    </button>
                    <div className='mt-5'>
                      {sendingRequest && (
                        <Loader
                          loader={Math.floor(Math.random() * 10 + 1)}
                          color={Math.floor(Math.random() * 10 + 1)}
                        />
                      )}
                    </div>
                  </div>
                )}
              <div className='w-full md:w-3/5 lg:w-2/3'>
                {userInfo &&
                  (userInfo.role === 'teacher' ||
                    userInfo.role === 'admin') && (
                    <>
                      <div className='text-center flex justify-center'>
                        <h2 className=' topHeader text-xl lg:text-2xl bg-gray-50 dark:bg-backGroundColorLight rounded-t-2xl'>
                          Questions <span>|</span>{' '}
                          <i
                            className='fas fa-plus text-lime-500 hover:text-lime-700'
                            onClick={addQuestion}
                          />{' '}
                          <span>|</span>{' '}
                          <i
                            className='fas fa-trash text-rose-500 hover:text-rose-700'
                            onClick={() => setDeleteQuestionModalIsOpen(true)}
                          />
                        </h2>
                      </div>
                      <AnswersTable questions={questions} fullWidth={true} />
                    </>
                  )}
              </div>
            </>
          )
        )}
      </div>
      {reactionModal()}
      {fillintheblankModal()}
      {deleteQuestionModal()}
    </>
  );
};

export default TeacherTestScreen;
