import React from 'react';
import { useSelector } from 'react-redux';

const TestDetails = ({ active, changable, changeActiveStatus }) => {
  const { test } = useSelector((state) => state.getTest);
  return (
    <>
      <div className='w-full pt-2 text-xl font-bold text-left text-red-800 shadow-md dark:text-purple-800 lg:text-2xl bg-gray-50 dark:bg-backGroundColorLight rounded-t-2xl px-7'>
        Test's Detail <i className='fas fa-barcode' />
      </div>
      <div className='pb-5 shadow-sm bg-gray-50 dark:bg-backGroundColorLight px-7 rounded-b-2xl'>
        <table className='w-full table-fixed'>
          <thead>
            <tr>
              <th className='w-5/12 py-3 '></th>
              <th className='w-7/12 py-3 '></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='text-left tableCell'>Name:</td>
              <td className='text-left tableCell'>
                {test.test_name[0].toUpperCase() + test.test_name.slice(1)}
              </td>
            </tr>
            <tr>
              <td className='text-left tableCell'>Description:</td>
              <td className='text-left tableCell'>
                {test.test_description[0].toUpperCase() +
                  test.test_description.slice(1)}
              </td>
            </tr>
            <tr>
              <td className='text-left tableCell'>Type:</td>
              <td className='text-left tableCell'>{test.type}</td>
            </tr>
            <tr>
              <td className='text-left tableCell'>Active:</td>
              <td className='text-left tableCell'>
                <i
                  className={`text-2xl fa-lg fas fa-${
                    active ? 'check text-green-500' : 'times text-red-500'
                  }`}
                />
                {changable && (
                  <button
                    onClick={changeActiveStatus}
                    className='px-2 py-1 mx-5 buttonAboutYouWithoutWfull'
                  >
                    <i className='fas fa-exchange-alt fa-lg' />
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TestDetails;
