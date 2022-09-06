/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bubble-gum': '#ff77e9',
        purple: '#3f3cbb',
      },
      fontFamily: {
        body: ['Aldrich'],
      },
    },
  },
  plugins: [],
}
