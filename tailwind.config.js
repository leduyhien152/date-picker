const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.nice-dates-day:before': {
          backgroundColor: '#3f83f8 !important',
        },
        '.nice-dates-day:after': {
          borderColor: '#1c64f2 !important',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
};
