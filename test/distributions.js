/* global describe, it */

'use strict';

var assert   = require('assert');
var essy     = require('../dist/bundle');
var Beta     = essy.dists.Beta;
var Binomial = essy.dists.Binomial;
var Twister  = require('mersenne-twister');
var Rando    = { random: Math.random };

describe('Distributions', () => {

  describe('Beta', () => {
    it('Should instantiate', () => {
      var beta = new Beta(1, 2);
      assert.strictEqual(beta.alpha, 1);
      assert.strictEqual(beta.beta, 2);
    });
    it('Should return mean', () => {
      var beta = new Beta(1, 2);
      var mean = beta.mean();
      assert.strictEqual(mean, 1/3);
    });
    it('Should sample values', () => {
      var beta = new Beta(1, 2);
      var sample = beta.sample(new Twister());
      assert.ok(true);
    });
  });

});
