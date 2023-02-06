/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  media: false,
  purge: ['./pages/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        amazon_blue: {
          light: '#232F3E',
          DEFAULT: '#131921',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
