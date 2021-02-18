module.exports = {
  purge: ['./index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
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
  plugins: [],
}
