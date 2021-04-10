import React from 'react';
import { useState, useEffect } from 'react';

const CountdownTimer = ({ initialMinute, initialSeconds, color }) => {
  const [originalTime] = useState(initialMinute * 60 + initialSeconds * 1);
  const [minutes, setMinutes] = useState(initialMinute * 1);
  const [seconds, setSeconds] = useState(initialSeconds * 1);

  const timerTailwind = `
  bg-orange-100 bg-orange-700 bg-orange-600 dark:bg-orange-800 bg-orange-200 text-orange-800 dark:text-orange-50
  bg-indigo-100 bg-indigo-700 bg-indigo-600 dark:bg-indigo-800 bg-indigo-200 text-indigo-800 dark:text-indigo-50
  bg-purple-100 bg-purple-700 bg-purple-600 dark:bg-purple-800 bg-purple-200 text-purple-800 dark:text-purple-50
  bg-rose-100 bg-rose-700 bg-rose-600 dark:bg-rose-800 bg-rose-200 text-rose-800 dark:text-rose-50
  bg-cyan-100 bg-cyan-700 bg-cyan-600 dark:bg-cyan-800 bg-cyan-200 text-cyan-800 dark:text-cyan-50
  bg-teal-100 bg-teal-700 bg-teal-600 dark:bg-teal-800 bg-teal-200 text-teal-800 dark:text-teal-50
  bg-lime-100 bg-lime-700 bg-lime-600 dark:bg-lime-800 bg-lime-200 text-lime-800 dark:text-lime-50
  `;

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(Math.floor(seconds - 1));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div className=''>
      <div className='flex mb-1 items-center justify-between'>
        <div>
          <span
            className={`text-xs lg:text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full 
            text-${color}-800 bg-${color}-100
            dark:text-${color}-50 dark:bg-${color}-800`}
          >
            Timer
          </span>
        </div>
        <div className='text-right'>
          <span
            className={`text-xs lg:text-sm font-semibold inline-block text-${color}-800 dark:text-${color}-50`}
          >
            {minutes === 0 && seconds === 0 ? (
              '0:00'
            ) : (
              <div>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </div>
            )}
          </span>
        </div>
      </div>
      <div className={`overflow-hidden h-7 flex rounded-full bg-${color}-100`}>
        <div
          style={{
            width: `${
              (Math.floor(minutes * 60 + seconds) / originalTime) * 100
            }%`,
          }}
          className={`shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-${color}-600`}
        ></div>
      </div>
    </div>
  );
};

export default CountdownTimer;
