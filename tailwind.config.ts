/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: ["class"],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				customText: '#A7B5B5',   
				buttonsGrey:'grey',
				customBorder:'#2F3336',
				customGray: '#242424',
				customBackground: '#121212',
				customDark:'#0A0A0A',
			  },
			  fontFamily: {
				pixelFont: ['PixelFont'],
			  },
		},
	},
	plugins: [],
};