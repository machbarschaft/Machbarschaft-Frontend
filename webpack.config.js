const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '.env'),
});
const { googleMapsApiKey } = require('./app/assets/config/google-maps-api.js');

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      // {test: /\.tsx?$/,use: 'ts-loader',exclude: /node_modules/,},
      { test: /\.(ts|tsx)$/, loader: 'awesome-typescript-loader' },
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|svg|jpg|gif|pdf)$/, use: 'file-loader' },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#2D3047',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      { test: /\.(key)$/, use: 'raw-loader' },
    ],
  },
  resolve: { extensions: ['.js', '.json', '.ts', '.tsx'] },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      googleMapsApiKey,
    }),
    new CopyPlugin({ patterns: [{ from: '_redirects' }] }),
    new webpack.DefinePlugin({
      'provess.env': dotenv.parsed,
    }),
  ],
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/v1': {
        target: 'http://localhost:8080',
        secure: false,
      },
    },
  },
};
