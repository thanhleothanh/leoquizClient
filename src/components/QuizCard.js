import React from 'react';
import { Link } from 'react-router-dom';

const textColorTailwind =
  'text-orange-900 text-rose-900 text-lime-900 text-cyan-900 text-purple-900 text-teal-900 text-indigo-900 bg-cyan-900 bg-purple-900 bg-rose-900 bg-teal-900 bg-orange-900 bg-lime-900 bg-indigo-900 dark:bg-purple-900 dark:bg-cyan-900 dark:bg-teal-900 dark:bg-orange-900 dark:text-purple-50 dark:bg-lime-900 dark:bg-rose-900';
const QuizCard = ({ title, description, image, link, color, pointSystem }) => {
  return (
    <div className='max-h-72 w-full mt-8'>
      <div
        className={`flex w-full min-h-full bg-white dark:bg-${color}-900 rounded-3xl shadow-lg overflow-hidden`}
      >
        <div className='w-1/4 relative select-none'>
          <img
            className='w-full h-full absolute inset-0 object-cover overflow-hidden rounded-l-3xl '
            src={`${image}`}
            alt='quiz-pic'
          />
        </div>
        <div className='w-7/12 flex flex-col'>
          <div
            className={`px-4 py-2 sm:text-base lg:text-xl tracking-tight font-semibold shadow-md text-${color}-900 dark:text-gray-50 flex`}
          >
            <div className='hidden sm:inline h-full mr-2 lg:mr-3'>
              <i className='fas fa-gamepad text-sm lg:text-base lg:-mr-1' />
            </div>
            {title}
          </div>
          <div
            className={`px-4 py-2 text-sm text-${color}-900 dark:text-gray-50 font-medium flex`}
          >
            <div className='hidden sm:inline h-full mr-3'>
              <i className='fas fa-directions text-sm lg:text-base' />
            </div>
            {description}
          </div>
        </div>
        <div
          className={`w-1/6 text-2xl lg:text-3xl text-white font-bold rounded-r-3xl focus:outline-none 
          bg-${color}-600 hover:bg-${color}-700 select-none`}
        >
          <Link
            className='h-full w-full flex justify-center items-center'
            to={link}
          >
            <i className='fas fa-play-circle' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
