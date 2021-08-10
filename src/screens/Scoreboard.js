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
            <div className='flex flex-col  h-auto min-h-screen w-full mt-8 sm:px-10 lg:px-24'>
              <div className='max-w-lg md:mx-auto text-center space-x-3 md:space-x-6 lg:space-x-12 flex justify-center'>
                <Loader
                  loader={Math.floor(Math.random() * 10 + 1)}
                  color={Math.floor(Math.random() * 10 + 1)}
                />
                <h2 className=' topHeader text-xl lg:text-2xl bg-gray-50 dark:bg-backGroundColorLight rounded-t-2xl'>
                  Scoreboard
                </h2>
                <Loader
                  loader={Math.floor(Math.random() * 10 + 1)}
                  color={Math.floor(Math.random() * 10 + 1)}
                />
              </div>
              <div className='flex justify-center mx-1'>
                <table className='table-auto w-full'>
                  <thead>
                    <tr>
                      <th className='tableHead py-5 w-1/12 rounded-tl-2xl'>
                        #
                      </th>
                      <th className='tableHead py-5 w-2/12'>Score</th>
                      <th className='tableHead py-5 w-2/12'>Taken</th>
                      <th className='tableHead py-5 w-2/12'>Name</th>
                      <th className='tableHead py-5 w-2/12'>Class</th>
                      <th className='tableHead py-5 w-2/12 rounded-tr-2xl'>
                        Teacher's Stars
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
                            <td className='tableCell py-2'>
                              {i === 0 ? (
                                <i className='fas fa-hand-rock text-red-700 dark:text-teal-800 text-3xl lg:text-5xl' />
                              ) : i === 1 ? (
                                <i className='fas fa-hand-rock text-red-500 dark:text-teal-600 text-2xl lg:text-4xl' />
                              ) : i === 2 ? (
                                <i className='fas fa-hand-rock text-red-300 dark:text-teal-400 text-xl lg:text-3xl' />
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
                              {user.class[0].toUpperCase() +
                                user.class.slice(1)}
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

              <div className='my-3 mx-1'>
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
