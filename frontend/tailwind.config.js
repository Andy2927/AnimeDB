/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        animedb: {
          100: 'rgb(37, 37, 37)',  // negro
          400: '#8582DB',  // morado
          800: '#FFCFE7',   // rosa
          900: '#A59AE6'
        }
      }
    },
  },
  plugins: [],
};
