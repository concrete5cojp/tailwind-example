
const path = require("path");
const devMode = process.env.NODE_ENV !== 'production';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const themeHandle = 'my-c5-package';
const packageHandle = ''; // leave blank unless you add to a package


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

module.exports = env=>  {

  let outputPath = '';
  if (env && env.c5) {
    packageHandle.trim() !== '' ? outputPath += '/packages/' + packageHandle + '/'  : outputPath += '/application/';
    outputPath +=  'themes/' +themeHandle.trim('/');
  }

  return  {
    mode:devMode? 'development' : 'production',
    entry: {
        app: [path.resolve(__dirname, 'src/index.js'),],
        },
    output: {
      filename: 'assets/js/[name].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components|\/?src\/js\/)/ig,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }},
          {
            test: /src\/js\/.*\.m?js$/,
            exclude: /(node_modules|bower_component)/ig,
            use: {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'assets/js',
                esModule: false,
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
}