import React from 'react';

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
    <footer className='p-6 mt-20 font-medium text-center text-yellow-900 select-none dark:text-purple-100'>
      <div className='text-xs sm:text-sm lg:text-base'>
        Copyright &copy; Leo Quiz{' '}
        <i className='fas fa-lightbulb' onClick={changeThemeHandler} />
      </div>
    </footer>
  );
};

export default Footer;
