'use strict';

var _ = _ || require('lodash');
var chai = chai || require('chai');
var expect = chai.expect;
var replaceLast = replaceLast || require('./replaceLast');

describe('replaceLast', function() {

  describe('example', function() {

    it('number', function() {
      var result = replaceLast(778, 8, 7);
      expect(result).to.equal('777');
    });

    it('string', function() {
      var result = replaceLast('hello hello hello', 'hello', 'bye');
      expect(result).to.equal('hello hello bye');
    });

    it('regex', function() {
      var result = replaceLast('hello hello hello', /he(ll)o/, 'rr');
      expect(result).to.equal('hello hello herro');
    });

    it('RegExp', function() {
      var result = replaceLast('hello hello hello', RegExp('.ell.'), 'bye');
      expect(result).to.equal('hello hello bye');
    });
  });

  describe('number', function() {

    it('none', function() {
      var result = replaceLast(99, 7, 8);
      expect(result).to.equal('99');
    });

    it('single', function() {
      var result = replaceLast(9, 9, 8);
      expect(result).to.equal('8');
    });

    it('many', function() {
      var result = replaceLast(99, 9, 8);
      expect(result).to.equal('98');
    });
  });

  describe('string', function() {

    it('none', function() {
      var result = replaceLast('hello hello', 'bonjour', 'bye');
      expect(result).to.equal('hello hello');
    });

    it('single', function() {
      var result = replaceLast('hello', 'hello', 'bye');
      expect(result).to.equal('bye');
    });

    it('many', function() {
      var result = replaceLast('hello hello', 'hello', 'bye');
      expect(result).to.equal('hello bye');
    });

    it('contains regex chars', function() {
      var result = replaceLast('hello . hello . hello', '.', 'bye');
      expect(result).to.equal('hello . hello bye hello');
    });
  });

  describe('regex', function() {

    it('none', function() {
      var result = replaceLast('hello hello', /bonjour/, 'bye');
      expect(result).to.equal('hello hello');
    });

    it('single', function() {
      var result = replaceLast('hello', /hello/, 'bye');
      expect(result).to.equal('bye');
    });

    it('many', function() {
      var result = replaceLast('hello hello', /hello/, 'bye');
      expect(result).to.equal('hello bye');
    });

    it('many with g flag', function() {
      var result = replaceLast('hello hello', /hello/g, 'bye');
      expect(result).to.equal('hello bye');
    });

    it('many with i flag', function() {
      var result = replaceLast('hello hello', /HELLO/i, 'bye');
      expect(result).to.equal('hello bye');
    });

    it('matching groups', function() {
      var result = replaceLast('hello hello', /he(ll)o/, 'rr');
      expect(result).to.equal('hello herro');
    });

    it('multiple matching groups', function() {
      var result = replaceLast('hello hello', /(ll)(o)/, 'r');
      expect(result).to.equal('hello herr');
    });

    it('contains regex chars', function() {
      var result = replaceLast('hello . hello . hello', /./, 'bye');
      expect(result).to.equal('hello . hello . hellbye');
    });
  });

  describe('RegExp', function() {

    it('none', function() {
      var result = replaceLast('hello hello', RegExp('bonjour'), 'bye');
      expect(result).to.equal('hello hello');
    });

    it('single', function() {
      var result = replaceLast('hello', RegExp('hello'), 'bye');
      expect(result).to.equal('bye');
    });

    it('many', function() {
      var result = replaceLast('hello hello', RegExp('hello'), 'bye');
      expect(result).to.equal('hello bye');
    });

    it('many with g flag', function() {
      var result = replaceLast('hello hello', RegExp('hello', 'g'), 'bye');
      expect(result).to.equal('hello bye');
    });

    it('many with i flag', function() {
      var result = replaceLast('hello hello', RegExp('HELLO', 'i'), 'bye');
      expect(result).to.equal('hello bye');
    });

    it('many with invalid flag', function() {
      expect(function() {
        replaceLast('hello hello', RegExp('hello', 'q'), 'bye'); // eslint-disable-line no-invalid-regexp
      }).to.throw(SyntaxError);
    });

    it('matching groups', function() {
      var result = replaceLast('hello hello', RegExp('he(ll)o'), 'rr');
      expect(result).to.equal('hello herro');
    });

    it('multiple matching groups', function() {
      var result = replaceLast('hello hello', RegExp('(ll)(o)'), 'r');
      expect(result).to.equal('hello herr');
    });

    it('contains regex chars', function() {
      var result = replaceLast('hello . hello . hello', RegExp('.'), 'bye');
      expect(result).to.equal('hello . hello . hellbye');
    });
  });

  describe('invalid', function() {

    function resultsFromArgs(str, pattern, replacement) {
      return {
        result: replaceLast(str, pattern, replacement),
        lodashResult: _.replace(str, pattern, replacement)
      };
    }

    it('str not a string', function() {
      var results = resultsFromArgs({}, 'hello', 'bye');
      expect(results.result).to.equal('[object Object]');
      expect(results.lodashResult).to.equal('[object Object]');
      expect(results.result).to.equal(results.lodashResult);
    });

    it('str undefined', function() {
      var results = resultsFromArgs(undefined, 'hello', 'bye');
      expect(results.result).to.equal('undefined');
      expect(results.lodashResult).to.equal(''); // inconsistent result, prefer 'undefined'
    });

    it('pattern not a regex or string', function() {
      var results = resultsFromArgs('hello hello', {}, 'bye');
      expect(results.result).to.equal('hello hello');
      expect(results.lodashResult).to.equal('hello hello');
      expect(results.result).to.equal(results.lodashResult);
    });

    it('pattern undefined', function() {
      var results = resultsFromArgs('hello hello', undefined, 'bye');
      expect(results.result).to.equal('hello hello');
      expect(results.lodashResult).to.equal('hello hello');
      expect(results.result).to.equal(results.lodashResult);
    });

    it('replacement not a string', function() {
      var results = resultsFromArgs('hello hello', 'hello', {});
      expect(results.result).to.equal('hello [object Object]');
      expect(results.lodashResult).to.equal('[object Object] hello');
    });

    it('replacement undefined', function() {
      var results = resultsFromArgs('hello hello', 'hello', undefined);
      // we use es5, lodash uses es6
      // es6 can reliably determine the number of arguments passed in, es5 arguments.length is inconsistent across envs
      // in es5 it is safer to return the original string where "replacement" is undefined,
      // regardless as to whether it was literally passed in as undefined or just not given
      // thus this result is consistent with the replacement not given result below
      expect(results.result).to.equal('hello hello');
      expect(results.lodashResult).to.equal('undefined hello');
    });

    it('replacement not given', function() {
      var result = replaceLast('hello hello', 'hello');
      expect(result).to.equal('hello hello');
      var lodashResult = _.replace('hello hello', 'hello');
      expect(lodashResult).to.equal('hello hello');
      expect(result).to.equal(lodashResult);
    });
  });
});
