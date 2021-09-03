import React from 'react';
import { useSelector } from 'react-redux';

const TestResultsTable = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { test } = useSelector((state) => state.getTest);
  const { testResults, success: successGetTestResults } = useSelector(
    (state) => state.getTestResultsOfTest
  );

  return (
    <>
      <div className='flex justify-center text-center'>
        <h2 className='text-xl topHeader lg:text-2xl bg-gray-50 dark:bg-backGroundColorLight rounded-t-2xl'>
          Results
        </h2>
      </div>
      <div
        className={`container mx-auto flex justify-center w-full bg-gray-100 dark:bg-backGroundColorDark`}
      >
        <table className='w-full table-fixed'>
          <thead>
            <tr>
              <th className='w-2/12 py-3 tableHead rounded-tl-3xl'>#</th>
              <th className='w-3/12 py-3 tableHead'>Class</th>
              <th className='w-4/12 py-3 tableHead'>Name</th>
              <th className='w-3/12 py-3 tableHead rounded-tr-3xl'>Score</th>
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
                      {result.user &&
                        result.user.class[0].toUpperCase() +
                          result.user.class.slice(1)}
                    </td>
                    <td className='tableCell'>
                      {result.user &&
                        result.user.name[0].toUpperCase() +
                          result.user.name.slice(1)}
                    </td>
                    <td className='tableCell'>
                      {result.score}/{test.maxScore}
                    </td>
                  </tr>
                );
              })}
            <tr>
              <td className='py-2 bg-gray-50 dark:bg-backGroundColorLight rounded-bl-3xl'></td>
              <td className='py-2 bg-gray-50 dark:bg-backGroundColorLight'></td>
              <td className='py-2 bg-gray-50 dark:bg-backGroundColorLight'></td>
              <td className='py-2 bg-gray-50 dark:bg-backGroundColorLight rounded-br-3xl'></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TestResultsTable;
