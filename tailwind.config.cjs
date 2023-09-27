/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			'sans': ['Mont', 'Arial', 'sans-serif'],
			'serif': ['DM Serif', 'Times New Roman', 'serif']
		},
		colors: {
			'black': '#oc1b33',
			'teal': '#026670',
			'light-teal': '#30b9c1',
			'grey': '#536776',
			'mustard': '#FCB830',
			'light-grey': '#EBEDED',
			'mint': '#9Fedd7',
			'yellow': '#fce181',
			'light-yellow': '#fef9c7',
			'pink': '#e884a9',
			'orange': '#e2784f',
			'purple': '#8f5878'
		},
		extend: {
			typography: (theme) => ({
				DEFAULT: {
				  css: {
					color: theme('colors.black'),
					a: {
						color: theme('colors.teal'),
						'&:hover': {
							color: theme('colors.mustard'),
						},
						'&:visited': {
							color: theme('colors.purple'),
						}
					}
				  },
				},
			  }),
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
