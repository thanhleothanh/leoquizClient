import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTest, updateTest } from './../actions/testActions';
import Loader from './../components/Loader';
import Alert from './../components/Alert';
import Message from './../components/Message';
import Meta from './../components/Meta';
import AnswersTable from '../components/AnswersTable';
import NewTestQuestionReactionModal from '../components/Test/NewTestQuestionReactionModal';
import NewTestQuestionModal from '../components/Test/NewTestQuestionModal';
import DeleteTestQuestion from '../components/Test/DeleteTestQuestion';
import TestDetails from '../components/Test/TestDetails';

const TeacherTestScreen = ({ history, match }) => {
  const [questions, setQuestions] = useState([]);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [activeStatus, setActiveStatus] = useState(false);
  const [changed, setChanged] = useState(false);

  const sentRequest = useRef(false);
  const [questionModalIsOpen, setQuestionModalIsOpen] = useState(false);
  const [reactionQuestionModalIsOpen, setReactionQuestionModalIsOpen] =
    useState(false);
  const [deleteQuestionModalIsOpen, setDeleteQuestionModalIsOpen] =
    useState(false);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    test,
    loading: loadingGetTest,
    error: errorGetTest,
    success: successGetTest,
  } = useSelector((state) => state.getTest);

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
  }, [successGetTest]);

  const addQuestion = () => {
    if (test.type === 'reactiongame') setReactionQuestionModalIsOpen(true);
    else setQuestionModalIsOpen(true);
  };

  const changeActiveStatus = () => {
    if (
      window.confirm(
        'Are you sure to change the active status of this test! Please check everything again and make sure the test is ready!'
      )
    ) {
      setChanged(true);
      setActiveStatus(!activeStatus);
    }
  };

  const updateTestQuestions = () => {
    if (changed)
      dispatch(updateTest(match.params.id, [...questions], activeStatus));
    setSendingRequest(true);
    setTimeout(() => history.push('/teacher'), 1000);
  };

  return (
    <>
      <Meta
        title='For Teacher'
        description='Leo English Quiz App for Kids | Teacher'
      />
      <div className='flex flex-col w-full h-auto min-h-screen px-1 mt-8 space-y-16 md:items-baseline md:flex-row sm:px-10 md:px-1 lg:px-7 md:space-x-2 md:space-y-0'>
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
                    <TestDetails
                      active={activeStatus}
                      changable={true}
                      changeActiveStatus={changeActiveStatus}
                    />
                    <Message className='mt-3' type='info'>
                      Teachers, only set the active status <br /> to{' '}
                      <i className='text-green-500 fas fa-check' /> when
                      everything's ready!
                    </Message>
                    <button
                      className='mt-3 buttonAboutYou rounded-2xl'
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
                      <div className='flex justify-center text-center'>
                        <h2 className='text-xl topHeader lg:text-2xl bg-gray-50 dark:bg-backGroundColorLight rounded-t-2xl'>
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
                      <NewTestQuestionReactionModal
                        isShow={reactionQuestionModalIsOpen}
                        closeModal={() => setReactionQuestionModalIsOpen(false)}
                        questions={questions}
                        setQuestions={setQuestions}
                        setChanged={setChanged}
                      />
                      <NewTestQuestionModal
                        isShow={questionModalIsOpen}
                        closeModal={() => setQuestionModalIsOpen(false)}
                        questions={questions}
                        setQuestions={setQuestions}
                        setChanged={setChanged}
                      />
                      <DeleteTestQuestion
                        isShow={deleteQuestionModalIsOpen}
                        closeModal={() => setDeleteQuestionModalIsOpen(false)}
                        questions={questions}
                        setQuestions={setQuestions}
                        setChanged={setChanged}
                      />
                    </>
                  )}
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default TeacherTestScreen;
