const path = require('path');
const webpack = require('webpack');
const dev = !(process.argv.indexOf('-p') !== -1);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: {
        'flexee-demo': ['@babel/polyfill', './demo/src/js/_bootstrap.js']
    },
    output: {
        path: path.resolve(__dirname, 'demo/bundles'),
        publicPath: './demo/bundles',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?sourceMap',
                    'resolve-url-loader?sourceMap',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    'sass-loader?sourceMap'
                ]
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|otf|png|jpe?g|gif|htc)$/,
                use: 'file-loader?name=[name].[ext]&publicPath=./'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'overlord.env': {
                dev: dev
            },
            'process.env': {
                NODE_ENV: dev ? '"dev"' : '"production"'
            },
            'require.specified': 'require.resolve'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            moment: "moment"
        }),
        new VueLoaderPlugin()
    ],
    devtool: dev ? 'source-map' : false
};

if (!dev) {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                map: {
                    inline: true
                }
            }
        })
    ]);
}
