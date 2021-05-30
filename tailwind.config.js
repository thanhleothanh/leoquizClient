const colors = require('tailwindcss/colors');
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lightBlue: colors.lightBlue,
        rose: colors.rose,
        teal: colors.teal,
        orange: colors.orange,
        lime: colors.lime,
        emerald: colors.emerald,
        cyan: colors.cyan,

        backGroundColorLight: '#F7F3F3',
        backGroundColorDark: '#261939',
        backGroundColorLighterDark: '#391B4B',
      },
      animation: {
        spin: 'spin 2s linear infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
      screens: {
        standalone: { raw: '(display-mode: standalone)' },
      },
      spacing: {
        68: '17rem',
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus'],
    },
  },
  plugins: [],
};
