
const path = require("path");
const devMode = process.env.NODE_ENV !== 'production';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Array of HtmlFiles
const htmlFiles = ['src/index.html']

function getTemplates(files) {
  const paths = []
  files.forEach((element,id) => {
    paths.push(
    new HtmlWebpackPlugin({
      filename: htmlFiles[id].replace(/\.?\/?src\//i,''),
      template: path.resolve(__dirname, element),
    }))
  });

  return paths;
}

module.exports = {
    mode:devMode? 'development' : 'production',
    entry: {
        app: [path.resolve(__dirname, 'src/index.js'),],
        },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components|^js\/)/ig,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.html$/i,
          use: [
          {
            loader:'html-loader', 
            options: { 
              attrs: ['script:src','link:href',':srcset','img:data-src', 'img:src', 'audio:src', 'video:src', 'track:src', 'embed:src', 'source:src', 'input:src', 'object:data'],
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
              }
            }
          },       
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  outputPath: 'assets/images',
                  publicPath: '/assets/images',
                  esModule: false,
              }
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                  name: '[name].css',
                  outputPath: 'assets/css',
                  publicPath: '/assets/css',
                  esModule: false,
              },
            },
            'extract-loader',
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                // Prefer `dart-sass`
                implementation: require('sass'),
              },
            }
          ],
        },
        {
          test: /\.css$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].css',
                outputPath: 'assets/css',
                publicPath: '/assets/css',
                  esModule: false,
              },
            },
            'extract-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
        
      ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        open: true,
        overlay: true,
        openPage: 'index.html',
        watchContentBase: true,
      },
      plugins : !devMode? [new CleanWebpackPlugin(), ...getTemplates(htmlFiles)]: getTemplates(htmlFiles)
        
      
}