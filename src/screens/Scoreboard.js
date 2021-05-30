import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './../components/Loader';
import Alert from './../components/Alert';
import Meta from './../components/Meta';
import { getScoreboard } from './../actions/userActions';

const Scoreboard = ({ history }) => {
  //redux stuffs
  const { scoreboard, loading, error } = useSelector(
    (state) => state.scoreboard
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) history.push('/login');
    else {
      if (!scoreboard) dispatch(getScoreboard());
    }
  }, [userInfo, history, dispatch]);

  return (
    <div className='flex flex-col w-full h-auto min-h-screen mx-auto container '>
      <Meta
        title='Scoreboard'
        description='Leo English Quiz App for Kids | Scoreboard'
      />
      {loading ? (
        <div className='flex flex-col w-full h-auto min-h-screen justify-center'>
          <Loader
            text='3xl'
            loader={Math.floor(Math.random() * 10 + 1)}
            color={Math.floor(Math.random() * 10 + 1)}
          />
        </div>
      ) : error ? (
        <Alert>{error}</Alert>
      ) : (
        userInfo && (
          <>
            <div className='max-w-lg md:mx-auto text-center space-x-3 md:space-x-6 lg:space-x-12 lg:max-w-xl mt-8 flex justify-center'>
              <Loader
                loader={Math.floor(Math.random() * 10 + 1)}
                color={Math.floor(Math.random() * 10 + 1)}
              />
              <h2 className=' topHeader bg-gray-50 dark:bg-backGroundColorLight rounded-t-2xl'>
                Scoreboard
              </h2>
              <Loader
                loader={Math.floor(Math.random() * 10 + 1)}
                color={Math.floor(Math.random() * 10 + 1)}
              />
            </div>
            <div className='flex justify-center mx-1'>
              <table className='table-auto w-full lg:w-10/12'>
                <thead>
                  <tr>
                    <th className='tableHead py-5 w-1/12 rounded-tl-2xl'>#</th>
                    <th className='tableHead py-5 w-2/12'>Score</th>
                    <th className='tableHead py-5 w-2/12'>Quiz Taken</th>
                    <th className='tableHead py-5 w-2/12'>Name</th>
                    <th className='tableHead py-5 w-2/12'>Class</th>
                    <th className='tableHead py-5 w-3/12 rounded-tr-2xl'>
                      Teacher's Star
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {scoreboard &&
                    scoreboard.map((user, i) => {
                      return (
                        <tr key={user._id}>
                          <td className='tableCell py-2'>
                            {i === 0 ? (
                              <i className='fas fa-hand-rock text-red-700 dark:text-teal-800 text-3xl md:text-5xl' />
                            ) : i === 1 ? (
                              <i className='fas fa-hand-rock text-red-500 dark:text-teal-600 text-2xl md:text-4xl' />
                            ) : i === 2 ? (
                              <i className='fas fa-hand-rock text-red-300 dark:text-teal-400 text-xl md:text-3xl' />
                            ) : (
                              i + 1
                            )}
                          </td>
                          <td className='tableCell py-2'>{user.score}</td>
                          <td className='tableCell py-2'>{user.quizTaken}</td>
                          <td className='tableCell py-2'>
                            {user.name[0].toUpperCase() + user.name.slice(1)}
                            {user._id === userInfo._id && (
                              <i className='pl-1 fas fa-hand-point-left'></i>
                            )}
                          </td>
                          <td className='tableCell py-2'>
                            {user.class[0].toUpperCase() + user.class.slice(1)}
                          </td>
                          <td className='tableCell py-2 '>
                            {'(' +
                              user.teacher.name[0].toUpperCase() +
                              user.teacher.name.slice(1) +
                              ')'}{' '}
                            {user.star}{' '}
                            {
                              <i className='fas fa-star text-yellow-400 dark:text-cyan-400 ' />
                            }
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
          </>
        )
      )}
    </div>
  );
};

export default Scoreboard;
