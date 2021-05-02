import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileDropdown from './ProfileDropdown';
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';

const Header = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  return (
    <header
      className='fixed inset-0 z-10 w-full fixedHeader
      select-none customGradient flex justify-between items-end shadow-sm rounded-b-2xl'
    >
      <div className='font-black text-2xl md:text-3xl text-white p-3 md:p-4'>
        <Tooltip
          title='Press to Go Home'
          position='bottom'
          distance='45'
          animation='perspective'
          theme={
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
              window.matchMedia('(prefers-color-scheme: dark)').matches)
              ? 'light'
              : 'dark'
          }
          hideOnClick='false'
          offset='100'
          animateFill='false'
        >
          <Link to={`${userInfo ? '/home' : '/'}`}>
            <h1>
              <i className='fas fa-puzzle-piece headerIcons mr-1' />
              Leo Quiz
            </h1>
          </Link>
        </Tooltip>
      </div>

      <div className='flex p-3 md:p-4'>
        {!userInfo ? (
          <Link
            className='px-3 py-1 bg-white shadow-md rounded-full  
          text-base sm:text-lg md:text-xl focus:outline-none font-bold 
          hover:bg-orange-700 text-orange-800 hover:text-white 
          dark:hover:bg-purple-800 dark:text-purple-800 dark:hover:text-white'
            to='/login'
          >
            Sign in <i className='fas fa-smile animate-bounce' />
          </Link>
        ) : (
          <ProfileDropdown user={userInfo} />
        )}
      </div>
    </header>
  );
};

export default Header;
