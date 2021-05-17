import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Meta from './../components/Meta';
import { Link } from 'react-router-dom';

const WelcomeScreen = ({ history }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) history.push('/home');
  }, [userInfo]);

  return (
    <div className='mx-auto h-3/4 mt-10'>
      <Meta
        title='Welcome'
        description='Leo English Quiz App for Kids. A platform for kids to practice English, or just learn some new words at the very least!'
      />
      <div className='mx-6 sm:mx-16 md:mx-24 lg:mx-44'>
        <div className='pb-7 '>
          <h1 className='text-left bg-backGroundColorLight dark:bg-backGroundColorDark text-4xl md:text-5xl font-black  text-red-800 dark:text-purple-50 mb-6'>
            Leo Quiz | English Quiz App for Kids.
          </h1>

          <h4 className=' text-left bg-backGroundColorLight dark:bg-backGroundColorDark text-base sm:text-lg lg:text-xl font-bold  text-red-700 dark:text-purple-50'>
            <Link
              className='underline hover:text-yellow-500 dark:hover:text-purple-500'
              to='/login'
            >
              Sign in
            </Link>{' '}
            to continue!
          </h4>
          <h4 className=' text-left bg-backGroundColorLight dark:bg-backGroundColorDark text-base sm:text-lg lg:text-xl font-bold  text-red-700 dark:text-purple-50 mt-1'>
            Or{' '}
            <Link
              className='underline hover:text-yellow-500 dark:hover:text-purple-500'
              to='/signup'
            >
              Sign up here!
            </Link>
          </h4>
        </div>
        <div className='mb-4 select-none'>
          <img
            className='object-cover w-full h-72 rounded shadow-lg sm:h-72 md:h-72 lg:h-80'
            src='/images/classroom.JPG'
            alt='classroom-image'
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
