import React, { useEffect } from 'react';

const Footer = () => {
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
    <footer className='text-center font-medium p-6 mt-20 select-none text-yellow-900 dark:text-purple-100'>
      <div className='text-xs sm:text-sm lg:text-base'>
        Copyright &copy; Leo Quiz{' '}
        <i className='fas fa-lightbulb' onClick={changeThemeHandler} />
      </div>
    </footer>
  );
};

export default Footer;
