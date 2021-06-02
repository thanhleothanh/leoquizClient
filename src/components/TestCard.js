import React from 'react';
import { Link } from 'react-router-dom';

const textColorTailwind =
  'text-orange-900 bg-orange-900 bg-orange-600 hover:bg-orange-700 dark:bg-orange-900 bg-orange-700 text-yellow-900 bg-yellow-900 bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-900 bg-yellow-700     text-rose-900 bg-rose-900 bg-rose-600 hover:bg-rose-700 dark:bg-rose-900 bg-rose-700     text-pink-900 bg-pink-900 bg-pink-600 hover:bg-pink-700 dark:bg-pink-900 bg-pink-700';

const TestCard = ({ name, description, teacher, type, image, link, color }) => {
  return (
    <div className='max-h-96 w-full mt-3'>
      <div
        className={`flex w-full min-h-full bg-white dark:bg-${color}-900 rounded-3xl shadow-md overflow-hidden`}
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
            className={`pl-3 pr-1 sm:px-3 py-2 sm:text-base lg:text-lg tracking-tight font-semibold shadow-md text-${color}-900 dark:text-gray-50 flex`}
          >
            <div className='h-full mr-2 lg:mr-3'>
              <i className='fas fa-chalkboard-teacher text-xs lg:text-sm lg:-mr-1' />
            </div>
            Teacher:{'  '}
            {teacher[0].toUpperCase() + teacher.slice(1)}
          </div>
          <div
            className={`pl-3 pr-1 sm:px-3 py-2 text-sm text-${color}-900 dark:text-gray-50 font-medium flex`}
          >
            <div className='h-full mr-2'>
              <i className='fas fa-code text-xs lg:text-sm' />
            </div>
            {name[0].toUpperCase() + name.slice(1)}
          </div>
          <div
            className={`pl-3 sm:px-3 py-2 text-sm text-${color}-900 dark:text-gray-50 font-medium flex`}
          >
            <div className='h-full mr-2'>
              <i className='fas fa-code text-xs lg:text-sm' />
            </div>
            {description[0].toUpperCase() + description.slice(1)}
          </div>
          <div
            className={`pl-3 sm:px-3 py-2 text-sm text-${color}-900 dark:text-gray-50 font-medium flex`}
          >
            <div className='h-full mr-2'>
              <i className='fas fa-code text-xs lg:text-sm' />
            </div>
            {type === 'reactiongame'
              ? 'Reaction'
              : type === 'multiplechoice'
              ? 'Multiple Choice'
              : 'Fill in the blank'}
          </div>
        </div>

        <Link
          className={`w-1/5 text-3xl md:text-3xl lg:text-4xl text-white font-bold rounded-r-3xl focus:outline-none 
           bg-${color}-600 hover:bg-${color}-700 select-none flex justify-center items-center`}
          to={`/${type}/test/${link}`}
        >
          <i className='fas fa-play-circle' />
        </Link>
      </div>
    </div>
  );
};

export default TestCard;
