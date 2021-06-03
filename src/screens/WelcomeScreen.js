import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { useSelector } from 'react-redux';
import Meta from './../components/Meta';
import { Link } from 'react-router-dom';

const WelcomeScreen = ({ history }) => {
  const [animation] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) history.push('/home');
  }, [userInfo]);

  //ANIMATION
  const transition = useTransition(animation, {
    from: { opacity: 0, scale: 0.97 },
    enter: { opacity: 1, scale: 1 },
  });

  return (
    <>
      <Meta
        title='Welcome'
        description='Leo Quiz | English Quiz App for Kids. A platform for kids to practice English!'
      />
      <div>
        {transition((style) => (
          <animated.div style={style} className='mx-auto h-auto mt-10'>
            <div className='mx-6 sm:mx-16 md:mx-24 flex flex-col lg:flex-row space-y-7 lg:space-y-0 lg:space-x-7'>
              <div className='w-full lg:w-1/3'>
                <h1 className='text-left bg-backGroundColorLight dark:bg-backGroundColorDark text-4xl md:text-5xl font-black  text-red-900 dark:text-purple-50'>
                  Leo Quiz | English Quiz App for Kids.
                </h1>
                <div className='flex space-x-3 mt-6 lg:mt-10'>
                  <Link
                    to='/login'
                    className='buttonAboutYouWithoutWfull w-25 text-center'
                  >
                    Sign in
                  </Link>
                  <Link
                    to='/signup'
                    className='buttonAboutYouWithoutWfull w-25 text-center'
                  >
                    Sign up
                  </Link>
                </div>
              </div>
              <div className='select-none w-full lg:w-2/3'>
                <img
                  className='object-cover w-full h-80 rounded shadow-lg '
                  src='/images/classroom.JPG'
                  alt='classroom-image'
                />
              </div>
            </div>
          </animated.div>
        ))}
      </div>
    </>
  );
};

export default WelcomeScreen;
