'use strict';

var isRegex = function(any) {
  return Object.prototype.toString.call(any) === '[object RegExp]';
};

var regexReplaceLast = function(str, pattern, replacement) {
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
  var flags = (pattern.flags.indexOf('g') === -1) ? pattern.flags + 'g' : pattern.flags;
  pattern = new RegExp(pattern.source, flags);
  return str.replace(pattern, function(match, offset, str) {
    var follow = str.slice(offset);
    var isLast = follow.match(pattern).length === 1;
    return (isLast) ? replacement : match;
  });
};

var strReplaceLast = function(str, pattern, replacement) {
  var i = str.lastIndexOf(pattern);
  if (i < 0) return str;
  var lhs = str.substring(0, i);
  var rhs = str.substring(i + pattern.length, str.length);
  return lhs + replacement + rhs;
};

var replaceLast = function(str, pattern, replacement) {
  str = '' + str;
  if (typeof replacement === 'undefined') return str;
  if (isRegex(pattern)) {
    return regexReplaceLast(str, pattern, replacement);
  } else {
    pattern = '' + pattern;
    return strReplaceLast(str, pattern, replacement);
  }
};

module.exports = replaceLast;
