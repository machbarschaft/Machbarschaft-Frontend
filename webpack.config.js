const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {googleMapsApiKey} = require("./app/assets/config/google-maps-api.js");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: "/"
    },
    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.(png|svg|jpg|gif)$/, use: 'file-loader'},
            {
                test: /\.less$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                modifyVars: {
                                    'primary-color': '#2D3047',
                                },
                                javascriptEnabled: true,
                            }
                        }
                    }
                ]
            },
            {test: /\.(key)$/, use: 'raw-loader'}
        ]
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: "app/index.html",
            googleMapsApiKey: googleMapsApiKey
        }),
        new CopyPlugin({patterns: [{from: '_redirects'}]})
    ],
    devServer: {
        historyApiFallback: true
    }
}
