import React from 'react';

const Alert = ({ children, className }) => {
  return (
    <div
      className={`${className} bg-red-100 font-medium text-base md:text-lg border-4 border-red-400 text-red-800 px-6 py-3 rounded-xl text-center`}
      role='alert'
    >
      <strong className='font-bold'>Oh no! </strong>
      <span className='block sm:inline'>{children}</span>
    </div>
  );
};

export default Alert;
