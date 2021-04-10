import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTests } from './../actions/testActions';
import { postQuestion } from './../actions/questionActions';
import Loader from './../components/Loader';
import Alert from './../components/Alert';
import Meta from './../components/Meta';
import Message from './../components/Message';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';

const TeacherScreen = ({ history }) => {
  //modal state
  const [type, setType] = useState(false);
  const [reactionModalIsOpen, setReactionModalIsOpen] = useState(false);
  const [fillintheblankModalIsOpen, setFillintheblankModalIsOpen] = useState(
    false
  );

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

  const { register, handleSubmit } = useForm(); // initialize the hook
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) history.push('/login');
  }, [userInfo]);

  useEffect(() => {
    if (userInfo.role !== 'teacher' && userInfo.role !== 'admin') {
      history.push('/home');
    }
    // else {
    //   if (!tests) dispatch(getTests());
    // }
  }, [history, dispatch]);

  //modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal
  //modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal
  //modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal
  //modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal
  //modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal
  //modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal
  //modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal
  //modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal
  //modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal
  //modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal
  //modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal
  //modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal
  //modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal
  //modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal modal
  const closeModal = () => {
    setReactionModalIsOpen(false);
    setFillintheblankModalIsOpen(false);
  };
  // REACTION MODAL REACTION MODAL REACTION MODAL REACTION MODAL REACTION MODAL REACTION MODAL REACTION MODAL
  // REACTION MODAL REACTION MODAL REACTION MODAL REACTION MODAL REACTION MODAL REACTION MODAL REACTION MODAL
  // REACTION MODAL REACTION MODAL REACTION MODAL REACTION MODAL REACTION MODAL REACTION MODAL REACTION MODAL
  const postReactionHandler = (data) => {
    if (
      window.confirm(
        `Are you sure to post this question, check the information again please?`
      )
    ) {
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
              placeholder='Question'
              required
              ref={register}
            />

            <label className='labelFieldAboutYou'>Correct answer</label>
            <input
              className='fieldAboutYou '
              name='correct_answer'
              type='text'
              required
              placeholder='Correct answer of the question'
              ref={register}
            />
            <label className='labelFieldAboutYou'>Incorrect answer</label>
            <input
              className='fieldAboutYou '
              name='incorrect_answer'
              type='text'
              placeholder='Wrong answer'
              required
              ref={register}
            />
            <div className='flex items-center justify-between outline-none mt-5'>
              <button className='buttonAboutYou' type='submit'>
                Create question (Check everything again please)
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
  // FILLINTHEBLANK MODAL FILLINTHEBLANK MODAL FILLINTHEBLANK MODAL FILLINTHEBLANK MODAL FILLINTHEBLANK MODAL
  // FILLINTHEBLANK MODAL FILLINTHEBLANK MODAL FILLINTHEBLANK MODAL FILLINTHEBLANK MODAL FILLINTHEBLANK MODAL
  // FILLINTHEBLANK MODAL FILLINTHEBLANK MODAL FILLINTHEBLANK MODAL FILLINTHEBLANK MODAL FILLINTHEBLANK MODAL
  const typeHandler = (type) => {
    setType(type);
    setFillintheblankModalIsOpen(true);
  };

  const postFillinblankHandler = (data) => {
    if (
      window.confirm(
        `Are you sure to post this question, check the information again please?`
      )
    ) {
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
          type: type,
        })
      );
      setType('');
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
            },
          }}
          contentLabel='New reaction question'
        >
          <div className='text-left font-bold text-red-900 dark:text-purple-800 text-xl lg:text-2xl py-3'>
            Create new{' '}
            {type === 'multiple' ? 'Multiple Choice' : 'Fill in the blank'}{' '}
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
              placeholder='Question'
              ref={register}
            />

            <label className='labelFieldAboutYou'>
              Question's Image (Google images' URL only),
            </label>
            <input
              className='fieldAboutYou'
              name='question_image'
              id='question_image'
              type='text'
              autoComplete='off'
              ref={register}
              placeholder='Image for the question (NOT REQUIRED)'
            />

            <label className='labelFieldAboutYou mt-1'>CORRECT ANSWER</label>
            <input
              className='fieldAboutYou '
              name='correct_answer'
              id='correct_answer'
              type='text'
              required
              placeholder='Correct answer of the question'
              ref={register}
            />

            <label className='labelFieldAboutYou'>Incorrect answer 1</label>
            <input
              className='fieldAboutYou '
              name='incorrect_answer1'
              id='incorrect_answer1'
              type='text'
              placeholder='Wrong answer 1'
              required
              ref={register}
            />
            <label className='labelFieldAboutYou'>Incorrect answer 2</label>
            <input
              className='fieldAboutYou '
              name='incorrect_answer2'
              id='incorrect_answer2'
              type='text'
              placeholder='Wrong answer 2'
              required
              ref={register}
            />
            <label className='labelFieldAboutYou'>Incorrect answer 3</label>
            <input
              className='fieldAboutYou '
              name='incorrect_answer3'
              id='incorrect_answer3'
              type='text'
              placeholder='Wrong answer 3'
              required
              ref={register}
            />
            <div className='flex items-center justify-between outline-none mt-5'>
              <button className='buttonAboutYou' type='submit'>
                Create question (Check everything again please)
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
  // RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER
  // RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER
  // RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER
  return (
    <>
      <div className='flex flex-col md:items-baseline md:flex-row h-auto min-h-screen w-full mt-7 mx-auto container md:space-x-2 space-y-16 md:space-y-0'>
        <Meta
          title='For Teacher'
          description='Leo English Quiz App for Kids | Teacher'
        />
        <div className='w-full md:w-3/5 lg:w-2/3'>
          {userInfo &&
            (userInfo.role === 'teacher' || userInfo.role === 'admin') && (
              <>
                <div className='text-center flex justify-center'>
                  <h2 className=' topHeader bg-gray-50 dark:bg-backGroundColorLight rounded-t-2xl'>
                    Your Test
                  </h2>
                </div>
                <div className='flex justify-center mx-1'>
                  <table className='table-auto w-full'>
                    <thead>
                      <tr>
                        <th className='tableHead py-3 w-2/12 rounded-tl-2xl'>
                          Test
                        </th>
                        <th className='tableHead py-3 w-4/12'>Description</th>
                        <th className='tableHead py-3 w-2/12'>Type</th>
                        <th className='tableHead py-3 w-1/12'>Active</th>
                        <th className='tableHead py-3 w-3/12 rounded-tr-2xl'>
                          Questions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
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
                <div className='mt-3 mx-1'>
                  {loadingTestsTeacher ? (
                    <Loader
                      loader={Math.floor(Math.random() * 10 + 1)}
                      color={Math.floor(Math.random() * 10 + 1)}
                    />
                  ) : errorTestsTeacher ? (
                    <Alert>{errorTestsTeacher}</Alert>
                  ) : successTestsTeacher && tests && tests.length === 0 ? (
                    <Message type='info'>
                      You haven't created any test! Don't worry, I'm working on
                      it
                    </Message>
                  ) : (
                    <Message type='info'>
                      You haven't created any test! Don't worry, I'm working on
                      it
                    </Message>
                  )}
                </div>
              </>
            )}
        </div>
        {userInfo &&
          (userInfo.role === 'teacher' || userInfo.role === 'admin') && (
            <div className='px-1 w-full md:w-2/5 lg:w-1/3'>
              <div className='text-left italic shadow-md font-bold text-red-800 dark:text-purple-800 text-xl lg:text-2xl w-full bg-gray-50 dark:bg-backGroundColorLight rounded-t-2xl pl-7 pt-2'>
                Teacher's Actions <i className='fas fa-marker'></i>
              </div>
              <div className='bg-gray-50 dark:bg-backGroundColorLight pb-7 px-7 rounded-b-2xl shadow-sm'>
                <button
                  className='buttonAboutYou  sm:text-base mt-3'
                  type='submit'
                  onClick={() => setReactionModalIsOpen(true)}
                >
                  Create Reaction Game question
                </button>
                <button
                  className='buttonAboutYou  sm:text-base mt-3'
                  type='submit'
                  onClick={() => typeHandler('multiple')}
                >
                  Create Multiple Choice question
                </button>
                <button
                  className='buttonAboutYou  sm:text-base mt-3'
                  type='submit'
                  onClick={() => typeHandler('fillintheblank')}
                >
                  Create Fill in the blank question
                </button>
                <button
                  className='buttonAboutYou sm:text-base opacity-50 mt-3'
                  type='submit'
                  disabled
                >
                  Create New Test
                </button>
                <div className='mt-3'>
                  {loadingPostQuestion ? (
                    <Loader
                      loader={Math.floor(Math.random() * 10 + 1)}
                      color={Math.floor(Math.random() * 10 + 1)}
                    />
                  ) : errorPostQuestion ? (
                    <Alert>{errorPostQuestion}</Alert>
                  ) : (
                    successPostQuestion && (
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
      {/* <Message type='info'>
        Teachers cần phải cẩn thận khi post Fill in the blank Question, cách
        hoạt động của hệ thống check đáp án là kiểm tra đáp áp được nhập vào với
        đáp án trong hệ thống, trùng 100% thì mới chấp nhận. Ví dụ: đáp án của
        câu hỏi 'This is a...' là 'cat', nếu học sinh nhập 'a cat' hoặc 'the
        cat' thì sẽ không được hệ thống chấp nhận. Teachers hãy đặt câu hỏi sao
        cho không khiến học sinh hiểu nhầm và nhập thừa. Ví dụ 1 câu hỏi gây học
        sinh hiểu nhầm: 'This is...' với bức ảnh mèo bên cạnh, học sinh có thể
        trả lời 'a cat' 'the cat'!
      </Message> */}
    </>
  );
};

export default TeacherScreen;
