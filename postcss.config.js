const tailwindcss = require('tailwindcss');

const purgecss = require('@fullhuman/postcss-purgecss')({

    // Specify the paths to all of the template files in your project
    content: [
        './src/**/*.html',
        './src/**/*.vue',
        './src/**/*.jsx',
      // etc.
    ],

    // Include any special characters you're using in this regular expression
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
  })

module.exports = {
    processCssUrls: false,
    plugins: [
        tailwindcss('./tailwind.config.js'),
        require('autoprefixer'),
        ...process.env.NODE_ENV === 'production' ? [purgecss, require('cssnano')({
            preset: ['default', { discardComments: { removeAll: true } }],
        }),] : [],
    ]
}