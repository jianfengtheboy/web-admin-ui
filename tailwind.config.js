/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {},
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
			primary: '#165DFF',
			warning: 'rgb(255, 125, 0)',
			danger: 'rgb(245, 63, 63)',
			success: 'rgb(0, 180, 42)',
			info: 'rgb(134, 144, 156)'
		}
	},
	plugins: []
}
