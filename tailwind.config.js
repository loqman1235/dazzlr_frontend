/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      animation: {
        ping: "ping .5s cubic-bezier(0, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
