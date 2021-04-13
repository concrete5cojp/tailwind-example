const tailwindcss = require("tailwindcss");

module.exports = {
  processCssUrls: false,
  plugins: {
    "tailwindcss": {},
    "autoprefixer": {},
    ...(process.env.NODE_ENV === "production"
      ? {
        "cssnano": {
          preset: ["default", { discardComments: { removeAll: true } }],
        },
      }
      : {}),
  },
};
