import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { useDispatch, useSelector } from 'react-redux';
import Alert from './../components/Alert';
import Meta from './../components/Meta';
import Loader from './../components/Loader';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { signup } from './../actions/userActions';

const illegalChars = /^[a-z0-9_-]{5,15}$/gim; // allow letters, numbers, and underscores

const SignupScreen = ({ history }) => {
  const [animation] = useState(false);
  const { loading, error } = useSelector((state) => state.userSignup);
  const { userInfo } = useSelector((state) => state.userLogin);
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

  const signupHandler = (data) => {
    if (!loading) {
      if (!data.username.match(illegalChars)) {
        window.alert(
          'Please enter valid Username. 5-15 characters. Use only numbers, letters in alphabet and underscore (no space)'
        );
      } else if (
        data.password &&
        data.confirmPassword &&
        data.password !== data.confirmPassword
      ) {
        window.alert('Please confirm your password properly!');
      } else if (
        data.password &&
        data.confirmPassword &&
        data.password === data.confirmPassword
      ) {
        if (data.password.length < 8)
          window.alert('Password must be at least 8 characters.');
        else dispatch(signup(data.username, data.name, data.password));
      }
    }
  };

  return (
    <>
      <Meta
        title='Sign up'
        description='Leo English Quiz App for Kids | Sign up'
      />
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
                Sign up <i className='fas fa-id-card-alt' />
              </div>
              <form
                className='bg-white dark:bg-gray-50 shadow-lg rounded-b-2xl px-8 pb-3 flex flex-col w-full'
                onSubmit={handleSubmit(signupHandler)}
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
                <div className='mt-3'>
                  <label className='labelFieldAboutYou'>Name</label>
                  <input
                    className='fieldAboutYou'
                    name='name'
                    type='text'
                    ref={register}
                    required
                    placeholder='Your name'
                  />
                </div>
                <div className='mt-3'>
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
                <div className='mb-5 mt-3'>
                  <label className='labelFieldAboutYou'>Confirm Password</label>
                  <input
                    className='fieldAboutYou'
                    name='confirmPassword'
                    type='password'
                    ref={register}
                    placeholder='Confirm your password'
                    required
                  />
                </div>
                <div className='flex items-center justify-between outline-none'>
                  <button className='buttonAboutYou' type='submit'>
                    Sign up
                  </button>
                </div>
                <div className='labelFieldAboutYou mt-3'>
                  Already have an account?{' '}
                  <Link
                    to='/login'
                    className='underline hover:text-yellow-500 dark:hover:text-purple-400'
                  >
                    Sign in!
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

export default SignupScreen;
