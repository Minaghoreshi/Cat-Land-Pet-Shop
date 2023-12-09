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
        secondary: `#f9f9f9`,
        save: `#36a2a6`,
        selected: `#df3395`,
        head: `#fbe4ea`,
      },
      fontFamily: { custom: "farsi" },
      boxShadow: { custom: `0px 0px 50px -20px rgba(107,107,107,1)` },
    },
  },
  plugins: [require("flowbite/plugin")],
};
