/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: `#0e0b45`,
        secondary: `#e4e4f0`,
        save: `#038175`,
        selected: `#df3395`,
      },
      fontFamily: { custom: "farsi" },
    },
  },
  plugins: [require("flowbite/plugin")],
};
