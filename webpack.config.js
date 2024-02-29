// webpack.config.js
const path = require('path');

module.exports = {
  target: 'node',
  entry: './dist/src/server.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '.bundle'),
  },
  mode: "production",
};
