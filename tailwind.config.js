/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        modalBackdrop: '#00000057',
      },
      flex: {
        3: '0 0 30%',
      },
      width: {
        '30%': '30%',
      },
      gap: {
        40: '40px',
      },
    },
  },
  plugins: []
};
