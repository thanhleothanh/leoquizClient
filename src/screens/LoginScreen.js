import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './../actions/userActions';
import Alert from './../components/Alert';
import Meta from './../components/Meta';
import Loader from './../components/Loader';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const LoginScreen = ({ history }) => {
  const [animation] = useState(false);
  const { userInfo, loading, error } = useSelector((state) => state.userLogin);
  const { register, handleSubmit } = useForm(); // initialize the hook

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) history.push('/home');
  }, [userInfo, history]);

  //ANIMATION
  const transition = useTransition(animation, {
    from: { opacity: 0, scale: 0.97 },
    enter: { opacity: 1, scale: 1 },
  });

  const loginHandler = (data) => {
    if (!loading) {
      dispatch(login(data.username, data.password));
    }
  };

  return (
    <>
      <Meta title='Login' description='Leo English Quiz App for Kids | Login' />
      <div>
        {transition((style) => (
          <animated.div
            style={style}
            className='w-full flex flex-col items-center justify-center mt-10'
          >
            <div className='w-11/12 md:w-full max-w-lg'>
              <div className='w-full pb-6'>
                {loading ? (
                  <Loader
                    loader={Math.floor(Math.random() * 10 + 1)}
                    color={Math.floor(Math.random() * 10 + 1)}
                  />
                ) : (
                  error && <Alert>{error}</Alert>
                )}
              </div>
              <div className='text-left rounded-t-2xl  font-bold text-white text-2xl md:text-3xl w-full px-7 py-3 customGradient'>
                Login <i className='fas fa-fingerprint' />
              </div>
              <form
                className='bg-white dark:bg-backGroundColorLight shadow-lg rounded-b-2xl px-8 pb-3 flex flex-col w-full'
                onSubmit={handleSubmit(loginHandler)}
                id='loginForm'
              >
                <div className='mt-3'>
                  <label className='labelFieldAboutYou'>Username</label>
                  <input
                    className='fieldAboutYou'
                    name='username'
                    type='text'
                    ref={register}
                    required
                    placeholder='Your username'
                  />
                </div>
                <div className='mb-5 mt-3'>
                  <label className='labelFieldAboutYou'>Password</label>
                  <input
                    className='fieldAboutYou'
                    name='password'
                    type='password'
                    ref={register}
                    placeholder='Your password'
                    required
                  />
                </div>
                <div className='flex items-center justify-between outline-none'>
                  <button className='buttonAboutYou' type='submit'>
                    Sign In
                  </button>
                </div>
                <div className='labelFieldAboutYou mt-3'>
                  Don't have an account?{' '}
                  <Link
                    to='/signup'
                    className='underline hover:text-yellow-500 dark:hover:text-purple-400'
                  >
                    Sign up here!
                  </Link>
                </div>
              </form>
            </div>
          </animated.div>
        ))}
      </div>
    </>
  );
};

export default LoginScreen;
