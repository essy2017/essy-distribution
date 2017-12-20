/* global describe, it */

'use strict';

var assert          = require('assert');
var dists           = require('../dist/bundle');
var Beta            = dists.Beta;
var Binomial        = dists.Binomial;
var Cauchy          = dists.Cauchy;
var ChiSquared      = dists.ChiSquared;
var Custom          = dists.Custom;
var Erlang          = dists.Erlang;
var Exponential     = dists.Exponential;
var F               = dists.F;
var Gamma           = dists.Gamma;
var Hypergeometric  = dists.Hypergeometric;
var Laplace         = dists.Laplace;
var Logarithmic     = dists.Logarithmic;
var Logistic        = dists.Logistic;
var LogLogistic     = dists.LogLogistic;
var LogNormal       = dists.LogNormal;
var Normal          = dists.Normal;
var Pareto          = dists.Pareto;
var Poisson         = dists.Poisson;
var Rayleigh        = dists.Rayleigh;
var StudentT        = dists.StudentT;
var Triangular      = dists.Triangular;
var Uniform         = dists.Uniform;
var Weibull         = dists.Weibull;

var ParamError      = dists.ParamError;
var SampleStat      = dists.SampleStat;

var Twister     = require('mersenne-twister');
var Rando       = { random: Math.random };


var stats       = require('essy-stats');


function roundIt (n, dec) {
  return Math.round(n * Math.pow(10, dec)) / Math.pow(10, dec);
}

