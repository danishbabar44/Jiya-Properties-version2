/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: {
          500: '#EF4444', // Standard red
          600: '#DC2626', // Primary red
          700: '#B91C1C', // Darker red for hover
        },
        black: '#000000',
        white: '#FFFFFF',
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