/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT'
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#ffc107',
          700: '#d79921',
        },
      },
    },
  },
  plugins: [
    // require('daisyui'),
  ],
})