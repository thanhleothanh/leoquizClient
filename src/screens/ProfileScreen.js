import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getScoreboard, updateStar } from './../actions/userActions';
import { getTestResultsOfStudent } from './../actions/testResultsActions';
import Loader from './../components/Loader';
import Alert from './../components/Alert';
import Meta from './../components/Meta';
import Message from './../components/Message';
import ProfileForm from './../components/ProfileForm';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';

const ProfileScreen = ({ history }) => {
  //MODAL STATE
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [Class, setClass] = useState('');
  const [star, setStar] = useState(0);

  //redux
  const { register, handleSubmit } = useForm(); // initialize the hook
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    scoreboard,
    loading: loadingScoreboard,
    error: errorScoreboard,
    success: successScoreboard,
  } = useSelector((state) => state.scoreboard);
  const {
    testResults,
    loading: loadingGetTestResults,
    error: errorGetTestResults,
    success: successGetTestResults,
  } = useSelector((state) => state.getTestResultsOfStudent);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) history.push('/login?redirect=profile');
    else if (!testResults && userInfo && userInfo.role === 'student') {
      dispatch(getTestResultsOfStudent());
    } else if (
      !scoreboard &&
      (userInfo.role === 'teacher' || userInfo.role === 'admin')
    ) {
      dispatch(getScoreboard());
    }
  }, [userInfo, history, dispatch]);

  /////////// MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL
  /////////// MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL
  /////////// MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const updateHandler = (userId) => {
    const user = scoreboard.find((e) => e._id === userId);
    setUserId(userId);
    setName(user.name);
    setClass(user.class);
    setStar(user.star);
    openModal();
  };

  const actualUpdateHandler = (data) => {
    if (window.confirm(`Are you sure to update ${name}?`)) {
      dispatch(updateStar({ star: data.star }, userId));
      document.getElementById(`star-${userId}`).innerHTML = data.star;
      setStar(0);
      closeModal();
    }
  };
  const modal = () => {
    return (
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
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
          contentLabel='Example Modal'
          className=''
        >
          <div className='text-left font-bold text-red-800 dark:text-purple-800 text-xl lg:text-2xl py-3'>
            Update Student
          </div>
          <form
            className='bg-white rounded-b-2xl pt-4 pb-8  flex flex-col w-full'
            onSubmit={handleSubmit(actualUpdateHandler)}
          >
            <label className='labelFieldAboutYou'>Name</label>
            <input
              className='fieldAboutYou'
              name='name'
              type='text'
              autoComplete='off'
              placeholder={`Student's name`}
              defaultValue={name}
              readOnly
              disabled
            />
            <label className='labelFieldAboutYou'>Class</label>
            <input
              className='fieldAboutYou'
              name='class'
              type='text'
              autoComplete='off'
              placeholder={`Student's class`}
              defaultValue={Class}
              readOnly
              disabled
            />
            <label className='labelFieldAboutYou'>Star</label>
            <input
              className='fieldAboutYou'
              name='star'
              name='star'
              type='number'
              placeholder='Star'
              ref={register}
              defaultValue={star}
            />
            <div className='flex items-center justify-between outline-none mt-5'>
              <button className='buttonAboutYou' type='submit'>
                Update
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
  // RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER
  // RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER
  // RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER
  // RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER
  // RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER
  // RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER RENDER
  return (
    <div className='flex flex-col lg:items-baseline lg:flex-row h-auto min-h-screen w-full mt-8 mx-auto container lg:space-x-2 space-y-16 lg:space-y-0'>
      <Meta
        title='About You'
        description='Leo English Quiz App for Kids | Profile'
      />
      <div className='w-full lg:w-2/3'>
        {/* Student's Taken Test Section Student's Taken Test Section Student's Taken Test Section */}
        {/* Student's Taken Test Section Student's Taken Test Section Student's Taken Test Section */}
        {userInfo && userInfo.role === 'student' ? (
          <>
            <div className='text-center flex justify-center'>
              <h2 className=' topHeader bg-gray-50 dark:bg-backGroundColorLight rounded-t-2xl'>
                Tests' Results
              </h2>
            </div>
            <div className='flex justify-center mx-1'>
              <table className='table-auto w-full'>
                <thead>
                  <tr>
                    <th className='tableHead py-3 w-1/12 rounded-tl-2xl'>#</th>
                    <th className='tableHead py-3 w-2/12'>Test</th>
                    <th className='tableHead py-3 w-5/12'>Description</th>
                    <th className='tableHead py-3 w-3/12'>By Teacher</th>
                    <th className='tableHead py-3 w-1/12 rounded-tr-2xl'>
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userInfo &&
                    successGetTestResults &&
                    testResults &&
                    testResults.length !== 0 &&
                    testResults.map((result, i) => {
                      return (
                        <tr key={result._id}>
                          <td className='tableCell'>{i + 1}</td>
                          <td className='tableCell'>{result.test.test_name}</td>
                          <td className='tableCell'>
                            {result.test.test_description}
                          </td>
                          <td className='tableCell'>
                            {result.test.teacher.name[0].toUpperCase() +
                              result.test.teacher.name.slice(1)}
                          </td>
                          <td className='tableCell'>
                            {result.score}/{result.test.maxScore}
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
            <div className='mt-3'>
              {loadingGetTestResults ? (
                <Loader
                  loader={Math.floor(Math.random() * 10 + 1)}
                  color={Math.floor(Math.random() * 10 + 1)}
                />
              ) : errorGetTestResults ? (
                <Alert>{errorGetTestResults}</Alert>
              ) : (
                successGetTestResults &&
                testResults &&
                testResults.length === 0 && (
                  <Message type='info'>You haven't taken any test</Message>
                )
              )}
            </div>
          </>
        ) : (
          // {/* Teacher's Section Teacher's Section Teacher's Teacher's Section Teacher's Section*/}
          // {/* Teacher's Section Teacher's Section Teacher's Teacher's Section Teacher's Section*/}
          <>
            <div className='text-center flex justify-center mx-5'>
              <h2 className=' topHeader bg-gray-50 dark:bg-backGroundColorLight rounded-t-2xl'>
                Your Students (Teacher{' '}
                {userInfo &&
                  userInfo.name[0].toUpperCase() +
                    userInfo.name.slice(1).toLowerCase()}
                )
              </h2>
            </div>
            <div className='flex justify-center mx-1'>
              <table className='table-auto w-full'>
                <thead>
                  <tr>
                    <th className='tableHead py-5 w-1/12 rounded-tl-2xl'>#</th>
                    <th className='tableHead py-5 w-1/12 '>Score</th>
                    <th className='tableHead py-5 w-2/12 md:w-3/12 '>
                      Quiz Taken
                    </th>
                    <th className='tableHead py-5 w-2/12 '>Name</th>
                    <th className='tableHead py-5 w-2/12 '>Class</th>
                    <th className='tableHead py-5 w-4/12 md:w-3/12  rounded-tr-2xl'>
                      Teacher's Star
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userInfo &&
                    successScoreboard &&
                    scoreboard &&
                    scoreboard.length !== 0 &&
                    scoreboard.map((user, i) => {
                      if (user.teacher._id === userInfo._id)
                        return (
                          <tr key={user._id}>
                            <td className='tableCell'>{i + 1}</td>
                            <td className='tableCell'>{user.score}</td>
                            <td className='tableCell'>{user.quizTaken}</td>
                            <td className='tableCell'>
                              {user.name[0].toUpperCase() + user.name.slice(1)}
                            </td>
                            <td className='tableCell'>
                              {user.class[0].toUpperCase() +
                                user.class.slice(1)}
                            </td>
                            <td className='tableCell flex justify-center '>
                              <div className='mx-1' id={`star-${user._id}`}>
                                {user.star}{' '}
                              </div>
                              <i className='fas fa-star text-yellow-400 dark:text-cyan-400' />
                              <i
                                className='fas fa-highlighter ml-1 lg:ml-2 text-xl lg:text-2xl 
                                 text-orange-600 hover:text-orange-800 
                                 dark:text-purple-600 dark:hover:text-purple-800'
                                onClick={() => updateHandler(user._id)}
                              />
                            </td>
                          </tr>
                        );
                    })}
                  <tr>
                    <td className='tableCell rounded-bl-2xl'></td>
                    <td className='tableCell'></td>
                    <td className='tableCell'></td>
                    <td className='tableCell'></td>
                    <td className='tableCell'></td>
                    <td className='tableCell rounded-br-2xl'></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='mt-3'>
              {loadingScoreboard ? (
                <Loader
                  loader={Math.floor(Math.random() * 10 + 1)}
                  color={Math.floor(Math.random() * 10 + 1)}
                />
              ) : errorScoreboard ? (
                <Alert>{errorScoreboard}</Alert>
              ) : userInfo &&
                successScoreboard &&
                scoreboard &&
                scoreboard.findIndex(
                  (student) => student.teacher._id === userInfo._id
                ) === -1 ? (
                <Message type='info'>You don't have any student</Message>
              ) : (
                ''
              )}
            </div>
            {modal()}
          </>
        )}
      </div>
      {/* About you section About you section About you section About you section About you section*/}
      {/* About you section About you section About you section About you section About you section*/}
      {/* About you section About you section About you section About you section About you section*/}
      {userInfo && (
        <div className='w-full lg:w-1/3'>
          <ProfileForm />
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
