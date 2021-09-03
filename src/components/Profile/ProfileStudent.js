import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../Loader';
import Alert from '../Alert';
import Message from '../Message';

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    testResults,
    loading: loadingGetTestResults,
    error: errorGetTestResults,
    success: successGetTestResults,
  } = useSelector((state) => state.getTestResultsOfStudent);

  return (
    <>
      <div className='flex justify-center text-center'>
        <h2 className='text-xl topHeader lg:text-2xl bg-gray-50 dark:bg-backGroundColorLight rounded-t-2xl'>
          Tests' Results
        </h2>
      </div>
      <div className='flex justify-center mx-1'>
        <table className='w-full table-auto'>
          <thead>
            <tr>
              <th className='w-1/12 py-3 tableHead rounded-tl-2xl'>#</th>
              <th className='w-2/12 py-3 tableHead'>Test</th>
              <th className='w-5/12 py-3 tableHead'>Description</th>
              <th className='w-3/12 py-3 tableHead'>By Teacher</th>
              <th className='w-1/12 py-3 tableHead rounded-tr-2xl'>Score</th>
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
  );
};

export default ProfileScreen;
