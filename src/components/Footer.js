import React from 'react';

const Footer = () => {
  return (
    <footer className='text-center font-medium p-6 mt-20 select-none text-yellow-900 dark:text-purple-100'>
      <div className='text-xs sm:text-sm lg:text-base'>
        Copyright &copy; Leo Quiz
      </div>
      <div style={{ fontSize: '0.5rem' }}>Teacher Leo made this!</div>
    </footer>
  );
};

export default Footer;
