const _ = require('lodash');
const pkg = require('./package.json');
const library = _.camelCase(pkg.name);

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname,
    filename: library + '.js',
    library: library
  }
};
