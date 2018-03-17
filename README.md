# replace-last

<br>[![linux](https://img.shields.io/travis/danday74/replace-last/master.svg?label=linux)](https://travis-ci.org/danday74/replace-last)
[![windows](https://img.shields.io/appveyor/ci/danday74/replace-last/master.svg?label=windows)](https://ci.appveyor.com/project/danday74/replace-last)
[![coverage](https://coveralls.io/repos/github/danday74/replace-last/badge.svg)](https://coveralls.io/github/danday74/replace-last)
<br>[![npm](https://img.shields.io/npm/v/replace-last.svg)](https://www.npmjs.com/package/replace-last)
[![dependencies](https://david-dm.org/danday74/replace-last/status.svg)](https://david-dm.org/danday74/replace-last)
[![downloads](https://img.shields.io/npm/dm/replace-last.svg)](https://www.npmjs.com/package/replace-last)
[![node](https://img.shields.io/node/v/replace-last.svg)](https://www.npmjs.com/package/replace-last)

**JavaScript replaceLast function - Replaces last match for pattern in string with replacement**



<br>

## Introduction

`npm install --save replace-last`

`replace-last` supports String and Regex replacement. It works in Node code and browsers.

[View the code](js/replaceLast.js) | File size is 1.5 KB | Fully unit tested



<br>

## Node

```javascript 1.5
var replaceLast = require('replace-last');
replaceLast(str, pattern, replacement);
```

## Browser

```html
<script src="node_modules/replace-last/replaceLast.js"></script>
<script>
  replaceLast(str, pattern, replacement);
</script>
```

## Arguments

str (string): The string to modify.

pattern (RegExp|string): The pattern to replace.

replacement (string): The match replacement.

## Returns

(string): Returns the modified string.

## Example

```javascript 1.5
replaceLast('hello hello hello', 'hello', 'bye');
// => 'hello hello bye'

replaceLast('hello hello hello', /hello/, 'bye');
// => 'hello hello bye'
```



<br>

## Author says

BIBLE STUFF HERE :D

<br><br><br>
