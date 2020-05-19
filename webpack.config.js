const path = require("path");
const devMode = process.env.NODE_ENV !== "production";
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { HtmlWebpackC5ThemePlugin } = require("html-webpack-c5-theme-plugin");
const c5Options = {
  themeHandle: "c5j_theme", // The handle of the theme used for generating assets/theme paths.
  packageHandle: null, // set to null unless you want to add theme to a package
  themeName: "My Concrete 5 Japan Theme", // The name of the theme
  themeDescription: "A nice description", // Enter a description about the package
  skipIndex: false, // Set to true if you dont want to process index.html as a php file
  defaultPage: "index.html", // This is the page that will be used for generating default.php
  //deleteHtml: true, // This will delete html files after generating php
};

// Array of HtmlFiles
const htmlFiles = ["src/index.html"];

function getTemplates(files, env) {
  const paths = [];
  files.forEach((element, id) => {
    paths.push(
      new HtmlWebpackPlugin({
        filename: htmlFiles[id].replace(/\.?\/?src\//i, ""),
        template: path.resolve(__dirname, element),
        minify: false,
      })
    );
  });
  if (env && env.c5) {
    paths.push(
      new HtmlWebpackC5ThemePlugin({ deleteHtml: true }, HtmlWebpackPlugin)
    );
  }
  return paths;
}

module.exports = (env) => {
  let outputPath = "";
  if (env && env.c5) {
    c5Options.packageHandle && c5Options.packageHandle.trim() !== ""
      ? (outputPath += "/packages/" + c5Options.packageHandle + "/")
      : (outputPath += "/application/");
    outputPath += "themes/" + c5Options.themeHandle.trim("/");
  }

  return {
    mode: devMode ? "development" : "production",
    entry: {
      app: [path.resolve(__dirname, "src/index.js")],
    },
    output: {
      filename: "assets/js/[name].js",
      path:
        env && env.c5
          ? __dirname + "/dist/" + c5Options.themeHandle.trim("/")
          : __dirname + "/dist",
      publicPath: outputPath + "/",
    },

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components|\/?src\/js\/)/gi,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /src\/js\/.*\.m?js$/,
          exclude: /(node_modules|bower_component)/gi,
          use: {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/js",
              esModule: false,
            },
          },
        },
        {
          test: /\.html$/i,
          use: [
            {
              loader: "html-loader",
              options: {
                attrs: [
                  "script:src",
                  "link:href",
                  ":srcset",
                  "img:data-src",
                  "img:src",
                  "audio:src",
                  "video:src",
                  "track:src",
                  "embed:src",
                  "source:src",
                  "input:src",
                  "object:data",
                ],
                minimize: {
                  collapseWhitespace: true,
                  conservativeCollapse: true,
                  keepClosingSlash: true,
                  minifyCSS: true,
                  minifyJS: true,
                  removeAttributeQuotes: true,
                  removeComments: true,
                  removeScriptTypeAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  useShortDoctype: true,
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "assets/images",
                esModule: false,
              },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].css",
                outputPath: "assets/css",
                esModule: false,
              },
            },
            "extract-loader",
            "css-loader",
            "postcss-loader",
            {
              loader: "sass-loader",
              options: {
                // Prefer `dart-sass`
                implementation: require("sass"),
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].css",
                outputPath: "assets/css",
                esModule: false,
              },
            },
            "extract-loader",
            "css-loader",
            "postcss-loader",
          ],
        },
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, "src"),
      compress: true,
      open: true,
      overlay: true,
      openPage: "index.html",
      watchContentBase: true,
    },
    plugins: !devMode
      ? [new CleanWebpackPlugin(), ...getTemplates(htmlFiles, env)]
      : getTemplates(htmlFiles),
  };
};
