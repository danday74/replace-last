const replaceLastRE = require('./regexpExec');
const replaceLastSR = require('./stringReplace');

console.log('XXXXX replaceLast RegExp.exec XXXXX');
replaceLastRE('hello hello hello', /hello/, 'bye');

console.log('XXXXX replaceLast String.replace XXXXX');
replaceLastSR('hello hello hello', /hello/, 'bye');
