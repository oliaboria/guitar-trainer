const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');

const { CONFIG } = require('./webpack.common.js');

module.exports = () =>
    merge(CONFIG, {
        mode: 'production',

        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].[hash].css',
                chunkFilename: '[id].[hash].css',
            }),
        ],

        optimization: {
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                    terserOptions: {
                        compress: {
                            drop_console: true,
                            unsafe_math: true,
                            unsafe_proto: true,
                            unsafe_undefined: true,
                            unsafe_Function: true,
                        },
                    },
                }),
                new OptimizeCSSAssetsPlugin({}),
            ],
            splitChunks: {
                name: false,
            },
        },

        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                esModule: true,
                            },
                        },
                        'css-loader',
                    ],
                },
            ],
        },
    });
