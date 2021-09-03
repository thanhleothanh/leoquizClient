import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTest } from './../actions/testActions';
import Loader from './../components/Loader';
import Alert from './../components/Alert';
import Meta from './../components/Meta';
import { getTestResultsOfTest } from '../actions/testResultsActions';
import TestDetails from '../components/Test/TestDetails';
import TestResultsTable from '../components/Test/TestResultsTable';

const TeacherTestResult = ({ history, match }) => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (!userInfo) history.push('/login');
    else if (userInfo.role !== 'teacher' && userInfo.role !== 'admin')
      history.push('/home');
    else {
      dispatch(getTestResultsOfTest(match.params.id));
      dispatch(getTest(match.params.id));
    }
  }, [userInfo]);

  const goBack = () => {
    history.push('/teacher');
  };

  return (
    <>
      <div className='flex flex-col w-full h-auto min-h-screen px-1 mt-8 space-y-16 md:items-baseline md:flex-row sm:px-10 md:px-1 lg:px-7 md:space-x-2 md:space-y-0'>
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
          userInfo &&
          (userInfo.role === 'teacher' || userInfo.role === 'admin') &&
          successGetTest &&
          successGetTestResults && (
            <>
              {test && (
                <div className='w-full md:w-2/5 lg:w-1/3'>
                  <TestDetails active={test.active} changable={false} />
                  <button
                    className='mt-3 buttonAboutYou rounded-2xl'
                    onClick={goBack}
                  >
                    Go back!
                  </button>
                </div>
              )}
              <div className='w-full md:w-3/5 lg:w-2/3'>
                {testResults && <TestResultsTable />}
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};
export default TeacherTestResult;
