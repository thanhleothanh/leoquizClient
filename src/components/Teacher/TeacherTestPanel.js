import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTests } from '../../actions/testActions';
import Loader from '../Loader';
import Alert from '../Alert';
import Message from '../Message';
import { Link } from 'react-router-dom';

const TeacherTestPanel = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    tests,
    loading: loadingTestsTeacher,
    error: errorTestsTeacher,
    success: successTestsTeacher,
  } = useSelector((state) => state.tests);

  return (
    <>
      <div className='flex justify-center text-center'>
        <h2 className='text-xl topHeader lg:text-2xl bg-gray-50 dark:bg-backGroundColorLight rounded-t-2xl'>
          Your Tests <span>|</span>{' '}
          <i
            className='fas fa-redo-alt hover:text-orange-400 dark:hover:text-purple-400'
            onClick={() => dispatch(getTests())}
          />
        </h2>
      </div>
      <div className='flex justify-center mx-1'>
        <table className='w-full table-auto'>
          <thead>
            <tr>
              <th className='w-3/12 py-3 tableHead rounded-tl-2xl'>Test</th>
              <th className='w-4/12 py-3 tableHead'>Description</th>
              <th className='w-2/12 py-3 tableHead'>Type</th>
              <th className='w-1/12 py-3 tableHead'>Active</th>
              <th className='w-2/12 py-3 tableHead rounded-tr-2xl'></th>
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
                      <td className='tableCell'>{test.test_description}</td>
                      <td className='tableCell'>
                        {test.type === 'multiplechoice'
                          ? 'Multiple Choice'
                          : test.type === 'fillintheblank'
                          ? 'Fill in the blank'
                          : 'Reaction Game'}
                      </td>
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
                          <i className='text-xl md:text-3xl text-sky-500 hover:text-sky-700 fas fa-edit' />{' '}
                        </Link>
                        <Link to={`/tests/results/${test._id}`}>
                          <i className='text-xl md:text-3xl text-sky-500 hover:text-sky-700 fas fa-poll' />
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
      <div className='mx-1 my-3'>
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
          tests.findIndex((test) => test.teacher._id === userInfo._id) ===
            -1 && <Message type='info'>You haven't created any test!</Message>
        )}
      </div>
    </>
  );
};

export default TeacherTestPanel;
