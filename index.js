'use strict';

const replaceLast = require('./js/replaceLast');

function main(str, pattern, replacement) {
  // Official MDN polyfill https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags
  // for Node.js v4
  /* istanbul ignore next */
  if (RegExp.prototype.flags === undefined) {
    Object.defineProperty(RegExp.prototype, 'flags', {
      configurable: true,
      get: function() {
        return this.toString().match(/[gimuy]*$/)[0];
      }
    });
  }
  return replaceLast(str, pattern, replacement);
}

module.exports = main;
