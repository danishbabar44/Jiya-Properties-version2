/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          500: '#00A19C', // Primary color
          600: '#008F8A', // Darker shade for hover
        },
        navy: {
          500: '#1A2B4C', // Secondary color
          600: '#152340', // Darker shade for hover
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': ['48px', '56px'],
        'h2': ['36px', '42px'],
        'h3': ['24px', '28px'],
        'h4': ['20px', '22px'],
        'body': ['16px', '24px'],
      },
    },
  },
  plugins: [],
};