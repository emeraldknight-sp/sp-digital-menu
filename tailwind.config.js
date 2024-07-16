/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: { sans: "Poppins", title: "Inter", content: "Roboto" },
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
        home: "url('/src/img/bg.png')",
      },
    },
  },
  plugins: [],
};
