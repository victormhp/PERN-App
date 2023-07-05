/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/client/**/*.{js,jsx,ts,tsx,css}'],
  theme: {
    extend: {
      boxShadow: {
        'error-100': 'inset 0 0 0 1px #ef4444',
        'error-150': 'inset 0 0 0 1.5px #ef4444',
        'valid-100': 'inset 0 0 0 1px #a1a1aa',
        'valid-150': 'inset 0 0 0 1.5px #a1a1aa',
        input: 'inset 0 0 0 1px #3f3f46',
      },
    },
  },
  plugins: [],
};
