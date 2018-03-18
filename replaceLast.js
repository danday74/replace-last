var replaceLast =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst replaceLast = __webpack_require__(/*! ./js/replaceLast */ \"./js/replaceLast.js\");\n\nfunction main(str, pattern, replacement) {\n  return replaceLast(str, pattern, replacement);\n}\n\nmodule.exports = main;\n\n\n//# sourceURL=webpack://replaceLast/./index.js?");

/***/ }),

/***/ "./js/replaceLast.js":
/*!***************************!*\
  !*** ./js/replaceLast.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isRegex = function(any) {\n  return Object.prototype.toString.call(any) === '[object RegExp]';\n};\n\nvar regexReplaceLast = function(str, pattern, replacement) {\n  var flags;\n  /* istanbul ignore else */\n  if (pattern.flags != null) {\n    flags = (pattern.flags.indexOf('g') === -1) ? pattern.flags + 'g' : pattern.flags;\n  } else {\n    flags = 'g'; // Node 4 fix\n  }\n  pattern = new RegExp(pattern.source, flags);\n  return str.replace(pattern, function(match, offset, str) {\n    var follow = str.slice(offset);\n    var isLast = follow.match(pattern).length === 1;\n    return (isLast) ? replacement : match;\n  });\n};\n\nvar strReplaceLast = function(str, pattern, replacement) {\n  var i = str.lastIndexOf(pattern);\n  if (i < 0) return str;\n  var lhs = str.substring(0, i);\n  var rhs = str.substring(i + pattern.length, str.length);\n  return lhs + replacement + rhs;\n};\n\nvar replaceLast = function(str, pattern, replacement) {\n  str = '' + str;\n  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXX', arguments.length);\n  if (arguments.length < 3) return str;\n  if (isRegex(pattern)) {\n    return regexReplaceLast(str, pattern, replacement);\n  } else {\n    pattern = '' + pattern;\n    return strReplaceLast(str, pattern, replacement);\n  }\n};\n\nmodule.exports = replaceLast;\n\n\n//# sourceURL=webpack://replaceLast/./js/replaceLast.js?");

/***/ })

/******/ });