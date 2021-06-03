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
        {!window.matchMedia('(display-mode: standalone)').matches &&
        window.matchMedia('(min-width: 640px)').matches ? (
          /*nếu mà không ở standalone && media to hơn 640px thì mới có tooltip*/
          /*không thì thôi mệt*/
          <Tooltip
            title='Press to Go Home'
            position='bottom-start'
            distance='45'
            animation='perspective'
            touchHold='true'
            theme='transparent'
            unmountHTMLWhenHide='true'
            sticky='true'
            html={
              <div style={{ width: 160, fontWeight: '500', color: 'white' }}>
                Press to Go Home
              </div>
            }
          >
            <Link to={`${userInfo ? '/home' : '/'}`}>
              <h1>
                <i className='fas fa-puzzle-piece headerIcons mr-1' />
                Leo Quiz
              </h1>
            </Link>
          </Tooltip>
        ) : (
          <Link to={`${userInfo ? '/home' : '/'}`}>
            <h1>
              <i className='fas fa-puzzle-piece headerIcons mr-1' />
              Leo Quiz
            </h1>
          </Link>
        )}
      </div>

      <div className='flex p-3 md:p-4'>
        {!userInfo ? (
          <Link
            className='px-4 py-1 bg-white shadow-md rounded-full  
          text-base md:text-lg focus:outline-none font-bold 
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