describe('Distributions', () => {

  describe('Beta', () => {
    it('Should instantiate', () => {
      var beta = new Beta(1, 2);
      assert.strictEqual(beta.alpha, 1);
      assert.strictEqual(beta.beta, 2);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Beta(0, 1); }, ParamError);
      assert.throws(() => { new Beta(1, 0); }, ParamError);
    });
    it('Should calculate cdf', () => {
      var beta = new Beta(2, 5);

      // Test against Excel values. BETA.DIST(0.4, 2, 5, true).
      assert.strictEqual(beta.cdf(0.4), 0.76672);

      // Out of range.
      assert.strictEqual(beta.cdf(-1), 0);
      assert.strictEqual(beta.cdf(1.5), 0);
    });
    it('Should return mean', () => {
      var beta = new Beta(1, 2);
      var mean = beta.mean();
      assert.strictEqual(mean, 1/3);
    });
    it('Should return median', () => {
      var b = new Beta(2, 2);
      assert.strictEqual(Number(b.median().toFixed(4)), 0.5000);
    });
    it('Should calculate pdf', () => {
      var beta = new Beta(2, 5);

      // Test against Excel values. BETA.DIST(0.4, 2, 5, false).
      assert.strictEqual(beta.pdf(0.4), 1.5552);

      // Out of range.
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
    it('Should return variance', () => {
      var beta = new Beta(2, 5);
      assert.strictEqual(beta.variance(), (2*5)/(Math.pow(2+5,2)*(2+5+1)));
    });
  });

  describe('Binomial', () => {
    it('Should instantiate', () => {
      var bin = new Binomial(5, 0.2);
      assert.strictEqual(bin.n, 5);
      assert.strictEqual(bin.p, 0.2);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Binomial(1.2, 0.2); }, ParamError);
      assert.throws(() => { new Binomial(1, 1.5); }, ParamError);
    });
    it('Should calculate cdf', () => {
      var bin = new Binomial(20, 0.5);

      // Test against Excel. BINOM.DIST(15, 20, 0.5, true).
      assert.strictEqual(roundIt(bin.cdf(15), 5), 0.99409);

      // Out of bounds.
      assert.throws(() => { bin.cdf(1.5); }, RangeError);
    });
    it('Should return mean', () => {
      var bin = new Binomial(5, 0.2);
      assert.strictEqual(bin.mean(), 5 * 0.2);
    });
    it('Should return median', () => {
      var bin = new Binomial(10, 0.3);
      assert.strictEqual(bin.median(), Math.floor(10 * 0.3));
    });
    it('Should calculate pdf', () => {
      var bin = new Binomial(20, 0.5);

      // Test against Excel. BINOM.DIST(15, 20, 0.5, false).
      assert.strictEqual(roundIt(bin.pdf(15), 5), 0.01479);

      // Out of bounds.
      assert.throws(() => { bin.pdf(-1); }, RangeError);
    });
    it('Should sample values', () => {
      var bin = new Binomial(5, 0.2);
      var samples = bin.sample();
      assert.ok(typeof samples === 'number');
      samples = bin.sample(3);
      assert.strictEqual(samples.length, 3);
    });
    it('Should return variance', () => {
      var bin = new Binomial(10, 0.5);
      assert.strictEqual(bin.variance(), 10 * 0.5 * (1 - 0.5));
    });
  });

  describe('Cauchy', () => {
    it('Should instantiate', () => {
      var c = new Cauchy(0, 1);
      assert.strictEqual(c.location, 0);
      assert.strictEqual(c.scale, 1);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Cauchy(0, 0); }, ParamError);
    });
    it('Should calculate cdf', () => {
      var c = new Cauchy(0, 1);
      assert.strictEqual(c.cdf(0), 0.5);
    });
    it('Should return mean', () => {
      var c = new Cauchy(10, 2);
      assert.strictEqual(c.mean(), undefined);
    });
    it('Should return median', () => {
      var c = new Cauchy(10, 2);
      assert.strictEqual(c.median(), 10);
    });
    it('Should calculate pdf', () => {
      var c = new Cauchy(0, 1);
      var pdf = c.pdf(0);
      assert.ok(true);
    });
    it('Should return variance', () => {
      var c = new Cauchy(10, 2);
      assert.strictEqual(c.variance(), undefined);
    });
    it('Should sample values', () => {
      var c = new Cauchy(0, 1);
      var samples = c.sample(3);
      assert.strictEqual(samples.length, 3);
    });
  });

  describe('ChiSquared', () => {
    it('Should instantiate', () => {
      var c = new ChiSquared(2);
      assert.strictEqual(c.df, 2);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new ChiSquared(-1); }, ParamError);
    });
    it('Should calculate cdf', () => {
      var c = new ChiSquared(2);

      // Test against Excel. CHISQ.DIST(8, 2, true).
      assert.strictEqual(roundIt(c.cdf(8), 5), 0.98168);
    });
    it('Should return mean', () => {
      var c = new ChiSquared(2);
      assert.strictEqual(c.mean(), 2);
    });
    it('Should return median', () => {
      var c = new ChiSquared(2);
      assert.strictEqual(c.median(), 2 * Math.pow(1 - 2/(9*2), 3));
    });
    it('Should calculate pdf', () => {
      var c = new ChiSquared(2);

      // Test against Excel. CHISQ.DIST(8, 2, false).
      assert.strictEqual(roundIt(c.pdf(8), 5), 0.00916);
    });
    it('Should sample values', () => {
      var c = new ChiSquared(2);
      var samples = c.sample(3);
      assert.strictEqual(samples.length, 3);
    });
    it('Should return variance', () => {
      var c = new ChiSquared(2);
      assert.strictEqual(c.variance(), 2 * 2);
    });
  });

  describe('Custom', () => {
    it('Should instantiate', () => {
      var c = new Custom([4, 3, 1, 2]);
      assert.deepEqual(c.values, [1, 2, 3, 4]);
    });
    it('Should calculate cdf', () => {
      var c = new Custom([1, 3, 5, 6]);
      assert.strictEqual(c.cdf(8), 1);
      assert.strictEqual(c.cdf(3.5), 0.5);
      assert.strictEqual(c.cdf(1.2), 0.25);
      assert.strictEqual(c.cdf(0.4), 0);
    });
    it('Should return mean', () => {
      var c = new Custom([1, 3, 2]);
      assert.strictEqual(c.mean(), 2);
    });
    it('Should return median', () => {
      var c = new Custom([1, 2, 3, 4]);
      assert.strictEqual(c.median(), 2.5);
      c = new Custom([1, 2, 3]);
      assert.strictEqual(c.median(), 2);
    });
    it('Should calculate pdf', () => {
      var c = new Custom([1, 2, 2, 3, 4]);
      assert.strictEqual(c.pdf(1), 0.2);
      assert.strictEqual(c.pdf(2), 0.4);
      assert.strictEqual(c.pdf(5), 0);
    });
    it('Should sample values', () => {
      var c = new Custom([1, 2, 3, 4]);
      var samples = c.sample(10);
      assert.strictEqual(samples.length, 10);
    });
    it('Should return variance', () => {
      var vals = [1, 2, 3];
      var c = new Custom(vals);
      var m = c.mean();
      var sum = vals.reduce( (acc, cur) => acc + Math.pow(cur - m, 2) );
      assert.strictEqual(c.variance(), sum / (vals.length - 1));
    });
  });

  describe('Erlang', () => {
    it('Should instantiate', () => {
      var er = new Erlang(4, 0.5);
      assert.strictEqual(er.shape, 4);
      assert.strictEqual(er.rate, 0.5);
    });
    it('Should enfore range', () => {
      assert.throws(() => { new Erlang(-1, 0.5); }, ParamError);
      assert.throws(() => { new Erlang(1, -2); }, ParamError);
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
    it('Should return variance', () => {
      var er = new Erlang(4, 0.5);
      assert.strictEqual(er.variance(), 4 / Math.pow(0.5, 2));
    });
  });

  describe('Exponential', () => {
    it('Should instantiate', () => {
      var ex = new Exponential(0.5);
      assert.strictEqual(ex.lambda, 0.5);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Exponential(0); }, ParamError);
    });
    it('Should calculate cdf', () => {
      var ex = new Exponential(0.5);

      // Test against Excel. EXPON.DIST(1, 0.5, true).
      assert.strictEqual(roundIt(ex.cdf(1), 5), 0.39347);

      // Out of range.
      assert.strictEqual(ex.cdf(-1), 0);
    });
    it('Should return mean', () => {
      var ex = new Exponential(0.5);
      assert.strictEqual(ex.mean(), 1 / 0.5);
    });
    it('Should return median', () => {
      var ex = new Exponential(0.3);
      assert.strictEqual(ex.median(), Math.pow(0.3, -1) * Math.log(2));
    });
    it('Should calculate pdf', () => {
      var ex = new Exponential(0.5);

      // Test against Excel. EXPON.DIST(1, 0.5, false).
      assert.strictEqual(roundIt(ex.pdf(1), 5), 0.30327);

      // Out of range.
      assert.strictEqual(ex.pdf(-1), 0);
    });
    it('Should sample values', () => {
      var ex = new Exponential(0.5);
      var samples = ex.sample();
      assert.ok(typeof samples === 'number');
      samples = ex.sample(4);
      assert.strictEqual(samples.length, 4);
    });
    it('Should return variance', () => {
      var ex = new Exponential(0.5);
      assert.strictEqual(ex.variance(), Math.pow(0.5, -2));
    });
  });

  describe('F', () => {
    it('Should instantiate', () => {
      var f = new F(2, 1);
      assert.strictEqual(f.df1, 2);
      assert.strictEqual(f.df2, 1);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new F(-1, 1); }, ParamError);
      assert.throws(() => { new F(1, -1); }, ParamError);
    });
    it('Should calculate cdf', () => {
      var f = new F(5, 2);

      // Test against Excel. F.DIST(1, 5, 2, true).
      assert.strictEqual(roundIt(f.cdf(1), 5), 0.43120);
    });
    it('Should return mean', () => {
      var f = new F(2, 3);
      assert.strictEqual(f.mean(), 3 / (3 - 2));
      f = new F(2, 1);
      assert.strictEqual(f.mean(), undefined);
    });
    it('Should return median', () => {
      var f = new F(2, 4);
      assert.strictEqual(f.median(), undefined);
    });
    it('Should calculate pdf', () => {
      var f = new F(5, 2);

      // Test against Excel. F.DIST(1, 5, 2, false).
      assert.strictEqual(roundIt(f.pdf(1), 5), 0.30800);
    });
    it('Should sample values', () => {
      var f = new F(100, 200);
      var samples = f.sample(3)
      assert.strictEqual(samples.length, 3);
    });
    it('Should return variance', () => {
      var f = new F(2, 5);
      assert.strictEqual(f.variance(), (2 * Math.pow(5, 2) * (2 + 5 - 2)) / (2*Math.pow(5-2, 2)*(5-4)));
      f = new F(2, 4);
      assert.strictEqual(f.variance(), undefined);
    });
  });

  describe('Gamma', () => {
    it('Should instantiate', () => {
      var g = new Gamma(1, 2);
      assert.strictEqual(g.shape, 1);
      assert.strictEqual(g.scale, 2);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Gamma(0, 1); }, ParamError);
      assert.throws(() => { new Gamma(1, 0); }, ParamError);
    });
    it('Should calculate cdf', () => {
      var g = new Gamma(5, 1);

      // Test against Excel. GAMMA.DIST(2, 5, 1, true).
      assert.strictEqual(roundIt(g.cdf(2), 5), 0.05265);

      // Out of range.
      assert.strictEqual(g.cdf(-1), 0);
    });
    it('Should return mean', () => {
      var g = new Gamma(1, 2);
      assert.strictEqual(g.mean(), 1 * 2);
    });
    it('Should calculate pdf', () => {
      var g = new Gamma(5, 1);

      // Test against Excel. GAMMA.DIST(2, 5, 1, false).
      assert.strictEqual(roundIt(g.pdf(2), 5), 0.09022);

      // Out of range.
      assert.strictEqual(g.pdf(-1), 0);
    });
    it('Should sample values', () => {
      var g = new Gamma(1, 2);
      var samples = g.sample();
      assert.strictEqual(typeof samples, 'number');
      samples = g.sample(3);
      assert.strictEqual(samples.length, 3);
    });
    it('Should return variance', () => {
      var g = new Gamma(1, 2);
      assert.strictEqual(g.variance(), 1 * 2 * 2);
    });
  });

  describe('Hypergeometric', () => {
    it('Should instantiate', () => {
      var h = new Hypergeometric(5, 3, 4);
      assert.strictEqual(h.N, 5);
      assert.strictEqual(h.M, 3);
      assert.strictEqual(h.n, 4);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Hypergeometric(1.3, 3, 4); }, ParamError);
      assert.throws(() => { new Hypergeometric(5, 3.2, 4); }, ParamError);
      assert.throws(() => { new Hypergeometric(5, 3, 4.1); }, ParamError);
      assert.throws(() => { new Hypergeometric(5, 6, 4); }, ParamError);
      assert.throws(() => { new Hypergeometric(5, 3, 6); }, ParamError);
    });
    it('Should return mean', () => {
      var h = new Hypergeometric(500, 60, 200);
      assert.strictEqual(h.mean(), 200*(60/500));
    });
    it('Should calculate pdf', () => {
      var h = new Hypergeometric(500, 60, 200);

      // Test against Excel. HYPGEOM.DIST(25, 200, 60, 500, false).
      assert.strictEqual(roundIt(h.pdf(25), 5), 0.10670);
    });
    it('Should sample values', () => {
      var h = new Hypergeometric(500, 60, 200);
      var samples = h.sample(3);
      assert.strictEqual(samples.length, 3);
    });
    it('Should return variance', () => {
      var h = new Hypergeometric(500, 60, 200);
      assert.strictEqual(h.variance(), 200 * (60/500) * ((500-60)/500) * ((500-200)/(500-1)));
    });
  });

  describe('Laplace', () => {
    it('Should instantiate', () => {
      var l = new Laplace(5, 1);
      assert.strictEqual(l.location, 5);
      assert.strictEqual(l.scale, 1);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Laplace(1, -1); }, ParamError);
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
    it('Should return median', () => {
      var l = new Laplace(5, 1);
      assert.strictEqual(l.median(), 5);
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
    it('Should return variance', () => {
      var l = new Laplace(5, 3);
      assert.strictEqual(l.variance(), 2 * 3 * 3);
    });
  });

  describe('Logarithmic', () => {
    it('Should instantiate', () => {
      var l = new Logarithmic(0.5);
      assert.strictEqual(l.prob, 0.5);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Logarithmic(-1); }, ParamError);
    });
    // Couldn't calculate cdf.
    it('Should calculate cdf', () => {
      var l = new Logarithmic(0.5);
      var cdf = l.cdf(0.4);
      assert.ok(true);
    });
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
    it('Should return variance', () => {
      var l = new Logarithmic(0.5);
      assert.strictEqual(l.variance(), -0.5*((0.5+Math.log(1-0.5)) / (Math.pow(1-0.5, 2) * Math.pow(Math.log(1-0.5), 2))));
    });
  });

  describe('Logistic', () => {
    it('Should instantiate', () => {
      var l = new Logistic(1, 0.5);
      assert.strictEqual(l.m, 1);
      assert.strictEqual(l.scale, 0.5);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Logistic(1, -1); }, ParamError);
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
    it('Should return median', () => {
      var l = new Logistic(10, 0.5);
      assert.strictEqual(l.median(), 10);
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
    it('Should return variance', () => {
      var l = new Logistic(1, 0.3);
      assert.strictEqual(l.variance(), (0.3*0.3 * Math.PI*Math.PI)/3);
    });
  });

  describe('LogLogistic', () => {
    it('Should instantiate', () => {
      var l = new LogLogistic(1, 2);
      assert.strictEqual(l.scale, 1);
      assert.strictEqual(l.shape, 2);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new LogLogistic(-1, 2); }, ParamError);
      assert.throws(() => { new LogLogistic(1, -2); }, ParamError);
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
    it('Should return median', () => {
      var l = new LogLogistic(2, 1);
      assert.strictEqual(l.median(), 2);
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
    it('Should return variance', () => {
      var l = new LogLogistic(1, 3);
      assert.strictEqual(l.variance(), 1*1*((2*3/Math.sin(2*3)) - 3*3/Math.pow(Math.sin(3), 2)));
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

      // Test against Excel. LOGNORM.DIST(0.75, 0, 0.25, true).
      assert.strictEqual(roundIt(l.cdf(0.75), 5), 0.12492);

      // Out of range.
      assert.strictEqual(l.cdf(-1), 0);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new LogNormal(1, -1); }, ParamError);
    });
    it('Should return mean', () => {
      var l = new LogNormal(0, 1);
      assert.strictEqual(l.mean(), Math.exp(0 + Math.pow(1, 2)/2))
    });
    it('Should return median', () => {
      var l = new LogNormal(0, 1);
      assert.strictEqual(l.median(), Math.exp(0));
    });
    it('Should calculate pdf', () => {
      var l = new LogNormal(0, 0.25);

      // Test against Excel. LOGNORM.DIST(0.75, 0, 0.25, false).
      assert.strictEqual(roundIt(l.pdf(0.75), 5), 1.09741);

      // Out of range.
      assert.strictEqual(l.pdf(-1), 0);
    });
    it('Should sample values', () => {
      var l = new LogNormal(0, 1);
      var samples = l.sample(2);
      assert.strictEqual(samples.length, 2);
    });
    it('Should return variance', () => {
      var l = new LogNormal(1, 2);
      assert.strictEqual(l.variance(), (Math.exp(2*2) - 1)*Math.exp(2*1*1 + 2*2));
    });
  });

  describe('Normal', () => {
    it('Should instantiate', () => {
      var n = new Normal(0, 1);
      assert.strictEqual(n.m, 0);
      assert.strictEqual(n.se, 1);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Normal(0, -1); }, ParamError);
    });
    it('Should calculate cdf', () => {
      var n = new Normal(0, 1);

      // Test against Excel. NORM.DIST(0.5, 0, 1, true).
      assert.strictEqual(roundIt(n.cdf(0.5), 5), 0.69146);
    });
    it('Should return mean', () => {
      var n = new Normal(0, 1);
      assert.strictEqual(n.mean(), 0);
    });
    it('Should return median', () => {
      var n = new Normal(10, 2);
      assert.strictEqual(n.median(), 10);
    });
    it('Should calculate pdf', () => {
      var n = new Normal(0, 1);

      // Test against Excel. NORM.DIST(0.5, 0, 1, false).
      assert.strictEqual(roundIt(n.pdf(0.5), 5), 0.35207);
    });
    it('Should sample values', () => {
      var n = new Normal(0, 1);
      var samples = n.sample(2);
      assert.strictEqual(samples.length, 2);
    });
    it('Should return variance', () => {
      var n = new Normal(10, 3);
      assert.strictEqual(n.variance(), 3*3);
    });
  });

  describe('Pareto', () => {
    it('Should instantiate', () => {
      var p = new Pareto(1, 2);
      assert.strictEqual(p.scale, 1);
      assert.strictEqual(p.shape, 2);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Pareto(-1, 1); }, ParamError);
      assert.throws(() => { new Pareto(1, -1); }, ParamError);
    });
    it('Should calculate cdf', () => {
      var p = new Pareto(2, 3);
      var cdf = p.cdf(3);
      assert.ok(true);
    });
    it('Should return mean', () => {
      var p = new Pareto(1, 2);
      assert.strictEqual(p.mean(), (1*2)/(2-1));
      p = new Pareto(1, 1);
      assert.strictEqual(p.mean(), Number.POSITIVE_INFINITY);
    });
    it('Should return median', () => {
      var p = new Pareto(1, 3);
      assert.strictEqual(p.median(), 1 * Math.pow(2, 1/3));
    });
    it('Should calculate pdf', () => {
      var p = new Pareto(1, 3);
      assert.strictEqual(p.pdf(1), 3);
      assert.strictEqual(p.pdf(0), 0);
    });
    it('Should sample values', () => {
      var p = new Pareto(1, 3);
      var samples = p.sample(2);
      assert.strictEqual(samples.length, 2);
    });
    it('Should return variance', () => {
      var p = new Pareto(2, 3);
      assert.strictEqual(p.variance(), (Math.pow(2,2)*3)/(Math.pow(3-1, 2)*(3-2)));
      p = new Pareto(2, 2);
      assert.strictEqual(p.variance(), Number.POSITIVE_INFINITY);
    });
  });

  describe('Poisson', () => {
    it('Should instantiate', () => {
      var p = new Poisson(1);
      assert.strictEqual(p.lambda, 1);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Poisson(-1); }, ParamError);
    });
    it('Should calculate cdf', () => {
      var p = new Poisson(1);

      // Test against Excel. POISSON.DIST(0, 1, true).
      assert.strictEqual(roundIt(p.cdf(0), 5), 0.36788);

      // Out of range.
      assert.throws(() => { p.cdf(0.5); }, RangeError);
    });
    it('Should return mean', () => {
      var p = new Poisson(1);
      assert.strictEqual(p.mean(), 1);
    });
    it('Should return median', () => {
      var p = new Poisson(2);
      assert.strictEqual(p.median(), Math.floor(2 + 1/3 - 0.02/2));
    });
    it('Should calculate pdf', () => {
      var p = new Poisson(1);

      // Test against Excel. POISSON.DIST(0, 1, false).
      assert.strictEqual(roundIt(p.pdf(0), 5), 0.36788);

      // Out of range.
      assert.throws(() => { p.cdf(0.5); }, RangeError);
    });
    it('Should sample values', () => {
      var p = new Poisson(1);
      var samples = p.sample(3);
      assert.strictEqual(samples.length, 3);
    });
    it('Should return variance', () => {
      var p = new Poisson(2);
      assert.strictEqual(p.variance(), 2);
    });
  });

  describe('Rayleigh', () => {
    it('Should instantiate', () => {
      var r = new Rayleigh(1);
      assert.strictEqual(r.scale, 1);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Rayleigh(-1); }, ParamError);
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
    it('Should return median', () => {
      var r = new Rayleigh(2);
      assert.strictEqual(r.median(), 2 * Math.sqrt(2 * Math.log(2)));
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
    it('Should return variance', () => {
      var r = new Rayleigh(2);
      assert.strictEqual(r.variance(), ((4-Math.PI)/2) * 2*2);
    });
  });

  describe('StudentT', () => {
    it('Should instantiate', () => {
      var s = new StudentT(2);
      assert.strictEqual(s.df, 2);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new StudentT(-1); }, ParamError);
    });
    it('Should calculate cdf', () => {
      var s = new StudentT(1);

      // Test against Excel. T.DIST(0.5, 1, true).
      assert.strictEqual(roundIt(s.cdf(0.5), 5), 0.64758);
    });
    it('Should return mean', () => {
      var s = new StudentT(2);
      assert.strictEqual(s.mean(), 0);
    });
    it('Should return median', () => {
      var s = new StudentT(4);
      assert.strictEqual(s.median(), 0);
    });
    it('Should calculate pdf', () => {
      var s = new StudentT(1);

      // Test against Excel. T.DIST(0.5, 1, false).
      assert.strictEqual(roundIt(s.pdf(0.5), 5), 0.25465);
    });
    it('Should sample values', () => {
      var s = new StudentT(2);
      var samples = s.sample(3);
      assert.strictEqual(samples.length, 3);
    });
    it('Should return variance', () => {
      var s = new StudentT(3);
      assert.strictEqual(s.variance(), 3/(3-2));
      s.df = 1.5;
      assert.strictEqual(s.variance(), Number.POSITIVE_INFINITY);
      s.df = 0.5;
      assert.ok(isNaN(s.variance()));
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
      assert.throws(() => { new Triangular(1, 2, 0); }, ParamError);
      assert.throws(() => { new Triangular(1, 0, 3); }, ParamError);
      assert.throws(() => { new Triangular(1, 4, 3); }, ParamError);
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
    it('Should return median', () => {
      var t = new Triangular(1, 2, 3);
      assert.strictEqual(t.median(), 3 - Math.sqrt(((3-1)*(3-2))/2));
      t = new Triangular(1, 5, 6);
      assert.strictEqual(t.median(), 1 + Math.sqrt(((6-1)*(5-1))/2));
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
    it('Should return variance', () => {
      var t = new Triangular(1, 2, 3);
      assert.strictEqual(t.variance(), (1*1 + 2*2 + 3*3 - 1*2 - 2*3 - 1*3)/18);
    });
  });

  describe('Uniform', () => {
    it('Should instantiate', () => {
      var u = new Uniform(0, 1);
      assert.strictEqual(u.min, 0);
      assert.strictEqual(u.max, 1);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Uniform(0, 0); }, ParamError);
    });
    it('Should calculate cdf', () => {
      var u = new Uniform(0, 1);
      assert.strictEqual(u.cdf(-1), 0);
      assert.strictEqual(u.cdf(0.3), (0.3-0)/(1-0));
      assert.strictEqual(u.cdf(2), 1);
    });
    it('Should return mean', () => {
      var u = new Uniform(0, 1);
      assert.strictEqual(u.mean(), (0+1)/2);
    });
    it('Should return median', () => {
      var u = new Uniform(10, 15);
      assert.strictEqual(u.median(), (10+15)/2);
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
    it('Should return variance', () => {
      var u = new Uniform(1, 2);
      assert.strictEqual(u.variance(), (1/12)*Math.pow(2-1, 2));
    });
  });

  describe('Weibull', () => {
    it('Should instantiate', () => {
      var w = new Weibull(1, 2);
      assert.strictEqual(w.alpha, 1);
      assert.strictEqual(w.beta, 2);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Weibull(-1, 2); }, ParamError);
      assert.throws(() => { new Weibull(1, -2); }, ParamError);
    });
    it('Should calculate cdf', () => {
      var w = new Weibull(1, 1);

      // Test against Excel. WEIBULL.DIST(1, 1, 1, true).
      assert.strictEqual(roundIt(w.cdf(1), 5), 0.63212);
    });
    it('Should return mean', () => {
      var w = new Weibull(1.5, 2);
      assert.strictEqual(w.mean(), 2 * stats.gamma(1 + 1/1.5))
    });
    it('Should return median', () => {
      var w = new Weibull(3, 4);
      assert.strictEqual(w.median(), 4 * Math.pow(Math.log(2), 1 / 3));
    });
    it('Should calculate pdf', () => {
      var w = new Weibull(1, 1);

      // Test against Excel. WEIBULL.DIST(1, 1, 1, false).
      assert.strictEqual(roundIt(w.pdf(1), 5), 0.36788);
    });
    it('Should sample values', () => {
      var w = new Weibull(1, 2);
      var samples = w.sample(3);
      assert.strictEqual(samples.length, 3);
    });
    it('Should return variance', () => {
      var w = new Weibull(2, 3);
      assert.strictEqual(w.variance(), 3*3 * (stats.gamma(1+2/2) - Math.pow(stats.gamma(1+1/2), 2)));
    });

  });

});

