import React from 'react';

const Loader = ({ className, loader, color }) => {
  const colors = {
    1: 'text-teal-500',
    2: 'text-cyan-500',
    3: 'text-orange-500',
    4: 'text-lime-500',
    5: 'text-indigo-500',
    6: 'text-emerald-500',
    7: 'text-blue-500',
    8: 'text-purple-500',
    9: 'text-red-500',
    10: 'text-yellow-500',
  };
  const loaders = {
    1: 'fas fa-carrot',
    2: 'fas fa-cat',
    3: 'fas fa-trophy',
    4: 'fas fa-dove',
    5: 'fas fa-lightbulb',
    6: 'fas fa-candy-cane',
    7: 'fas fa-crow',
    8: 'fas fa-cocktail',
    9: 'fas fa-poop',
    10: 'fas fa-pepper-hot',
  };
  return (
    <div
      className={`h-full w-full flex justify-center items-center ${className}`}
    >
      <div
        className={`text-2xl md:text-3xl lg:text-4xl select-none animate-spin ${colors[color]}`}
      >
        <i className={`${loaders[loader]}`} />
      </div>
    </div>
  );
};

export default Loader;
