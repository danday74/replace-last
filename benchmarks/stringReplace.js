'use strict';

// Convert regex pattern to global regex pattern
function getGlobalPattern(pattern) {
  var flags = (pattern.flags.indexOf('g') === -1) ? pattern.flags + 'g' : pattern.flags;
  return new RegExp(pattern.source, flags);
}

// Is this a regex?
function isRegex(any) {
  return Object.prototype.toString.call(any) === '[object RegExp]';
}

// Replace pattern by replacement at index
function replaceAtIndex(str, pattern, replacement, i) {
  var lhs = str.substring(0, i);
  var rhs = str.substring(i + pattern.length, str.length);
  return lhs + replacement + rhs;
}

// replaceLast where pattern is a string
function strReplaceLast(str, pattern, replacement) {
  var i = str.lastIndexOf(pattern);
  if (i < 0) return str;
  return replaceAtIndex(str, pattern, replacement, i);
}

// replaceLast
function replaceLast(str, pattern, replacement) {
  str = '' + str;
  if (typeof replacement === 'undefined') return str;
  if (isRegex(pattern)) {
    return regexReplaceLast(str, pattern, replacement);
  } else {
    pattern = '' + pattern;
    return strReplaceLast(str, pattern, replacement);
  }
}

// THE FUNCTION TO BENCHMARK
function regexReplaceLast(str, pattern, replacement) {
  pattern = getGlobalPattern(pattern);
  return str.replace(pattern, function(/* args expanded below */) {
    var match = arguments[0];
    var p = Array.prototype.slice.call(arguments, 1, arguments.length - 2);
    var offset = arguments[arguments.length - 2];
    var str = arguments[arguments.length - 1];
    var follow = str.slice(offset);
    var isLast = follow.match(pattern).length === 1;
    if (!isLast) return match;
    if (!p.length) return replacement;
    for (var i = 0; i < p.length; i++) {
      match = strReplaceLast(match, p[i], replacement);
    }
    return match;
  });
}

module.exports = replaceLast;
