import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { useSelector, useDispatch } from 'react-redux';
import { getYourStudents } from './../actions/userActions';
import { getTestResultsOfStudent } from './../actions/testResultsActions';
import Meta from './../components/Meta';
import ProfileForm from './../components/Profile/ProfileForm';
import ProfileStudent from '../components/Profile/ProfileStudent';
import ProfileTeacher from '../components/Profile/ProfileTeacher';

const ProfileScreen = ({ history }) => {
  const [animation] = useState(false);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { students } = useSelector((state) => state.getStudents);
  const { testResults } = useSelector((state) => state.getTestResultsOfStudent);

  useEffect(() => {
    if (!userInfo) history.push('/login');
    else if (!testResults && userInfo && userInfo.role === 'student') {
      dispatch(getTestResultsOfStudent());
    } else if (
      !students &&
      userInfo &&
      (userInfo.role === 'teacher' || userInfo.role === 'admin')
    ) {
      dispatch(getYourStudents());
    }
  }, [userInfo]);

  //TRANSITION
  const transition = useTransition(animation, {
    from: { opacity: 0, transform: 'translateY(-20px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
  });

  return (
    <div>
      {transition((style) => (
        <animated.div
          style={style}
          className='flex flex-col w-full h-auto min-h-screen mt-8 space-y-16 lg:items-baseline lg:flex-row sm:px-10 lg:px-7 lg:space-x-2 lg:space-y-0'
        >
          <Meta
            title='About You'
            description='Leo English Quiz App for Kids | Profile'
          />
          <div className='w-full lg:w-2/3'>
            {userInfo && userInfo.role === 'student' ? (
              <ProfileStudent />
            ) : (
              userInfo && userInfo.role === 'teacher' && <ProfileTeacher />
            )}
          </div>
          {userInfo && (
            <div className='w-full lg:w-1/3'>
              <ProfileForm />
            </div>
          )}
        </animated.div>
      ))}
    </div>
  );
};

export default ProfileScreen;
