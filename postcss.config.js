const tailwindcss = require("tailwindcss");

module.exports = {
  processCssUrls: false,
  plugins: [
    tailwindcss("./tailwind.config.js"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production"
      ? [
          require("cssnano")({
            preset: ["default", { discardComments: { removeAll: true } }],
          }),
        ]
      : []),
  ],
};
