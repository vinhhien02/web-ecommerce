/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    fontFamily: {
      main: ["Roboto Condensed", "sans - serif"],
    },
    extend: {
      width: {
        main: "1220px",
      },
      backgroundColor: {
        main: "#017BFE",
      },
      colors: {
        main: "#017BFE",
      },
    },
  },
  plugins: [],
};
