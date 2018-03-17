'use strict';

var chai = chai || require('chai');
var expect = chai.expect;
var replaceLast = replaceLast || require('./replaceLast');

describe('replaceLast', function() {

  describe('example', function() {

    it('string', function() {
      // var replaceLast = require('replace-last');
      var result = replaceLast('hello hello hello', 'hello', 'bye');
      expect(result).to.equal('hello hello bye');
    });

    it('regex', function() {
      // var replaceLast = require('replace-last');
      var result = replaceLast('hello hello hello', /hello/, 'bye');
      expect(result).to.equal('hello hello bye');
    });

    it('RegExp', function() {
      // var replaceLast = require('replace-last');
      var result = replaceLast('hello hello hello', RegExp('hello'), 'bye');
      expect(result).to.equal('hello hello bye');
    });
  });

  describe('string', function() {

    it('single', function() {
      var result = replaceLast('hello', 'hello', 'bye');
      expect(result).to.equal('bye');
    });

    it('many', function() {
      var result = replaceLast('hello hello', 'hello', 'bye');
      expect(result).to.equal('hello bye');
    });

    it('none', function() {
      var result = replaceLast('hello hello', 'bonjour', 'bye');
      expect(result).to.equal('hello hello');
    });

    it('contains regex chars', function() {
      var result = replaceLast('hello . hello . hello', '.', 'bye');
      expect(result).to.equal('hello . hello bye hello');
    });
  });

  describe('number', function() {

    it('single', function() {
      var result = replaceLast(9, 9, 8);
      expect(result).to.equal('8');
    });

    it('many', function() {
      var result = replaceLast(99, 9, 8);
      expect(result).to.equal('98');
    });

    it('none', function() {
      var result = replaceLast(99, 7, 8);
      expect(result).to.equal(99);
    });
  });

  describe('regex', function() {

    it('single', function() {
      var result = replaceLast('hello', /hello/, 'bye');
      expect(result).to.equal('bye');
    });

    it('many', function() {
      var result = replaceLast('hello hello', /hello/, 'bye');
      expect(result).to.equal('hello bye');
    });

    it('many with flag', function() {
      var result = replaceLast('hello hello', /hello/g, 'bye');
      expect(result).to.equal('hello bye');
    });

    it('none', function() {
      var result = replaceLast('hello hello', /bonjour/, 'bye');
      expect(result).to.equal('hello hello');
    });

    it('contains regex chars', function() {
      var result = replaceLast('hello . hello . hello', /./, 'bye');
      expect(result).to.equal('hello . hello . hellbye');
    });
  });

  describe('invalid', function() {

    it('str not a string', function() {
      var result = replaceLast({}, 'hello', 'bye');
      expect(result).to.eql({});
    });

    it('pattern not a regex or string', function() {
      var result = replaceLast('hello hello', {}, 'bye');
      expect(result).to.equal('hello hello');
    });

    it('replacement not a string', function() {
      var result = replaceLast('hello hello', 'hello', {});
      expect(result).to.equal('hello hello');
    });
  });
});
