const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: '[name].[chunkhash].js'
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        include: [
          path.resolve(__dirname, 'src', 'styles')
        ],
        use: [
          {
            // After all CSS loaders we use plugin to do his work.
            // It gets all transformed CSS and extracts it into separate
            // single bundled file
            loader: MiniCssExtractPlugin.loader
          },
          {
            // This loader resolves url() and @imports inside CSS
            loader: "css-loader",
          },
          {
            // Then we apply postCSS fixes like autoprefixer and minifying
            loader: "postcss-loader"
          },
          {
            // First we transform SASS to standard CSS
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          }
        ]
      },
      {
        // Apply rule for fonts files
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            // Using file-loader too
            loader: "file-loader",
            options: {
              outputPath: 'fonts'
            }
          }
        ]
      },
      {
        // Apply rule for video files
        test: /\.(mp4|webm)$/,
        use: [
          {
            // Using file-loader too
            loader: "file-loader",
            options: {
              outputPath: 'videos'
            }
          }
        ]
      },
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   loader: 'file-loader',
      //   options: {
      //     outputPath: 'assets/images',
      //   },
      // },
      {
        // Now we apply rule for images
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            // Using file-loader for these files
            loader: "file-loader",

            // In options we can set different things like format
            // and directory to save
            options: {
              outputPath: 'images'
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // filename: 'style.[contenthash].css',
      filename: 'bundle.css',
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/assets/images", to: "images" },
        { from: "src/assets/videos", to: "videos" },
    //     // { from: "src/assets/icons", to: "icons" },
    //     // { from: "src/assets/site.webmanifest", to: "site.webmanifest" },
    //     {
    //       from: "src/index.html",
    //       to: "index.html",
    //     },
      ],
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    // new WebpackMd5Hash()
    require('autoprefixer')
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
};
