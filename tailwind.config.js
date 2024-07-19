/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: { title: "Inter", content: "Roboto" },
    extend: {
      colors: {
        green: {
          500: "#54CC0A",
        },
        red: {
          500: "#FF3131",
        },
      },
      backgroundImage: {
        home: "url('/assets/img/bg.png')",
      },
    },
  },
  plugins: [],
};
