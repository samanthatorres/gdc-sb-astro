/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			'sans': ['Mont', 'Arial', 'sans-serif'],
			'serif': ['DM Serif', 'Times New Roman', 'serif']
		},
		extend: {},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
