/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: 'class',
  theme: {
    fontFamily: {
      'consolas': ['Consolas', 'sans-serif']
    },
    extend: {
      backgroundColor:{
        "material-light": "#F5F5F5",
        "material-dark": "#4A4A4A",
      }
    },
  },
  plugins: [],
};
