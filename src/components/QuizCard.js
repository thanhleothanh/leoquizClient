import React from 'react';
import { Link } from 'react-router-dom';

const textColorTailwind =
  'text-teal-900 bg-teal-900 bg-teal-600 hover:bg-teal-700 dark:bg-teal-900 bg-teal-700 text-lightBlue-900 bg-lightBlue-900 bg-lightBlue-600 hover:bg-lightBlue-700 dark:bg-lightBlue-900 bg-lightBlue-700                                                                          text-cyan-900 bg-cyan-900 bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-900 bg-cyan-700      text-purple-900 bg-purple-900 bg-purple-600 hover:bg-purple-700 dark:bg-purple-900 bg-purple-700     text-lime-900 bg-lime-900 bg-lime-600 hover:bg-lime-700 dark:bg-lime-900 bg-lime-700  text-emerald-900 bg-emerald-900 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-900 bg-emerald-700                                                                           text-indigo-900 bg-indigo-900 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-900 bg-indigo-700 ';

const QuizCard = ({ title, description, image, link, color }) => {
  return (
    <div className='max-h-72 w-full mt-3'>
      <div
        className={`flex w-full min-h-full bg-white dark:bg-${color}-900 rounded-3xl shadow-md overflow-hidden`}
      >
        <div className='w-1/4 relative select-none'>
          <img
            className='w-full h-full absolute inset-0 object-cover overflow-hidden rounded-l-3xl'
            src={`${image}`}
            alt='quiz-pic'
          />
        </div>
        <div className='w-7/12 flex flex-col'>
          <div
            className={`pl-3 pr-1 sm:px-3 py-2 text-base lg:text-lg font-semibold shadow-md text-${color}-900 dark:text-gray-50 flex`}
          >
            <div className='h-full mr-2 lg:mr-3'>
              <i className='fas fa-gamepad text-xs lg:text-sm lg:-mr-1' />
            </div>
            {title}
          </div>
          <div
            className={`pl-3 pr-1 sm:px-3 py-2 text-sm text-${color}-900 dark:text-gray-50 font-medium flex`}
          >
            <div className='h-full mr-3'>
              <i className='fas fa-directions text-xs lg:text-sm' />
            </div>
            {description}
          </div>
        </div>

        <Link
          className={`w-1/5 text-2xl md:text-3xl lg:text-4xl text-white font-bold rounded-r-3xl focus:outline-none 
           bg-${color}-600 hover:bg-${color}-700 select-none flex justify-center items-center`}
          to={link}
        >
          <i className='fas fa-play-circle' />
        </Link>
      </div>
    </div>
  );
};

export default QuizCard;
