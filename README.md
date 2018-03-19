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

`replace-last` supports string and RegExp replacement. It works in Node code and browsers.

[View the code](js/replaceLast.js) | File size 1.7 KB | Fully unit tested | Zero dependency



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

## Examples

```javascript 1.5
replaceLast('hello hello hello', 'hello', 'bye');
// => 'hello hello bye';

replaceLast('hello hello hello', /he(ll)o/, 'rr');
// => 'hello hello herro';

replaceLast('hello hello hello', RegExp('.ell.'), 'bye');
// => 'hello hello bye'

replaceLast(778, 8, 7);
// => '777'
```



<br>

## Author says

God is the **last**?

> "Behold, I (Jesus) am coming quickly, and My reward is with Me, to give to each one according to the merit of his deeds (earthly works, faithfulness).
> I am the Alpha and the Omega, the First and the Last, the Beginning and the End [the Eternal One]."

[REVELATION 22:12-13 AMP](https://www.bible.com/en-GB/bible/1588/REV.22.12-13.amp "Jesus loves you")

Jesus, King of Kings (**first**) put himself **last** - paying the death penalty for your wrongdoing - by willingly dying on the cross for you in your place.

He didn't do this because you loved Him. He did this even though you didn't love Him. He did this in the midst of all your hatred, your lust and worst of all, your apathy!

The nails never held him there, His love for you did! He commands men everywhere to repent and offers forgiveness for all them that believe!



<br><br><br>
