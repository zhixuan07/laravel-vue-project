/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: 
      {theme : "url('/src/assets/background.jpeg') ,"},
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}