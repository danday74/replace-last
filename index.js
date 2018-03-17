'use strict';

const replaceLast = require('./js/replaceLast');

function main(str, pattern, replacement) {
  return replaceLast(str, pattern, replacement);
}

module.exports = main;
