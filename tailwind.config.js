// /** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export const content = [
  "./src/**/*.{html,ts}",
];
export const theme = {
  extend: {
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    },
  },
};
export const plugins = [
  
];

