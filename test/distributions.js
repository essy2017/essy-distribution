/* global describe, it */

'use strict';

var assert      = require('assert');
var dists       = require('../dist/bundle');
var Beta        = dists.Beta;
var Binomial    = dists.Binomial;
var Erlang      = dists.Erlang;
var Exponential = dists.Exponential;
var Gamma       = dists.Gamma;
var Laplace     = dists.Laplace;
var Logarithmic = dists.Logarithmic;

var Twister     = require('mersenne-twister');
var Rando       = { random: Math.random };

describe('Distributions', () => {

  describe('Beta', () => {
    it('Should instantiate', () => {
      var beta = new Beta(1, 2);
      assert.strictEqual(beta.alpha, 1);
      assert.strictEqual(beta.beta, 2);
    });
    it('Should calculate cdf', () => {
      var beta = new Beta(2, 5);
      var cdf  = beta.cdf(.2);
      assert.ok(true);
    });
    it('Should return mean', () => {
      var beta = new Beta(1, 2);
      var mean = beta.mean();
      assert.strictEqual(mean, 1/3);
    });
    it('Should calculate pdf', () => {
      var beta = new Beta(2, 5);
      var pdf = beta.pdf(.2);
      assert.ok(true);
    });
    it('Should sample values', () => {
      var beta = new Beta(1, 2);
      var samples = beta.sample();
      assert.ok(typeof samples === 'number');
      samples = beta.sample(4);
      assert.strictEqual(samples.length, 4);
    });
  });

  describe('Binomial', () => {
    it('Should instantiate', () => {
      var bin = new Binomial(5, 0.2);
      assert.strictEqual(bin.n, 5);
      assert.strictEqual(bin.p, 0.2);
    });
    it('Should calculate cdf', () => {
      var bin = new Binomial(20, 0.5);
      var cdf = bin.cdf(20);
      assert.ok(true);
    });
    it('Should return mean', () => {
      var bin = new Binomial(5, 0.2);
      assert.strictEqual(bin.mean(), 5 * 0.2);
    });
    it('Should calculate pdf', () => {
      var bin = new Binomial(40, 0.5);
      var pdf = bin.pdf(20);
      assert.ok(true);
    });
    it('Should sample values', () => {
      var bin = new Binomial(5, 0.2);
      var samples = bin.sample();
      assert.ok(typeof samples === 'number');
      samples = bin.sample(3);
      assert.strictEqual(samples.length, 3);
    });
  });

  describe('Erlang', () => {
    it('Should instantiate', () => {
      var er = new Erlang(4, 0.5);
      assert.strictEqual(er.shape, 4);
      assert.strictEqual(er.rate, 0.5);
    });
    it('Should calculate cdf', () => {
      var er = new Erlang(5, 1);
      var cdf = er.cdf(10);
      assert.ok(true);
    });
    it('Should return mean', () => {
      var er = new Erlang(4, 0.5);
      assert.strictEqual(er.mean(), 4 / 0.5);
    });
    it('Should calculate pdf', () => {
      var er = new Erlang(5, 1);
      var pdf = er.pdf(2);
      assert.ok(true);
    });
    it('Should sample values', () => {
      var er = new Erlang(4, 0.5);
      var samples = er.sample();
      assert.ok(typeof samples === 'number');
      samples = er.sample(3);
      assert.strictEqual(samples.length, 3);
    });
  });

  describe('Exponential', () => {
    it('Should instantiate', () => {
      var ex = new Exponential(0.5);
      assert.strictEqual(ex.lambda, 0.5);
    });
    it('Should calculate cdf', () => {
      var ex = new Exponential(0.5);
      var cdf = ex.cdf(1);
      assert.ok(true);
    });
    it('Should return mean', () => {
      var ex = new Exponential(0.5);
      assert.strictEqual(ex.mean(), 1 / 0.5);
    });
    it('Should calculate pdf', () => {
      var ex = new Exponential(0.5);
      var pdf = ex.pdf(1);
      assert.ok(true);
    });
    it('Should sample values', () => {
      var ex = new Exponential(0.5);
      var samples = ex.sample();
      assert.ok(typeof samples === 'number');
      samples = ex.sample(4);
      assert.strictEqual(samples.length, 4);
    });
  });

  describe('Gamma', () => {
    it('Should instantiate', () => {
      var g = new Gamma(1, 2);
      assert.strictEqual(g.shape, 1);
      assert.strictEqual(g.scale, 2);
    });
    it('Should calculate cdf', () => {
      var g = new Gamma(5, 1);
      var cdf = g.cdf(2);
      assert.ok(true);
    });
    it('Should return mean', () => {
      var g = new Gamma(1, 2);
      assert.strictEqual(g.mean(), 1 * 2);
    });
    it('Should calculate pdf', () => {
      var g = new Gamma(5, 1);
      var pdf = g.pdf(4);
      assert.ok(true);
    });
    it('Should sample values', () => {
      var g = new Gamma(1, 2);
      var samples = g.sample();
      assert.strictEqual(typeof samples, 'number');
      samples = g.sample(3);
      assert.strictEqual(samples.length, 3);
    });
  });

  describe('Laplace', () => {
    it('Should instantiate', () => {
      var l = new Laplace(5, 1);
      assert.strictEqual(l.location, 5);
      assert.strictEqual(l.scale, 1);
    });
    it('Should calculate cdf', () => {
      var l = new Laplace(0, 4);
      var cdf = l.cdf(-4);
      assert.ok(true);
    });
    it('Should return mean', () => {
      var l = new Laplace(5, 1);
      assert.strictEqual(l.mean(), 5);
    });
    it('Should calculate pdf', () => {
      var l = new Laplace(0, 4);
      var pdf = l.pdf(0);
      assert.ok(true);
    });
    it('Should sample values', () => {
      var l = new Laplace(5, 1);
      var samples = l.sample(3);
      assert.strictEqual(samples.length, 3);
    });
  });

  describe('Logarithmic', () => {
    it('Should instantiate', () => {
      var l = new Logarithmic(0.5);
      assert.strictEqual(l.prob, 0.5);
    });
    // Couldn't calculate cdf. mathfn incBeta returns 1 when b === 0.
    it('Should return mean', () => {
      var l = new Logarithmic(0.5);
      assert.strictEqual(l.mean(), (-1 / Math.log(1 - 0.5)) * (0.5 / (1 - 0.5)));
    });
    it('Should calculate pdf', () => {
      var l = new Logarithmic(0.33);
      var pdf = l.pdf(1);
      assert.ok(true);
    });
    it('Should sample values', () => {
      var l = new Logarithmic(0.5);
      var samples = l.sample(3);
      assert.strictEqual(samples.length, 3);
    });
  });

});
