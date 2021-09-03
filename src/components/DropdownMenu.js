import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from './../actions/userActions';

const DropdownMenu = ({ user }) => {
  const [show, setShow] = useState(false);
  const container = useRef(null);
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        container &&
        container.current &&
        !container.current.contains(event.target)
      ) {
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
        className='px-3 py-1 text-base font-bold text-orange-800 bg-white rounded-full focus:outline-none focus:shadow-solid md:text-lg hover:bg-orange-600 hover:text-white dark:hover:bg-purple-700 dark:text-purple-800 dark:hover:text-white'
        onClick={() => setShow(!show)}
      >
        {user.role !== 'student' && 'Teacher'}{' '}
        {user.name[0].toUpperCase() + user.name.slice(1)}{' '}
        <i className='fas fa-caret-square-down' />
      </button>

      <div
        style={{
          display: `${show ? 'inline' : 'none'}`,
        }}
      >
        <div className='absolute right-0 flex justify-between mt-1 overflow-hidden origin-top-right bg-white shadow-md w-68 md:w-44 standalone:w-44 rounded-2xl'>
          <div className='w-2/5 bg-orange-600 dark:bg-purple-700 standalone:hidden md:hidden'>
            <div className='w-full h-full px-2 py-2 text-sm font-semibold text-left text-white'>
              Add Leo Quiz to your Home Screen for a better user experience!
              <i className='ml-1 fas fa-info-circle' />
            </div>
          </div>
          <div className='w-3/5 text-orange-800 md:w-full standalone:w-full dark:text-purple-800'>
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
              className='w-full buttonInDropdown focus:outline-none'
              onClick={logoutHandler}
            >
              Log Out <i className='fas fa-sign-out-alt' />
            </button>
            <button
              className='w-full buttonInDropdown focus:outline-none'
              onClick={changeThemeHandler}
            >
              Change Theme <i className='fas fa-lightbulb' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
