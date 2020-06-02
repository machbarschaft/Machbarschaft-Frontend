const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
                    {loader: 'less-loader',
                        options: {
                            lessOptions: {
                                modifyVars: {
                                    /*'btn-primary-bg': 'green',
                                    'link-color': '#1DA57A',
                                    'border-radius-base': '20px',*/
                                },
                                javascriptEnabled: true,
                            }
                        }
                    }
                ]
            }
        ]
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: "app/index.html"
        })
    ],
    devServer: {
        historyApiFallback: true
    }
}
