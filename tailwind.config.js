/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{gjs,gts,hbs,html,js,ts}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      display: ['Inter', 'system-ui', 'sans-serif'],
      body: ['Inter', 'system-ui', 'sans-serif'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
