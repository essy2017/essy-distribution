/* global describe, it */

'use strict';

var assert      = require('assert');
var dists       = require('../dist/bundle');
var Beta        = dists.Beta;
var Binomial    = dists.Binomial;
var Erlang      = dists.Erlang;
var Exponential = dists.Exponential;

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

});
