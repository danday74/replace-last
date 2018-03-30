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
  // var lastIndex = 0;
  var match;
  var temp = pattern.exec(str);
  while (temp != null) {
    match = temp;
    // lastIndex = pattern.lastIndex;
    temp = pattern.exec(str);
  }
  if (match == null) return str;
  if (match.length === 1) {
    return replaceAtIndex(str, match[0], replacement, match.index);
  } else {
    var accReplacement = match[0];
    for (var i = 1; i < match.length; i++) {
      accReplacement = strReplaceLast(accReplacement, match[i], replacement);
    }
    return replaceAtIndex(str, match[0], accReplacement, match.index);
  }
}

module.exports = replaceLast;
