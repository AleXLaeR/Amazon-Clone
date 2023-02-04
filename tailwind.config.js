/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: false,
  purge: [
    "./pages/**/*.{js,ts,tsx}",
    "./components/**/*.{js,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon_blue: {
          light: "#232F3E",
          default: "#131921",
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
