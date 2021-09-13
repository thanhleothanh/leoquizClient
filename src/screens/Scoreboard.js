import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './../components/Loader';
import Alert from './../components/Alert';
import Meta from './../components/Meta';
import { getScoreboard } from './../actions/userActions';

const Scoreboard = ({ history }) => {
  //redux stuffs
  const [animation] = useState(false);
  const { scoreboard, loading, error, success } = useSelector(
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

  //TRANSITION
  const transition = useTransition(animation, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
  });

  return (
    <div>
      <Meta
        title='Scoreboard'
        description='Leo English Quiz App for Kids | Scoreboard'
      />
      <>
        {transition((style) => (
          <animated.div style={style}>
            <div className='flex flex-col w-full h-auto min-h-screen mt-8 sm:px-10 lg:px-24'>
              <div className='flex justify-center max-w-lg space-x-3 text-center md:mx-auto md:space-x-6 lg:space-x-12'>
                <Loader
                  loader={Math.floor(Math.random() * 10 + 1)}
                  color={Math.floor(Math.random() * 10 + 1)}
                />
                <h2 className='text-xl  topHeader lg:text-2xl bg-gray-50 dark:bg-backGroundColorLight rounded-t-2xl'>
                  Scoreboard
                </h2>
                <Loader
                  loader={Math.floor(Math.random() * 10 + 1)}
                  color={Math.floor(Math.random() * 10 + 1)}
                />
              </div>
              <div className='flex justify-center mx-1'>
                <table className='w-full table-auto'>
                  <thead>
                    <tr>
                      <th className='w-1/12 py-5 tableHead rounded-tl-2xl'>
                        #
                      </th>
                      <th className='w-2/12 py-5 tableHead'>Score</th>
                      <th className='w-2/12 py-5 tableHead'>Taken</th>
                      <th className='w-3/12 py-5 tableHead'>Name</th>
                      <th className='w-2/12 py-5 tableHead md:w-3/12'>Class</th>
                      <th className='w-2/12 py-5 tableHead rounded-tr-2xl'>
                        Stars
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {userInfo &&
                      success &&
                      scoreboard &&
                      scoreboard.map((user, i) => {
                        return (
                          <tr key={user._id}>
                            <td className='py-2 tableCell'>
                              {i === 0 ? (
                                <i className='text-3xl text-red-700 fas fa-hand-rock dark:text-teal-800 lg:text-5xl' />
                              ) : i === 1 ? (
                                <i className='text-2xl text-red-500 fas fa-hand-rock dark:text-teal-600 lg:text-4xl' />
                              ) : i === 2 ? (
                                <i className='text-xl text-red-300 fas fa-hand-rock dark:text-teal-400 lg:text-3xl' />
                              ) : (
                                i + 1
                              )}
                            </td>
                            <td className='py-2 tableCell'>{user.score}</td>
                            <td className='py-2 tableCell'>{user.quizTaken}</td>
                            <td className='py-2 tableCell'>
                              {user.name[0].toUpperCase() + user.name.slice(1)}
                              {user._id === userInfo._id && (
                                <i className='pl-1 fas fa-hand-point-left'></i>
                              )}
                            </td>
                            <td className='py-2 tableCell'>
                              {user.class[0].toUpperCase() +
                                user.class.slice(1)}{' '}
                              <div className='md:inline'>
                                {'(' +
                                  user.teacher.name[0].toUpperCase() +
                                  user.teacher.name.slice(1) +
                                  ')'}
                              </div>
                            </td>
                            <td className='py-2 tableCell '>
                              {user.star}{' '}
                              {
                                <i className='text-yellow-400 fas fa-star dark:text-cyan-400 ' />
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

              <div className='mx-1 my-3'>
                {loading ? (
                  <Loader
                    loader={Math.floor(Math.random() * 10 + 1)}
                    color={Math.floor(Math.random() * 10 + 1)}
                  />
                ) : (
                  error && <Alert>{error}</Alert>
                )}
              </div>
            </div>
          </animated.div>
        ))}
      </>
    </div>
  );
};

export default Scoreboard;
