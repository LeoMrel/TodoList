module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'width' : 'width'
      }
    },
  },
  darkMode: 'class',
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}