/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: `#211e45`,
        secondary: `#e4e4f0`,
      },
      fontFamily: { custom: "farsi" },
    },
  },
  plugins: [],
};
