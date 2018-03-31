'use strict';

var assert = require('assert');
var now = require('performance-now');
var replaceLastRE = require('./regexpExec');
var replaceLastSR = require('./stringReplace');
var i;

function BenchmarkReplaceLast(replaceLast) {
  this.replaceLast = replaceLast;
  this.benchmark = function benchmark(args) {
    var result1, result2;
    var str = args[0];
    var pattern1 = args[1];
    var pattern2 = args[2];
    var replacement = args[3];
    var expected = args[4];
    result1 = this.replaceLast(str, pattern1, replacement);
    result2 = this.replaceLast(str, pattern2, replacement);
    assert.equal(result1, expected);
    assert.equal(result1, result2);
  };
}

var argsArray = [
  ['hello hello', /bonjour/, RegExp('bonjour'), 'bye', 'hello hello'],           // none
  ['hello', /hello/, RegExp('hello'), 'bye', 'bye'],                             // single
  ['hello hello', /hello/, RegExp('hello'), 'bye', 'hello bye'],                 // many
  ['hello hello', /hello/g, RegExp('hello', 'g'), 'bye', 'hello bye'],           // many with g flag
  ['hello hello', /HELLO/i, RegExp('HELLO', 'i'), 'bye', 'hello bye'],           // many with i flag
  ['hello hello', /he(ll)o/, RegExp('he(ll)o'), 'rr', 'hello herro'],            // matching groups
  ['hello hello', /(ll)(o)/, RegExp('(ll)(o)'), 'r', 'hello herr'],              // multiple matching groups
  ['hello . hello . hello', /./, RegExp('.'), 'bye', 'hello . hello . hellbye']  // contains regex chars
];

var benchmarkReplaceLastRE = new BenchmarkReplaceLast(replaceLastRE);
var benchmarkReplaceLastSR = new BenchmarkReplaceLast(replaceLastSR);

for (var j = 0; j < 10; j++) {

  var startRE = now();
  for (i = 0; i < argsArray.length; i++) {
    benchmarkReplaceLastRE.benchmark(argsArray[i]);
  }
  var endRE = now();
  var timeRE = endRE - startRE;

  var startSR = now();
  for (i = 0; i < argsArray.length; i++) {
    benchmarkReplaceLastSR.benchmark(argsArray[i]);
  }
  var endSR = now();
  var timeSR = endSR - startSR;

  if (timeRE < timeSR) {
    console.log('RE won .. RE:' + timeRE.toFixed(3) + ' SR:' + timeSR.toFixed(3));
  } else {
    console.log('SR won .. SR:' + timeSR.toFixed(3) + ' RE:' + timeRE.toFixed(3));
  }
}
