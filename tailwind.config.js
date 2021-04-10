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

        backGroundColorLight: '#F2E8E4',
        backGroundColorDark: '#261939',
        backGroundColorLighterDark: '#755770',
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
