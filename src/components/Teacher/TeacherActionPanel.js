import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../Loader';
import Alert from '../Alert';
import Message from '../Message';
import NewQuestionModal from './NewQuestionModal';
import NewQuestionReactionModal from './NewQuestionReactionModal';
import NewTestModal from './NewTestModal';

const TeacherActionPanel = () => {
  const type = useRef('');
  const [modalIsOpenReaction, setModalIsOpenReaction] = useState(false);
  const [modalIsOpenTest, setModalIsOpenTest] = useState(false);
  const [modalIsOpenFM, setModalIsOpenFM] = useState(false);
  const {
    success: successPostQuestion,
    loading: loadingPostQuestion,
    error: errorPostQuestion,
  } = useSelector((state) => state.postQuestion);
  const {
    loading: loadingPostTest,
    error: errorPostTest,
    success: successPostTest,
  } = useSelector((state) => state.postTest);

  // RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER
  return (
    <>
      <div className='w-full pt-2 text-xl font-bold text-left text-red-800 shadow-md dark:text-purple-800 lg:text-2xl bg-gray-50 dark:bg-backGroundColorLight rounded-t-2xl pl-7'>
        Teacher's Actions <i className='fas fa-marker'></i>
      </div>
      <div className='pb-5 shadow-sm bg-gray-50 dark:bg-backGroundColorLight px-7 rounded-b-2xl'>
        <button
          className='mt-3 buttonAboutYou sm:text-base'
          onClick={() => setModalIsOpenReaction(true)}
        >
          Create Reaction Game question
        </button>
        <button
          className='mt-3 buttonAboutYou sm:text-base'
          onClick={() => {
            type.current = 'multiple';
            setModalIsOpenFM(true);
          }}
        >
          Create Multiple Choice question
        </button>
        <button
          className='mt-3 buttonAboutYou sm:text-base'
          onClick={() => {
            type.current = 'fillintheblank';
            setModalIsOpenFM(true);
          }}
        >
          Create Fill in the blank question
        </button>
        <button
          className='mt-3 buttonAboutYou sm:text-base'
          onClick={() => setModalIsOpenTest(true)}
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
      <NewQuestionReactionModal
        isShow={modalIsOpenReaction}
        closeModal={() => setModalIsOpenReaction(false)}
      />
      <NewTestModal
        isShow={modalIsOpenTest}
        closeModal={() => setModalIsOpenTest(false)}
      />
      <NewQuestionModal
        isShow={modalIsOpenFM}
        closeModal={() => setModalIsOpenFM(false)}
        type={type.current}
      />
    </>
  );
};

export default TeacherActionPanel;
