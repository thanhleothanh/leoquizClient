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
      <div className='mx-auto sm:text-center md:mx-auto lg:max-w-4xl'>
        <div className='max-w-lg pb-7 md:mx-auto text-center lg:max-w-xl '>
          <h2 className='text-center bg-backGroundColorLight dark:bg-backGroundColorDark text-xl lg:text-2xl italic font-sans font-bold  text-red-900 dark:text-purple-50 shadow-md rounded-t-lg py-2 '>
            Please{' '}
            <Link
              className='underline hover:text-yellow-500 dark:hover:text-purple-500'
              to='/login'
            >
              sign in
            </Link>{' '}
            to continue!
          </h2>
          <h2 className='text-center bg-backGroundColorLight dark:bg-backGroundColorDark text-xl lg:text-2xl italic font-sans font-bold  text-red-900 dark:text-purple-50 shadow-md rounded-b-lg py-2 '>
            Don't have an account yet?{' '}
            <Link
              className='underline hover:text-yellow-500 dark:hover:text-purple-500'
              to='/signup'
            >
              Sign up here
            </Link>
          </h2>
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
