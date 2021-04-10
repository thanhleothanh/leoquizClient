import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateScore } from './../actions/userActions';
import AnswersTable from './AnswersTable';

const EndGame = ({
  title,
  message,
  score,
  color,
  history,
  preference,
  type,
  questions,
  game,
  freegame,
}) => {
  const endScreenTailwind = `
  hover:bg-teal-800 bg-teal-600 text-teal-50 
  hover:bg-rose-800 bg-rose-600 text-rose-50 
  hover:bg-orange-800 bg-orange-600 text-orange-50 
  hover:bg-lime-800 bg-lime-600 text-lime-50 
  hover:bg-indigo-800 bg-indigo-600 text-indigo-50 
  hover:bg-cyan-800 bg-cyan-600 text-cyan-50 
  hover:bg-purple-800 bg-purple-600 text-purple-50`;

  const dispatch = useDispatch();
  const home = () => {
    history.push('/home');
  };
  const scoreboard = () => {
    history.push('/scoreboard');
  };
  useEffect(() => {
    if (title === 'Congratulations!' && preference === 'newest')
      dispatch({ type: 'USER_SKIP_NEWEST', payload: type });
    if (score !== 0) dispatch(updateScore({ score }));
    if (!game) {
      if (score !== 0) dispatch({ type: 'USER_GAME_TICKETS_ADD' });
    } else {
      if (freegame === undefined) dispatch({ type: 'USER_GAME_TICKETS_MINUS' });
    }
  }, []);

  return (
    <div className='h-auto flex flex-col items-center mx-2'>
      <div className='sm:w-5/6 lg:w-1/2 rounded-3xl px-10 py-5 shadow-lg flex flex-col items-center justify-center bg-gray-50 dark:bg-backGroundColorLighterDark mt-32'>
        <div
          className={`text-2xl md:text-3xl font-bold italic text-red-900 dark:text-white`}
        >
          {title}
        </div>
        {message !== undefined ? (
          <div
            className={`text-center text-lg md:text-xl font-medium text-red-900 dark:text-white mt-4`}
          >
            {message}
          </div>
        ) : title === 'Game Over!' ? (
          <div
            className={`text-center text-lg md:text-xl font-medium text-red-900 dark:text-white mt-4`}
          >
            Time's up!
          </div>
        ) : (
          <div>👁👄👁</div>
        )}
        <div
          className={`text-center text-lg md:text-xl font-medium text-red-900 dark:text-white mt-4`}
        >
          You scored <strong className='font-extrabold'>{score}</strong> points!
          Will be updated on the scoreboard in a moment!
        </div>
      </div>
      <div className='flex justify-center space-x-2 mt-5'>
        <button
          className={`lg:text-xl text-lg text-white font-bold bg-${color}-600 hover:bg-${color}-800 px-5 sm:px-8 py-3 rounded-full shadow-lg focus:outline-none`}
          onClick={home}
        >
          Home
        </button>
        <button
          className={`lg:text-xl text-lg text-white font-bold bg-${color}-600 hover:bg-${color}-800 px-5 sm:px-8 py-3 rounded-full shadow-lg focus:outline-none`}
          onClick={scoreboard}
        >
          Scoreboard
        </button>
      </div>
      {questions && (
        <div className='mt-5'>
          <AnswersTable questions={questions} />
        </div>
      )}
    </div>
  );
};

export default EndGame;
