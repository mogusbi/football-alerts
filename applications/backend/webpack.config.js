const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const {cpus} = require('os');
const {join} = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  context: __dirname,
  entry: slsw.lib.entries,
  externals: [
    nodeExternals()
  ],
  mode: slsw.lib.webpack.isLocal ? 'development': 'production',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'cache-loader'
          },
          {
            loader: 'thread-loader',
            options: {
              workers: cpus().length - 1
            }
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs',
    path: join(__dirname, '.webpack')
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true
    })
  ],
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.ts',
      '.tsx'
    ]
  },
  target: 'node'
};
