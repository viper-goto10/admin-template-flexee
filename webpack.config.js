const path = require('path')
const webpack = require('webpack')
const dev = !(process.argv.indexOf('-p') !== -1)
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: {
    'flexee-demo': ['@babel/polyfill', './demo/src/js/_bootstrap.js'],
  },
  output: {
    path: path.resolve(__dirname, 'demo/bundles'),
    publicPath: './',
    chunkFilename: './js/[name]/[id].[chunkhash].js',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')],
              },
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: 'compressed',
              },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|otf|png|jpe?g|gif|htc)$/,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 10000,
          },
        },
        generator: {
          filename: '[name][ext]',
        },
      },
    ],
  },
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  plugins: [
    new webpack.DefinePlugin({
      'overlord.env': {
        dev: dev,
      },
      'process.env': {
        NODE_ENV: JSON.stringify(dev ? 'development' : 'production'),
      },
      'require.specified': 'require.resolve',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      moment: 'moment',
      process: 'process/browser',
    }),
    new VueLoaderPlugin(),
  ],
  devtool: dev ? 'source-map' : false,
}

if (!dev) {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ])
  module.exports.optimization = {
    minimize: true,
  }
}
