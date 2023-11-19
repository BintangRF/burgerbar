/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-1": "url('/assets/bg-1.jpg')",
        "bg-2": "url('/assets/bg-2.jpg')",
        "bg-3": "url('/assets/bg.svg')",
      },
    },
  },
  plugins: [],
};
