const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: "development",
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env.REACT_APP_SERVER_URL': JSON.stringify(process.env.REACT_APP_SERVER_URL),
        'process.env.REACT_APP_DEBUG': JSON.stringify(process.env.REACT_APP_DEBUG),
        'process.env.REACT_APP_ENCRYPTION_KEY': JSON.stringify(process.env.REACT_APP_ENCRYPTION_KEY),
    })
],
};