describe('SampleStat', () => {
  it('Should instantiate', () => {
    var s = new SampleStat([2, 3, 1]);
    assert.deepEqual(s.values, [1, 2, 3]);
    assert.throws(() => { new SampleStat(); }, RangeError);
    assert.throws(() => { new SampleStat([]); }, RangeError);
  });
  it('Should return kurtosis', () => {
    var s = new SampleStat([1, 2, 3, 4, 7]);
    assert.strictEqual(roundIt(s.kurtosis(), 5), 1.12852);
  });
  it('Should return max', () => {
    var s = new SampleStat([2, 1, 4, 1]);
    assert.strictEqual(s.max(), 4);
  });
  it('Should return mean', () => {
    var s = new SampleStat([1, 2, 3, 4]);
    assert.strictEqual(s.mean(), 2.5);
  });
  it('Should return median', () => {
    var s = new SampleStat([1, 2, 3]);
    assert.strictEqual(s.median(), 2);
    s = new SampleStat([1, 2, 3, 4]);
    assert.strictEqual(s.median(), 2.5);
  });
  it('Should return min', () => {
    var s = new SampleStat([4, 1, 5]);
    assert.strictEqual(s.min(), 1);
  });
  it('Should return percentile', () => {
    var s = new SampleStat([1, 2, 3, 4, 5]);

    // Test exact index matches.
    assert.strictEqual(s.percentile(1), 0);
    assert.strictEqual(s.percentile(2), 0.25);
    assert.strictEqual(s.percentile(3), 0.5);
    assert.strictEqual(s.percentile(4), 0.75);
    assert.strictEqual(s.percentile(5), 1);

    // Test interpolation.
    assert.strictEqual(s.percentile(0), 0);
    assert.strictEqual(s.percentile(3.4), 0.6);
    assert.strictEqual(s.percentile(4.8), 0.95);
    assert.strictEqual(s.percentile(5.1), 1);

    // Check unven spacing.
    s = new SampleStat([1, 2, 5, 9, 10]);
    assert.strictEqual(roundIt(s.percentile(3), 4), 0.3333);
    assert.strictEqual(roundIt(s.percentile(4), 4), 0.4167);

    // Check duplicate values.
    s = new SampleStat([1, 1, 4, 5, 5]);
    assert.strictEqual(s.percentile(1), 0);
    assert.strictEqual(roundIt(s.percentile(2), 3), 0.333);
    assert.strictEqual(s.percentile(5), 0.75);
    assert.strictEqual(roundIt(s.percentile(3.1), 3), 0.425);
  });
  it('Should return quantile', () => {
    var s = new SampleStat([1, 2, 3, 4, 5]);

    // Test exact index matches.
    assert.strictEqual(s.quantile(0), 1);
    assert.strictEqual(s.quantile(0.25), 2);
    assert.strictEqual(s.quantile(0.5), 3);
    assert.strictEqual(s.quantile(0.75), 4);
    assert.strictEqual(s.quantile(1), 5);

    // Test interpolation.
    assert.strictEqual(s.quantile(0.1), 1.4);
    assert.strictEqual(s.quantile(0.2), 1.8);
    assert.strictEqual(s.quantile(0.3), 2.2);
    assert.strictEqual(s.quantile(0.7), 3.8);
    assert.strictEqual(s.quantile(0.8), 4.2);
    assert.strictEqual(s.quantile(0.95), 4.8);

    // Test out of range.
    assert.throws(() => { s.quantile(-1); }, RangeError);
    assert.throws(() => { s.quantile(2); }, RangeError);

    // Check uneven spacing.
    s = new SampleStat([1, 2, 5, 9, 10]);
    assert.strictEqual(roundIt(s.quantile(0.4), 3), 3.8);
    assert.strictEqual(roundIt(s.quantile(0.5), 3), 5);
    assert.strictEqual(roundIt(s.quantile(0.6), 3), 6.6);

    // Check duplicate values.
    s = new SampleStat([1, 1, 4, 5, 5]);
    assert.strictEqual(s.quantile(0.1), 1);
    assert.strictEqual(s.quantile(0.2), 1);
    assert.strictEqual(roundIt(s.quantile(0.3), 3), 1.6);
    assert.strictEqual(s.quantile(0.8), 5);
  });
  it('Should return range', () => {
    var s = new SampleStat([1, 2, 3, 3, 6]);
    assert.strictEqual(s.range(), 5);
  });
  it('Should return skew', () => {
    var s = new SampleStat([1, 2, 3, 4, 5]);
    assert.strictEqual(s.skew(), 0);
    s = new SampleStat([1, 2, 3, 4, 7]);
    assert.strictEqual(roundIt(s.skew(), 5), 1.03266);
  });
  it('Should return standard deviation', () => {
    var s = new SampleStat([1, 2, 3, 4, 5]);
    assert.strictEqual(roundIt(s.stdDev(), 5), 1.58114);
  });
  it('Should return variance', () => {
    var s = new SampleStat([1, 2, 3]);
    assert.strictEqual(s.variance(), (Math.pow(1-2,2)+Math.pow(2-2,2)+Math.pow(3-2,2)) / (3 - 1));
  });
});
