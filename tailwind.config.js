/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./modules/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  safelist: [
    {
      pattern: /space-(x|y)-(0|1|2|3|4|6|10|16|24)/,
      variants: ['sm'],
    },
  ],
  plugins: [
    /* eslint-disable global-require */
    require('@tailwindcss/forms'),
  ],
};
