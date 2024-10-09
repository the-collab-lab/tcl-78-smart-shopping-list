import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Fredoka', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				primary: '#F1F6F9',
				secondary: '#142833',
				accent: '#0089B6',
				base: '#D7E4EB',
			},
		},
	},
	plugins: [],
};
