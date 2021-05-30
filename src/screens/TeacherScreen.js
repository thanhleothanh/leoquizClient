import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTests, postTest } from './../actions/testActions';
import { postQuestion } from './../actions/questionActions';
import Loader from './../components/Loader';
import Alert from './../components/Alert';
import Meta from './../components/Meta';
import Message from './../components/Message';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const TeacherScreen = ({ history, location }) => {
  //modal state
  const testType = useRef('multiple');
  const questionType = useRef('');
  const [newTestModalIsOpen, setNewTestModalIsOpen] = useState(false);
  const [reactionModalIsOpen, setReactionModalIsOpen] = useState(false);
  const [fillintheblankModalIsOpen, setFillintheblankModalIsOpen] =
    useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    success: successPostQuestion,
    loading: loadingPostQuestion,
    error: errorPostQuestion,
  } = useSelector((state) => state.postQuestion);
  const {
    tests,
    loading: loadingTestsTeacher,
    error: errorTestsTeacher,
    success: successTestsTeacher,
  } = useSelector((state) => state.tests);
  const {
    loading: loadingPostTest,
    error: errorPostTest,
    success: successPostTest,
  } = useSelector((state) => state.postTest);

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) history.push('/login');
  }, [userInfo]);

  useEffect(() => {
    if (userInfo.role !== 'teacher' && userInfo.role !== 'admin') {
      history.push('/home');
    } else {
      if (!tests) dispatch(getTests());
      dispatch({ type: 'GET_TEST_RESET' });
      dispatch({ type: 'GET_TEST_RESULTS_OF_TEST_RESET' });
      dispatch({ type: 'GET_TEST_RESULTS_OF_STUDENT_RESET' });
    }
  }, [history, dispatch]);

  //modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal
  //modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal
  //modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal
  //modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal
  const closeModal = () => {
    setReactionModalIsOpen(false);
    setFillintheblankModalIsOpen(false);
    setNewTestModalIsOpen(false);
  };
  // REACTION MODAL REACTION MODAL REACTION MODAL REACTION MODAL REACTION MODAL REACTION MODAL REACTION
  // REACTION MODAL REACTION MODAL REACTION MODAL REACTION MODAL REACTION MODAL REACTION MODAL REACTION
  // REACTION MODAL REACTION MODAL REACTION MODAL REACTION MODAL REACTION MODAL REACTION MODAL REACTION
  const postReactionHandler = (data) => {
    if (window.confirm(`Are you sure to post this question?`)) {
      dispatch(
        postQuestion({
          question: data.question,
          correct_answer: data.correct_answer,
          incorrect_answers: [
            {
              incorrect_answer: data.incorrect_answer,
            },
          ],
          type: 'reaction',
        })
      );
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
            Create new Reaction Game question
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
              required
              ref={register}
            />
            <label className='labelFieldAboutYou'>Incorrect answer</label>
            <input
              className='fieldAboutYou '
              name='incorrect_answer'
              type='text'
              required
              ref={register}
            />
            <div className='flex items-center justify-between outline-none mt-5'>
              <button className='buttonAboutYou' type='submit'>
                Create question
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
  // FILLINTHEBLANK MODAL FILLINTHEBLANK MODAL FILLINTHEBLANK MODAL FILLINTHEBLANK MODAL FILLINTHEBLANK
  // FILLINTHEBLANK MODAL FILLINTHEBLANK MODAL FILLINTHEBLANK MODAL FILLINTHEBLANK MODAL FILLINTHEBLANK
  // FILLINTHEBLANK MODAL FILLINTHEBLANK MODAL FILLINTHEBLANK MODAL FILLINTHEBLANK MODAL FILLINTHEBLANK
  const typeHandler = (type) => {
    questionType.current = type;
    setFillintheblankModalIsOpen(true);
  };

  const postFillinblankHandler = (data) => {
    if (window.confirm(`Are you sure to post this question?`)) {
      dispatch(
        postQuestion({
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
          type: questionType.current,
        })
      );
      questionType.current = '';
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
            Create new{' '}
            {questionType.current === 'multiple'
              ? 'Multiple Choice'
              : 'Fill in the blank'}{' '}
            question
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
              Question's Image (Copy image address, paste it here),
            </label>
            <input
              className='fieldAboutYou'
              name='question_image'
              id='question_image'
              type='text'
              placeholder='Good to have but not required'
              autoComplete='off'
              ref={register}
            />

            <label className='labelFieldAboutYou mt-2'>CORRECT ANSWER</label>
            <input
              className='fieldAboutYou '
              name='correct_answer'
              id='correct_answer'
              type='text'
              required
              ref={register}
            />

            <label className='labelFieldAboutYou'>Incorrect answer 1</label>
            <input
              className='fieldAboutYou '
              name='incorrect_answer1'
              id='incorrect_answer1'
              type='text'
              required
              ref={register}
            />
            <label className='labelFieldAboutYou'>Incorrect answer 2</label>
            <input
              className='fieldAboutYou '
              name='incorrect_answer2'
              id='incorrect_answer2'
              type='text'
              required
              ref={register}
            />
            <label className='labelFieldAboutYou'>Incorrect answer 3</label>
            <input
              className='fieldAboutYou '
              name='incorrect_answer3'
              id='incorrect_answer3'
              type='text'
              required
              ref={register}
            />
            <div className='flex items-center justify-between outline-none mt-5'>
              <button className='buttonAboutYou' type='submit'>
                Create question
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
  // NEW TEST NEW TEST NEW TEST NEW TEST NEW TEST NEW TEST NEW TEST NEW TEST NEW TEST NEW TEST
  // NEW TEST NEW TEST NEW TEST NEW TEST NEW TEST NEW TEST NEW TEST NEW TEST NEW TEST NEW TEST
  // NEW TEST NEW TEST NEW TEST NEW TEST NEW TEST NEW TEST NEW TEST NEW TEST NEW TEST NEW TEST
  const postNewTestHandler = (data) => {
    if (
      window.confirm(
        `Are you sure to create this new test, check the information again please?`
      )
    ) {
      dispatch(
        postTest({
          test_name: data.test_name,
          test_description: data.test_description,
          questions: [],
          type: testType.current,
        })
      );
      testType.current = 'multiple';
      closeModal();
    }
  };

  const newTestModal = () => {
    return (
      <div>
        <Modal
          isOpen={newTestModalIsOpen}
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
          contentLabel='Create New Test'
        >
          <div className='text-left font-bold text-red-900 dark:text-purple-800 text-xl lg:text-2xl py-3'>
            Create a Custom Test
          </div>
          <form
            className='bg-white rounded-b-2xl pt-4 pb-8  flex flex-col w-full'
            onSubmit={handleSubmit(postNewTestHandler)}
          >
            <label className='labelFieldAboutYou'>Test's Name</label>
            <input
              className='fieldAboutYou'
              name='test_name'
              id='test_name'
              type='text'
              autoComplete='off'
              required
              ref={register}
            />

            <label className='labelFieldAboutYou'>Test's Description</label>
            <input
              className='fieldAboutYou'
              name='test_description'
              id='test_description'
              type='text'
              autoComplete='off'
              required
              ref={register}
            />

            <label className='labelFieldAboutYou mt-1'>
              Type of the Questions
            </label>
            <label className='preferences text-orange-800 dark:text-purple-800'>
              <input
                type='radio'
                className='form-radio w-4 h-4 md:w-7 md:h-7'
                name='testType'
                value='reactiongame'
                onChange={(e) => (testType.current = e.target.value)}
              />
              <span className='ml-2'>Reaction Game</span>
            </label>
            <label className='preferences text-orange-800 dark:text-purple-800 mt-2'>
              <input
                type='radio'
                className='form-radio w-4 h-4 md:w-7 md:h-7'
                name='testType'
                value='multiplechoice'
                onChange={(e) => (testType.current = e.target.value)}
              />
              <span className='ml-2'>Multiple Choice</span>
            </label>
            <label className='preferences text-orange-800 dark:text-purple-800 mt-2'>
              <input
                type='radio'
                className='form-radio w-4 h-4 md:w-7 md:h-7'
                name='testType'
                value='fillintheblank'
                onChange={(e) => (testType.current = e.target.value)}
              />
              <span className='ml-2'>Fill In The Blank</span>
            </label>

            <div className='flex items-center justify-between outline-none mt-5'>
              <button className='buttonAboutYou' type='submit'>
                Create test
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
  // RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER
  // RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER
  // RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER
  return (
    <>
      <div className='flex flex-col lg:items-baseline lg:flex-row h-auto min-h-screen w-full mt-8 mx-auto container lg:space-x-2 space-y-16 lg:space-y-0'>
        <Meta
          title='For Teacher'
          description='Leo English Quiz App for Kids | Teacher'
        />
        <div className='w-full lg:w-2/3'>
          {userInfo &&
            (userInfo.role === 'teacher' || userInfo.role === 'admin') && (
              <>
                <div className='text-center flex justify-center'>
                  <h2 className=' topHeader bg-gray-50 dark:bg-backGroundColorLight rounded-t-2xl'>
                    Your Tests |{' '}
                    <i
                      className='fas fa-redo-alt hover:text-orange-400 dark:hover:text-purple-400'
                      onClick={() => dispatch(getTests())}
                    />
                  </h2>
                </div>
                <div className='flex justify-center mx-1'>
                  <table className='table-auto w-full'>
                    <thead>
                      <tr>
                        <th className='tableHead py-3 w-3/12 rounded-tl-2xl'>
                          Test
                        </th>
                        <th className='tableHead py-3 w-4/12'>Description</th>
                        <th className='tableHead py-3 w-2/12'>Type</th>
                        <th className='tableHead py-3 w-1/12'>Active</th>
                        <th className='tableHead py-3 w-2/12 rounded-tr-2xl'></th>
                      </tr>
                    </thead>
                    <tbody>
                      {userInfo &&
                        successTestsTeacher &&
                        tests &&
                        tests.length !== 0 &&
                        tests.map((test) => {
                          if (test.teacher._id === userInfo._id)
                            return (
                              <tr key={test._id}>
                                <td className='tableCell'>{test.test_name}</td>
                                <td className='tableCell'>
                                  {test.test_description}
                                </td>
                                <td className='tableCell'>{test.type}</td>
                                <td className='tableCell'>
                                  <i
                                    className={`fas fa-${
                                      test.active
                                        ? 'check text-green-500'
                                        : 'times text-red-500'
                                    }`}
                                  />
                                </td>
                                <td className='tableCell'>
                                  <Link to={`/tests/${test._id}`}>
                                    <i className='text-xl md:text-3xl text-lightBlue-500 hover:text-lightBlue-700 fas fa-edit' />{' '}
                                  </Link>
                                  <Link to={`/tests/results/${test._id}`}>
                                    <i className='text-xl md:text-3xl text-lightBlue-500 hover:text-lightBlue-700 fas fa-poll' />
                                  </Link>
                                </td>
                              </tr>
                            );
                        })}
                      <tr>
                        <td className='tableCell rounded-bl-2xl'></td>
                        <td className='tableCell'></td>
                        <td className='tableCell'></td>
                        <td className='tableCell'></td>
                        <td className='tableCell rounded-br-2xl'></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='my-3 mx-1'>
                  {loadingTestsTeacher ? (
                    <Loader
                      loader={Math.floor(Math.random() * 10 + 1)}
                      color={Math.floor(Math.random() * 10 + 1)}
                    />
                  ) : errorTestsTeacher ? (
                    <Alert>{errorTestsTeacher}</Alert>
                  ) : (
                    successTestsTeacher &&
                    tests &&
                    tests.findIndex(
                      (test) => test.teacher._id === userInfo._id
                    ) === -1 && (
                      <Message type='info'>
                        You haven't created any test!
                      </Message>
                    )
                  )}
                </div>
              </>
            )}
          <Message type='info'>
            Teachers, only set the active status of your tests to{' '}
            <i className='fas fa-check text-green-500' /> when everything's
            ready!
            <br />
            (When the questions are complete)
          </Message>
        </div>
        {userInfo &&
          (userInfo.role === 'teacher' || userInfo.role === 'admin') && (
            <div className='px-1 w-full lg:w-1/3'>
              <div className='text-left italic shadow-md font-bold text-red-800 dark:text-purple-800 text-xl lg:text-2xl w-full bg-gray-50 dark:bg-backGroundColorLight rounded-t-2xl pl-7 pt-2'>
                Teacher's Actions <i className='fas fa-marker'></i>
              </div>
              <div className='bg-gray-50 dark:bg-backGroundColorLight pb-5 px-7 rounded-b-2xl shadow-sm'>
                <button
                  className='buttonAboutYou  sm:text-base mt-3'
                  onClick={() => setReactionModalIsOpen(true)}
                >
                  Create Reaction Game question
                </button>
                <button
                  className='buttonAboutYou  sm:text-base mt-3'
                  onClick={() => typeHandler('multiple')}
                >
                  Create Multiple Choice question
                </button>
                <button
                  className='buttonAboutYou  sm:text-base mt-3'
                  onClick={() => typeHandler('fillintheblank')}
                >
                  Create Fill in the blank question
                </button>
                <button
                  className='buttonAboutYou sm:text-base mt-3'
                  onClick={() => setNewTestModalIsOpen(true)}
                >
                  Create New Test
                </button>
                <div className='mt-3'>
                  {loadingPostQuestion || loadingPostTest ? (
                    <Loader
                      loader={Math.floor(Math.random() * 10 + 1)}
                      color={Math.floor(Math.random() * 10 + 1)}
                    />
                  ) : errorPostQuestion ? (
                    <Alert>{errorPostQuestion}</Alert>
                  ) : errorPostTest ? (
                    <Alert>{errorPostTest}</Alert>
                  ) : (
                    (successPostQuestion || successPostTest) && (
                      <Message type='success'>Cool!</Message>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
      </div>
      {reactionModal()}
      {fillintheblankModal()}
      {newTestModal()}
    </>
  );
};

export default TeacherScreen;
