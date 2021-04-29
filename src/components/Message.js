import React from 'react';

const Message = ({ children, type, className }) => {
  return (
    <div>
      {type === 'info' ? (
        <div
          className={`${className} dark:bg-lightBlue-200 bg-lightBlue-100 font-medium text-sm md:text-base border-4 border-lightBlue-500 text-lightBlue-900 px-6 py-3 rounded-xl text-center`}
        >
          <span className='block sm:inline'>{children}</span>
        </div>
      ) : (
        <div
          className={`${className} dark:bg-lime-200 bg-lime-100 font-medium text-sm md:text-base border-4 border-lime-500 text-lime-900 px-6 py-3 rounded-xl text-center`}
        >
          <span className='block sm:inline'>{children}</span>
        </div>
      )}
    </div>
  );
};

export default Message;
