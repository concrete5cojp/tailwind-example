//const { colors } = require('tailwindcss/defaultTheme') // import default colours
module.exports = {
  purge: {
    content: [
      "./src/**/*.html",
      "./src/**/*.vue",
      "./src/**/*.jsx",
      // etc.
    ],
    mode: "all",
  },
  plugins: [
    require('@tailwindcss/ui'), // use tailwindui
    require('@tailwindcss/typography') // use typography
  ],
  // This is to disable the opacity that genereates a lot of extra css classes
  corePlugins: {
    divideOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    placeholderOpacity: false,
    textOpacity: false,
  },
  theme: {
    /* This will overwrite all "colors" configuration to only 
            render default green and white
        colors: {
            'green': colors.white
            'white' : colors.white,
        },
        */
    extend: {
      /** This will extend the current "spacing" configuration
            *  and add a -7 to all spacing options     
            spacing: {
                '7': '1.75rem',
            },
             */
    },
  },
};
