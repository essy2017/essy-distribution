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
var Logistic    = dists.Logistic;
var LogLogistic = dists.LogLogistic;
var LogNormal   = dists.LogNormal;
var Normal      = dists.Normal;
var Poisson     = dists.Poisson;
var Rayleigh    = dists.Rayleigh;
var StudentT    = dists.StudentT;
var Triangular  = dists.Triangular;
var Uniform     = dists.Uniform;
var Weibull     = dists.Weibull;

var Twister     = require('mersenne-twister');
var Rando       = { random: Math.random };

var mathfn      = require('mathfn');

describe('Distributions', () => {

  describe('Beta', () => {
    it('Should instantiate', () => {
      var beta = new Beta(1, 2);
      assert.strictEqual(beta.alpha, 1);
      assert.strictEqual(beta.beta, 2);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Beta(0, 1); }, RangeError);
      assert.throws(() => { new Beta(1, 0); }, RangeError);
    });
    it('Should calculate cdf', () => {
      var beta = new Beta(2, 5);
      var cdf  = beta.cdf(.2);
      assert.ok(true);
      assert.strictEqual(beta.cdf(-1), 0);
      assert.strictEqual(beta.cdf(1.5), 0);
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
      assert.strictEqual(beta.pdf(-1), 0);
      assert.strictEqual(beta.pdf(2), 0);
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
    it('Should enforce range', () => {
      assert.throws(() => { new Binomial(1.2, 0.2); }, RangeError);
      assert.throws(() => { new Binomial(1, 1.5); }, RangeError);
    });
    it('Should calculate cdf', () => {
      var bin = new Binomial(20, 0.5);
      var cdf = bin.cdf(20);
      assert.ok(true);
      assert.throws(() => { bin.cdf(1.5); }, RangeError);
    });
    it('Should return mean', () => {
      var bin = new Binomial(5, 0.2);
      assert.strictEqual(bin.mean(), 5 * 0.2);
    });
    it('Should calculate pdf', () => {
      var bin = new Binomial(40, 0.5);
      var pdf = bin.pdf(20);
      assert.ok(true);
      assert.throws(() => { bin.pdf(-1); }, RangeError);
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
    it('Should enfore range', () => {
      assert.throws(() => { new Erlang(-1, 0.5); }, RangeError);
      assert.throws(() => { new Erlang(1, -2); }, RangeError);
    });
    it('Should calculate cdf', () => {
      var er = new Erlang(5, 1);
      var cdf = er.cdf(10);
      assert.ok(true);
      assert.strictEqual(er.cdf(-1), 0);
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
    it('Should enforce range', () => {
      assert.throws(() => { new Exponential(0); }, RangeError);
    });
    it('Should calculate cdf', () => {
      var ex = new Exponential(0.5);
      var cdf = ex.cdf(1);
      assert.ok(true);
      assert.strictEqual(ex.cdf(-1), 0);
    });
    it('Should return mean', () => {
      var ex = new Exponential(0.5);
      assert.strictEqual(ex.mean(), 1 / 0.5);
    });
    it('Should calculate pdf', () => {
      var ex = new Exponential(0.5);
      var pdf = ex.pdf(1);
      assert.ok(true);
      assert.strictEqual(ex.pdf(-1), 0);
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
    it('Should enforce range', () => {
      assert.throws(() => { new Gamma(0, 1); }, RangeError);
      assert.throws(() => { new Gamma(1, 0); }, RangeError);
    });
    it('Should calculate cdf', () => {
      var g = new Gamma(5, 1);
      var cdf = g.cdf(2);
      assert.ok(true);
      assert.strictEqual(g.cdf(-1), 0);
    });
    it('Should return mean', () => {
      var g = new Gamma(1, 2);
      assert.strictEqual(g.mean(), 1 * 2);
    });
    it('Should calculate pdf', () => {
      var g = new Gamma(5, 1);
      var pdf = g.pdf(4);
      assert.ok(true);
      assert.strictEqual(g.pdf(-1), 0);
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
    it('Should enforce range', () => {
      assert.throws(() => { new Laplace(1, -1); }, RangeError);
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
    it('Should enforce range', () => {
      assert.throws(() => { new Logarithmic(-1); }, RangeError);
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
      assert.throws(() => { l.pdf(0.5); }, RangeError);
    });
    it('Should sample values', () => {
      var l = new Logarithmic(0.5);
      var samples = l.sample(3);
      assert.strictEqual(samples.length, 3);
    });
  });

  describe('Logistic', () => {
    it('Should instantiate', () => {
      var l = new Logistic(1, 0.5);
      assert.strictEqual(l.m, 1);
      assert.strictEqual(l.scale, 0.5);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Logistic(1, -1); }, RangeError);
    });
    it('Should calculate cdf', () => {
      var l = new Logistic(5, 2);
      var cdf = l.cdf(10);
      assert.ok(true);
    });
    it('Should return mean', () => {
      var l = new Logistic(1, 0.5);
      assert.strictEqual(l.mean(), 1);
    });
    it('Should calculate pdf', () => {
      var l = new Logistic(5, 2);
      var pdf = l.pdf(5);
      assert.ok(true);
    });
    it('Should sample values', () => {
      var l = new Logistic(1, 0.5);
      var samples = l.sample(2);
      assert.strictEqual(samples.length, 2);
    });
  });

  describe('LogLogistic', () => {
    it('Should instantiate', () => {
      var l = new LogLogistic(1, 2);
      assert.strictEqual(l.scale, 1);
      assert.strictEqual(l.shape, 2);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new LogLogistic(-1, 2); }, RangeError);
      assert.throws(() => { new LogLogistic(1, -2); }, RangeError);
    });
    it('Should calculate cdf', () => {
      var l = new LogLogistic(1, 1);
      var cdf = l.cdf(0.5);
      assert.ok(true);
      assert.strictEqual(l.cdf(-1), 0);
    });
    it('Should return mean', () => {
      var l = new LogLogistic(1, 1);
      assert.strictEqual(l.mean(), (1 * Math.PI / 1) / Math.sin(Math.PI / 1));
    });
    it('Should calculate pdf', () => {
      var l = new LogLogistic(1, 1);
      var pdf = l.pdf(1);
      assert.ok(true);
      assert.strictEqual(l.pdf(-1), 0);
    });
    it('Should sample values', () => {
      var l = new LogLogistic(1, 1);
      var samples = l.sample(2);
      assert.strictEqual(samples.length, 2);
    });
  });

  describe('LogNormal', () => {
    it('Should instantiate', () => {
      var l = new LogNormal(0, 1);
      assert.strictEqual(l.m, 0);
      assert.strictEqual(l.se, 1);
    });
    it('Should calculate cdf', () => {
      var l = new LogNormal(0, 0.25);
      var cdf = l.cdf(.75);
      assert.ok(true);
      assert.strictEqual(l.cdf(-1), 0);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new LogNormal(1, -1); }, RangeError);
    });
    it('Should return mean', () => {
      var l = new LogNormal(0, 1);
      assert.strictEqual(l.mean(), Math.exp(0 + Math.pow(1, 2)/2))
    });
    it('Should calculate pdf', () => {
      var l = new LogNormal(0, 0.25);
      var pdf = l.pdf(1.5);
      assert.ok(true);
      assert.strictEqual(l.pdf(-1), 0);
    });
    it('Should sample values', () => {
      var l = new LogNormal(0, 1);
      var samples = l.sample(2);
      assert.strictEqual(samples.length, 2);
    });
  });

  describe('Normal', () => {
    it('Should instantiate', () => {
      var n = new Normal(0, 1);
      assert.strictEqual(n.m, 0);
      assert.strictEqual(n.se, 1);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Normal(0, -1); }, RangeError);
    });
    it('Should calculate cdf', () => {
      var n = new Normal(0, 1);
      var cdf = n.cdf(0);
      assert.ok(true);
    });
    it('Should return mean', () => {
      var n = new Normal(0, 1);
      assert.strictEqual(n.mean(), 0);
    });
    it('Should calculate pdf', () => {
      var n = new Normal(0, 1);
      var pdf = n.pdf(0);
      assert.ok(true);
    });
    it('Should sample values', () => {
      var n = new Normal(0, 1);
      var samples = n.sample(2);
      assert.strictEqual(samples.length, 2);
    });
  });

  describe('Poisson', () => {
    it('Should instantiate', () => {
      var p = new Poisson(1);
      assert.strictEqual(p.lambda, 1);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Poisson(-1); }, RangeError);
    });
    it('Should calculate cdf', () => {
      var p = new Poisson(1);
      var cdf = p.cdf(0);
      assert.ok(true);
      assert.throws(() => { p.cdf(0.5); }, RangeError);
    });
    it('Should return mean', () => {
      var p = new Poisson(1);
      assert.strictEqual(p.mean(), 1);
    });
    it('Should calculate pdf', () => {
      var p = new Poisson(1);
      var pdf = p.pdf(2);
      assert.ok(true);
      assert.throws(() => { p.cdf(0.5); }, RangeError);
    });
    it('Should sample values', () => {
      var p = new Poisson(1);
      var samples = p.sample(3);
      assert.strictEqual(samples.length, 3);
    });
  });

  describe('Rayleigh', () => {
    it('Should instantiate', () => {
      var r = new Rayleigh(1);
      assert.strictEqual(r.scale, 1);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Rayleigh(-1); }, RangeError);
    });
    it('Should calculate cdf', () => {
      var r = new Rayleigh(2);
      var cdf = r.cdf(2);
      assert.ok(true);
      assert.strictEqual(r.cdf(-1), 0);
    });
    it('Should return mean', () => {
      var r = new Rayleigh(2);
      assert.strictEqual(r.mean(), 2 * Math.sqrt(Math.PI / 2));
    });
    it('Should calculate pdf', () => {
      var r = new Rayleigh(2);
      var pdf = r.pdf(2);
      assert.ok(true);
      assert.strictEqual(r.pdf(-1), 0);
    });
    it('Should sample values', () => {
      var r = new Rayleigh(2);
      var samples = r.sample(3);
      assert.strictEqual(samples.length, 3);
    });
  });

  describe('StudentT', () => {
    it('Should instantiate', () => {
      var s = new StudentT(2);
      assert.strictEqual(s.df, 2);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new StudentT(-1); }, RangeError);
    });
    it('Should calculate cdf', () => {
      var s = new StudentT(1);
      var cdf = s.cdf(1);
      assert.ok(true);
    });
    it('Should return mean', () => {
      var s = new StudentT(2);
      assert.strictEqual(s.mean(), 0);
    });
    it('Should calculate pdf', () => {
      var s = new StudentT(2);
      var pdf = s.pdf(1);
      assert.ok(true);
    });
    it('Should sample values', () => {
      var s = new StudentT(2);
      var samples = s.sample(3);
      assert.strictEqual(samples.length, 3);
    });
  });

  describe('Triangular', () => {
    it('Should instantiate', () => {
      var t = new Triangular(1, 2, 3);
      assert.strictEqual(t.min, 1);
      assert.strictEqual(t.mode, 2);
      assert.strictEqual(t.max, 3);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Triangular(1, 2, 0); }, RangeError);
      assert.throws(() => { new Triangular(1, 0, 3); }, RangeError);
      assert.throws(() => { new Triangular(1, 4, 3); }, RangeError);
    });
    it('Should calculate cdf', () => {
      var t = new Triangular(1, 2, 3);
      assert.strictEqual(t.cdf(0), 0);
      assert.strictEqual(t.cdf(1.5), Math.pow(1.5-1, 2) / ((3-1)*(2-1)));
      assert.strictEqual(t.cdf(2.5), 1 - Math.pow(3-2.5, 2) / ((3-1)*(3-2)));
      assert.strictEqual(t.cdf(4), 1);
    });
    it('Should return mean', () => {
      var t = new Triangular(1, 2, 3);
      assert.strictEqual(t.mean(), (1 + 2 + 3) / 3);
    });
    it('Should calculate pdf', () => {
      var t = new Triangular(1, 2, 3);
      assert.strictEqual(t.pdf(0), 0);
      assert.strictEqual(t.pdf(1.5), 2*(1.5-1)/((3-1)*(2-1)));
      assert.strictEqual(t.pdf(2), 2 / (3 - 1));
      assert.strictEqual(t.pdf(2.5), 2*(3-2.5)/((3-1)*(3-2)));
      assert.strictEqual(t.pdf(3.5), 0);
    });
    it('Should sample values', () => {
      var t = new Triangular(1, 2, 3);
      var samples = t.sample(3);
      assert.strictEqual(samples.length, 3);
    });
  });

  describe('Uniform', () => {
    it('Should instantiate', () => {
      var u = new Uniform(0, 1);
      assert.strictEqual(u.min, 0);
      assert.strictEqual(u.max, 1);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Uniform(0, 0); }, RangeError);
    });
    it('Should calculate cdf', () => {
      var u = new Uniform(0, 1);
      assert.strictEqual(u.cdf(-1), 0);
      assert.strictEqual(u.cdf(0.3), (0.3-0)/(1-0));
      assert.strictEqual(u.cdf(2), 1);
    });
    it('Should return mean', () => {
      var u = new Uniform(0, 1);
      assert.strictEqual(u.mean(), (1-0)/2);
    });
    it('Should calculate pdf', () => {
      var u = new Uniform(0, 1);
      assert.strictEqual(u.pdf(-1), 0);
      assert.strictEqual(u.pdf(0.3), 1 / (1-0));
      assert.strictEqual(u.pdf(1.3), 0);
    });
    it('Should sample values', () => {
      var u = new Uniform(0, 1);
      var samples = u.sample(2);
      assert.strictEqual(samples.length, 2);
    });
  });

  describe('Weibull', () => {
    it('Should instantiate', () => {
      var w = new Weibull(1, 2);
      assert.strictEqual(w.alpha, 1);
      assert.strictEqual(w.beta, 2);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Weibull(-1, 2); }, RangeError);
      assert.throws(() => { new Weibull(1, -2); }, RangeError);
    });
    it('Should calculate cdf', () => {
      var w = new Weibull(1, 1);
      var cdf = w.cdf(1);
      assert.ok(true);
    });
    it('Should return mean', () => {
      var w = new Weibull(1.5, 2);
      assert.strictEqual(w.mean(), 2 * mathfn.gamma(1 + 1/1.5))
    });
    it('Should calculate pdf', () => {
      var w = new Weibull(5, 1);
      var pdf = w.pdf(1);
      assert.ok(true);
    });
    it('Should sample values', () => {
      var w = new Weibull(1, 2);
      var samples = w.sample(3);
      assert.strictEqual(samples.length, 3);
    });
  });

});
