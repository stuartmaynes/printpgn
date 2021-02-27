const colors = require('tailwindcss/colors')

module.exports = {
  important: '#printpgn',
  purge: [
    './index.html',
    './faqs/index.html',
    './src/App.vue',
    './src/components/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#082B65',
        'blue-gray': colors.blueGray,
        'warm-gray': colors.warmGray,
        'cyan': colors.cyan,
        'teal': colors.teal,
        'violet': colors.violet,
      },
      fontSize: {
        '2xs': '.55rem',
      },
      screens: {
        '3xl': '1600px',
        '4xl': '1800px',
        '3xl': '1600px',
        'print': {'raw': 'print'},
      },
      width: {
        '50px': '50px',
        '60px': '60px',
        '70px': '70px',
        '80px': '80px',
        '90px': '90px',
        '100px': '100px',
      }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
