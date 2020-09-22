const webpack = require('webpack');
const { merge } = require('webpack-merge');

const { CONFIG, PATH_DIST } = require('./webpack.common.js');

const HOST = 'localhost';
const PORT = 3000;

module.exports = () =>
    merge(CONFIG, {
        mode: 'development',
        devtool: 'cheap-module-source-map',

        plugins: [new webpack.HotModuleReplacementPlugin()],

        devServer: {
            port: PORT,
            host: HOST,
            hot: true,
            compress: true,
            historyApiFallback: true,
            contentBase: PATH_DIST,
            watchContentBase: true,
        },

        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-loader',
                            options: {
                                esModule: true,
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: '[local]',
                                },
                                sourceMap: true,
                            },
                        },
                    ],
                },
            ],
        },
    });
