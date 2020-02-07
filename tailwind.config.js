//const { colors } = require('tailwindcss/defaultTheme') // import default colours
module.exports = {
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
}