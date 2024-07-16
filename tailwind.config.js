/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: { sans: "Poppins" },
    extend: {
      backgroundImage: {
        home: "url('/assets/bg.png')",
      },
    },
  },
  plugins: [],
};
