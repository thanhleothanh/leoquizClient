import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DropdownMenu from './DropdownMenu';
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
    <nav className='fixed inset-0 z-10 flex items-end justify-between w-full shadow-sm select-none fixedHeader customGradient rounded-b-2xl'>
      <div className='p-3 text-2xl font-black text-white md:text-3xl md:p-4'>
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
                <i className='mr-1 fas fa-puzzle-piece headerIcons' />
                Leo Quiz
              </h1>
            </Link>
          </Tooltip>
        ) : (
          <Link to={`${userInfo ? '/home' : '/'}`}>
            <h1>
              <i className='mr-1 fas fa-puzzle-piece headerIcons' />
              Leo Quiz
            </h1>
          </Link>
        )}
      </div>

      <div className='flex p-3 md:p-4'>
        {!userInfo ? (
          <Link
            className='px-4 py-1 text-base font-bold text-orange-800 bg-white rounded-full shadow-md md:text-lg focus:outline-none hover:bg-orange-700 hover:text-white dark:hover:bg-purple-800 dark:text-purple-800 dark:hover:text-white'
            to='/login'
          >
            Sign in <i className='fas fa-smile animate-bounce' />
          </Link>
        ) : (
          <DropdownMenu user={userInfo} />
        )}
      </div>
    </nav>
  );
};

export default Header;
