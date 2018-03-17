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

  var flags;

  /* istanbul ignore else */
  if (pattern.flags != null) {
    flags = (pattern.flags.indexOf('g') === -1) ? pattern.flags + 'g' : pattern.flags;
  } else {
    flags = 'g'; // Node 4 fix
  }

  pattern = new RegExp(pattern.source, flags);
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
