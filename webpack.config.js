
const path = require("path");
const devMode = process.env.NODE_ENV !== 'production';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode:devMode? 'development' : 'production',
    entry: {
        app: [path.resolve(__dirname, 'src/index.js'),
        path.resolve(__dirname, 'src/index.html'),
        ],
        },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: "[name].[ext]",
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
                            loader: "file-loader",
                            options: {
                              name: "[name].css",
                              outputPath: 'assets/css',
                              publicPath: '/assets/css',
                              esModule: false,
                          },
                        },
                        "extract-loader",
                  // Translates CSS into CommonJS
                  'css-loader',
                  'postcss-loader',
                  // Compiles Sass to CSS
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
                 /*   {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                return path.relative(path.dirname(resourcePath), context) + '/';
                                },
                            hmr: devMode,
                            minimize: { discardComments: { removeAll: !devMode} }
                        },
                      },*/
                      {
                        loader: "file-loader",
                        options: {
                          name: "[name].css",
                          outputPath: 'assets/css',
                          publicPath: '/assets/css',
                          esModule: false,
                      },
                    },
                    "extract-loader",
                  // Translates CSS into CommonJS
                  'css-loader',
                  'postcss-loader',
                ],
              },
            {
                test: /\.html$/i,
                use: ['file-loader?name=[name].[ext]', 'extract-loader', 
                
                {loader:'html-loader', options: { attrs: ['link:href',':srcset','img:data-src', 'img:src', 'audio:src', 'video:src', 'track:src', 'embed:src', 'source:src', 'input:src', 'object:data']}}],
                
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
      plugins : !devMode? [new CleanWebpackPlugin()]: []
        
      
}