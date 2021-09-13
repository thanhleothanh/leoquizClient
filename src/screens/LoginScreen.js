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
    from: { opacity: 0, scale: 0.99 },
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
            className='flex flex-col items-center justify-center w-full mt-10'
          >
            <div className='w-11/12 max-w-lg md:w-full'>
              <div className='w-full py-3 text-2xl font-bold text-left text-white rounded-t-2xl md:text-3xl px-7 customGradient'>
                Login <i className='fas fa-fingerprint' />
              </div>
              <form
                className='flex flex-col w-full px-8 pb-3 bg-white shadow-lg dark:bg-gray-50 rounded-b-2xl'
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
                <div className='mt-3 mb-5'>
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
                <div className='mt-3 labelFieldAboutYou'>
                  Don't have an account?{' '}
                  <Link
                    to='/signup'
                    className='underline hover:text-yellow-500 dark:hover:text-purple-400'
                  >
                    Sign up here!
                  </Link>
                </div>
              </form>
              <div className='w-full mt-6'>
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
      </div>
    </>
  );
};

export default LoginScreen;
