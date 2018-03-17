'use strict';

var isRegex = function(any) {
  return Object.prototype.toString.call(any) === '[object RegExp]';
};

var strReplaceLast = function(str, pattern, replacement) {
  var i = str.lastIndexOf(pattern);
  if (i < 0) return str;
  var lhs = str.substring(0, i);
  var rhs = str.substring(i + pattern.length, str.length);
  return lhs + replacement + rhs;
};

var regexReplaceLast = function(str, pattern, replacement) {
  pattern = new RegExp(pattern.source, 'g');
  return str.replace(pattern, function(match, offset, str) {
    var follow = str.slice(offset);
    var isLast = follow.match(pattern).length === 1;
    return (isLast) ? replacement : match;
  });
};

var replaceLast = function(str, pattern, replacement) {

  var orig = str;

  if (typeof(str) === 'number') str = str.toString();
  if (typeof(pattern) === 'number') pattern = pattern.toString();
  if (typeof(replacement) === 'number') replacement = replacement.toString();

  if (typeof(str) !== 'string') return orig;
  if (typeof(replacement) !== 'string') return orig;

  var result;

  if (typeof(pattern) === 'string') {
    result = strReplaceLast(str, pattern, replacement);
  } else if (isRegex(pattern)) {
    result = regexReplaceLast(str, pattern, replacement);
  } else {
    return orig;
  }

  return (result === str) ? orig : result;
};

module.exports = replaceLast;
