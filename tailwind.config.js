module.exports = {
  purge: [
    './pages/**/*.js',
    './components/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      'sm': {'min': '640px', 'max': '767px'},
      'md': {'min': '768px', 'max': '1023px'},
      'lg': {'min': '1024px', 'max': '1279px'},
      'xl': {'min': '1280px', 'max': '1535px'},
      '2xl': {'min': '1536px'},
    },
    lineClamp: {
      1: 1,
      2: 2,
      3: 3
    }
  },
  variants: {
    extend: {},
    display: ['responsive', 'dropdown']
  },
  plugins: [
    require('tailwindcss-line-clamp'),
    require('tailwindcss-dropdown')
  ],
}
