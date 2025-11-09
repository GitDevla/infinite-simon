/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"simon-red": "rgb(var(--simon-red) / <alpha-value>)",
				"simon-green": "rgb(var(--simon-green) / <alpha-value>)",
				"simon-blue": "rgb(var(--simon-blue) / <alpha-value>)",
				"simon-yellow": "rgb(var(--simon-yellow) / <alpha-value>)",
				"bg-secondary": "rgb(var(--bg-secondary) / <alpha-value>)",
				"fg": "rgb(var(--fg) / <alpha-value>)",
				"fg-secondary": "rgb(var(--fg-secondary) / <alpha-value>)",
			},
		},
	},
	plugins: [],
};
