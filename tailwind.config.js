/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "calculated-height": "calc(100vh - 48px)",
      },
      width: {
        "email-block-calculated-width": "calc(100vw - (48px + 300px + 270px))",
        "mobile-width": "calc(100vw - 48px)",
      },
    },
  },
  plugins: [],
};
