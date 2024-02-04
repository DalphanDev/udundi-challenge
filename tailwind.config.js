/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.vue'],
  theme: {
    fontFamily: {
      didot: ['Didot', 'serif'],
      lato: ['Lato', 'sans-serif']
    },
    extend: {
      boxShadow: {
        explore: '0px 17px 25.3px 7px rgba(0, 0, 0, 0.10)'
      },
      dropShadow: {
        social: ['2px 2px 3px rgba(0, 0, 0, 0.50)']
      },
      transitionProperty: {
        fadeOut: 'opacity, visibility, transform'
      }
    }
  },
  plugins: []
}
