import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { useSelector, useDispatch } from 'react-redux';
import { getTests } from './../actions/testActions';
import Meta from './../components/Meta';
import TeacherTestPanel from '../components/Teacher/TeacherTestPanel';
import TeacherActionPanel from '../components/Teacher/TeacherActionPanel';

const TeacherScreen = ({ history }) => {
  const [animation] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { tests } = useSelector((state) => state.tests);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) history.push('/login');
  }, [userInfo]);

  useEffect(() => {
    if (userInfo.role !== 'teacher' && userInfo.role !== 'admin') {
      history.push('/home');
    } else {
      if (!tests) dispatch(getTests());
      dispatch({ type: 'GET_TEST_RESET' });
      dispatch({ type: 'GET_TEST_RESULTS_OF_TEST_RESET' });
    }
  }, []);

  //ANIMATION
  const transition = useTransition(animation, {
    from: { opacity: 0, scale: 0.98 },
    enter: { opacity: 1, scale: 1 },
  });

  return (
    <div>
      <Meta
        title='For Teacher'
        description='Leo English Quiz App for Kids | Teacher'
      />
      {transition((style) => (
        <animated.div style={style}>
          <div className='flex flex-col w-full h-auto min-h-screen mt-8 space-y-16 lg:items-baseline lg:flex-row sm:px-10 lg:px-7 lg:space-x-2 lg:space-y-0'>
            <div className='w-full lg:w-2/3'>
              {userInfo &&
                (userInfo.role === 'teacher' || userInfo.role === 'admin') && (
                  <TeacherTestPanel />
                )}
            </div>
            {userInfo &&
              (userInfo.role === 'teacher' || userInfo.role === 'admin') && (
                <div className='w-full px-1 lg:w-1/3'>
                  <TeacherActionPanel />
                </div>
              )}
          </div>
        </animated.div>
      ))}
    </div>
  );
};

export default TeacherScreen;
