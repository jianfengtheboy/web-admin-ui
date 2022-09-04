/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  important: 'body',
  content: ['./src/**/*.{vue,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        red: colors.red,
        yellow: colors.amber,
        green: colors.emerald,
        blue: colors.blue,
        indigo: colors.indigo,
        purple: colors.violet,
        pink: colors.pink,
        primary: '#0096ff',
        warning: '#FCA700',
        danger: '#FF1D52',
        success: '#00B246',
        info: '#909196'
      }
    }
  },
  plugins: []
}
