/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'blue4167cd': '#4167cd', // valid name
      },
    },
  },
  plugins: [],
}
