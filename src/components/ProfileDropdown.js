import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from './../actions/userActions';

const ProfileDropdown = ({ user }) => {
  const [show, setShow] = useState(false);
  const container = useRef(null);
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!container.current.contains(event.target)) {
        if (!show) return;
        setShow(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [show, container]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (!show) return;

      if (event.key === 'Escape') {
        setShow(false);
      }
    };

    document.addEventListener('keyup', handleEscape);
    return () => document.removeEventListener('keyup', handleEscape);
  }, [show]);

  const logoutHandler = () => {
    dispatch(logOut());
  };
  const changeThemeHandler = () => {
    localStorage.setItem(
      'theme',
      localStorage.theme === 'dark' ? 'light' : 'dark'
    );
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  return (
    <div ref={container} className='relative'>
      <button
        className='focus:outline-none px-3 rounded-full focus:shadow-solid text-base md:text-lg font-bold py-1 bg-white hover:bg-orange-600 text-orange-800 hover:text-white  
        dark:hover:bg-purple-700 dark:text-purple-800 dark:hover:text-white'
        onClick={() => setShow(!show)}
      >
        {user.role !== 'student' && 'Teacher'}{' '}
        {user.name[0].toUpperCase() + user.name.slice(1)}{' '}
        <i className='fas fa-caret-square-down' />
      </button>

      <Transition
        show={show}
        enter='transition ease-out duration-75 transform'
        enterFrom='opacity-0 scale-100'
        enterTo='opacity-100 scale-100'
        leave='transition ease-in duration-75 transform'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-100'
      >
        <div className='flex justify-between origin-top-right absolute right-0 w-68 md:w-44 standalone:w-44 mt-1 bg-white rounded-2xl shadow-md overflow-hidden'>
          <div className='w-2/5 bg-orange-600 dark:bg-purple-700 standalone:hidden md:hidden'>
            <div className='w-full h-full px-2 py-2 text-left text-white text-sm font-semibold'>
              Add Leo Quiz to your Home Screen right now for a better user
              experience
              <i className='fas fa-info-circle ml-1' />
            </div>
          </div>
          <div className='w-3/5 md:w-full standalone:w-full text-orange-800 dark:text-purple-800'>
            <Link to='/profile'>
              <div className='buttonInDropdown'>
                Profile <i className='fas fa-smile'></i>
              </div>
            </Link>
            {(userInfo.role === 'teacher' || userInfo.role === 'admin') && (
              <Link to='/teacher'>
                <div className='buttonInDropdown'>
                  For Teacher <i className='fas fa-chalkboard-teacher'></i>
                </div>
              </Link>
            )}
            <Link to='/scoreboard'>
              <div className='buttonInDropdown'>
                Scoreboard <i className='fas fa-star'></i>
              </div>
            </Link>
            <button
              className='buttonInDropdown w-full focus:outline-none'
              onClick={logoutHandler}
            >
              Log out <i className='fas fa-sign-out-alt' />
            </button>
            <button
              className='buttonInDropdown w-full focus:outline-none'
              onClick={changeThemeHandler}
            >
              Change Theme <i className='fas fa-adjust' />
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default ProfileDropdown;
