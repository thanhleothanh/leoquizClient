import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTest } from './../actions/testActions';
import Loader from './../components/Loader';
import Alert from './../components/Alert';
import Meta from './../components/Meta';
import { getTestResultsOfTest } from '../actions/testResultsActions';

const TeacherTestScreen = ({ history, match }) => {
  const sentRequest = useRef(false);
  const [activeStatus, setActiveStatus] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    test,
    loading: loadingGetTest,
    error: errorGetTest,
    success: successGetTest,
  } = useSelector((state) => state.getTest);
  const {
    testResults,
    loading: loadingGetTestResults,
    error: errorGetTestResults,
    success: successGetTestResults,
  } = useSelector((state) => state.getTestResultsOfTest);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) history.push('/login');
    if (userInfo.role !== 'teacher' && userInfo.role !== 'admin') {
      history.push('/home');
    }
  }, [userInfo]);

  useEffect(() => {
    if (!sentRequest.current) {
      dispatch(getTestResultsOfTest(match.params.id));
      dispatch(getTest(match.params.id));
      sentRequest.current = true;
    }
    if (successGetTest) {
      setActiveStatus(test.active);
    }
  }, [history, successGetTest]);

  //ON THE SCREEN ON THE SCREEN ON THE SCREEN ON THE SCREEN ON THE SCREEN
  //ON THE SCREEN ON THE SCREEN ON THE SCREEN ON THE SCREEN ON THE SCREEN
  //ON THE SCREEN ON THE SCREEN ON THE SCREEN ON THE SCREEN ON THE SCREEN

  const goBack = () => {
    history.push('/teacher');
  };

  return (
    <>
      <div
        className='flex flex-col md:items-baseline md:flex-row h-auto min-h-screen w-full mt-8 
                   px-1 sm:px-10 md:px-1 lg:px-7 md:space-x-2 space-y-16 md:space-y-0'
      >
        <Meta
          title='For Teacher'
          description='Leo English Quiz App for Kids | Teacher'
        />
        {loadingGetTest || loadingGetTestResults ? (
          <Loader
            loader={Math.floor(Math.random() * 10 + 1)}
            color={Math.floor(Math.random() * 10 + 1)}
          />
        ) : errorGetTest || errorGetTestResults ? (
          <Alert>{errorGetTest || errorGetTestResults}</Alert>
        ) : (
          test &&
          testResults && (
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
                            <td className='tableCell text-left'>Active:</td>
                            <td className='tableCell text-left'>
                              <i
                                className={`text-2xl md:text-3xl fas fa-${
                                  activeStatus
                                    ? 'check text-green-500'
                                    : 'times text-red-500'
                                }`}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <button
                      className='buttonAboutYou mt-3 rounded-2xl'
                      onClick={goBack}
                    >
                      Go back!
                    </button>
                  </div>
                )}
              <div className='w-full md:w-3/5 lg:w-2/3'>
                {userInfo &&
                  testResults &&
                  (userInfo.role === 'teacher' ||
                    userInfo.role === 'admin') && (
                    <>
                      <div className='text-center flex justify-center'>
                        <h2 className=' topHeader text-xl lg:text-2xl bg-gray-50 dark:bg-backGroundColorLight rounded-t-2xl'>
                          Results
                        </h2>
                      </div>
                      <div
                        className={`container mx-auto flex justify-center w-full bg-gray-100 dark:bg-backGroundColorDark`}
                      >
                        <table className='table-fixed w-full'>
                          <thead>
                            <tr>
                              <th className='py-3 w-2/12 tableHead rounded-tl-3xl'>
                                #
                              </th>
                              <th className='py-3 w-3/12  tableHead'>Class</th>
                              <th className='py-3 w-4/12  tableHead'>Name</th>
                              <th className='py-3 w-3/12  tableHead rounded-tr-3xl'>
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
                                    <td className='tableCell'>
                                      {result.user.class[0].toUpperCase() +
                                        result.user.class.slice(1)}
                                    </td>
                                    <td className='tableCell'>
                                      {result.user.name[0].toUpperCase() +
                                        result.user.name.slice(1)}
                                    </td>
                                    <td className='tableCell'>
                                      {result.score}/{test.maxScore}
                                    </td>
                                  </tr>
                                );
                              })}
                            <tr>
                              <td className=' py-2  bg-gray-50 dark:bg-backGroundColorLight rounded-bl-3xl'></td>
                              <td className=' py-2  bg-gray-50 dark:bg-backGroundColorLight '></td>
                              <td className=' py-2  bg-gray-50 dark:bg-backGroundColorLight '></td>
                              <td className=' py-2  bg-gray-50 dark:bg-backGroundColorLight rounded-br-3xl'></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
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
