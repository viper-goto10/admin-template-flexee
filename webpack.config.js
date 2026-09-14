const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// eslint-disable-next-line no-undef
let dev = !(process.env.NODE_ENV === 'production')
const { VueLoaderPlugin } = require('vue-loader')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  entry: {
    'flexee-demo': ['core-js/stable', './demo/src/js/_bootstrap.js'],
  },
  output: {
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, 'demo/bundles'),
    publicPath: './',
    chunkFilename: './js/[name]/[id].[chunkhash].js',
    filename: '[name].js',
    clean: true
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'process/browser': path.resolve(__dirname, 'node_modules/process/browser.js')
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader?sourceMap',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass-embedded'),
              // keeps a warm compiler process alive across watch rebuilds instead of spawning a fresh one each time
              api: 'modern-compiler',
              sourceMap: true,
              sassOptions: {
                // compressing the whole bootstrap+scss tree on every dev rebuild is slow; prod gets minified separately by CssMinimizerPlugin
                // 'style' (not legacy 'outputStyle') since sass-loader passes sassOptions straight to the modern Sass JS API
                style: dev ? 'expanded' : 'compressed',
                // noisy in Bootstrap 5 internals and our own legacy scss, fix is a future Bootstrap 6 migration
                silenceDeprecations: ['import', 'global-builtin', 'slash-div', 'if-function', 'color-functions'], //TODO: remove when upgrading dart sass from version 1.103.1
              },
            },
          }
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|otf|png|jpe?g|gif|htc)$/,
        type: 'asset/resource',
        generator: {
          // named files in dev help debugging; hashed in prod for cache-busting
          filename: dev ? '[name][ext]' : '[name]-[contenthash:10][ext]'
        }
      },
    ],
  },
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  plugins: [
    new webpack.ProvidePlugin({
      moment: 'moment',
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'overlord.env': {
        dev: dev
      },
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'require.specified': 'require.resolve',
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(dev),
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(dev)
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new VueLoaderPlugin()
  ],
  performance: {
    hints: false
  },
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
