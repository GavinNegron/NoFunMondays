const path = require('path');

module.exports = {
  entry: './frontend/src/index.js', // Set the correct entry point

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.sass$/, // This handles .sass files
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true }, // Enable source maps
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }, // Enable source maps
          },
          {
            loader: 'resolve-url-loader',
            options: { sourceMap: true }, // Enable source maps
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true, // Enable source maps for SASS loader
              sassOptions: {
                indentedSyntax: true, // Enable indented syntax for .sass files
              },
            },
          },
        ],
      },
    ],
  },

  devtool: 'source-map', // Enable source maps for easier debugging

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
