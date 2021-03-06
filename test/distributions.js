/* global describe, it */

'use strict';

var assert           = require('assert');
var dists            = require('../dist/bundle');
var Beta             = dists.Beta;
var Binomial         = dists.Binomial;
var Cauchy           = dists.Cauchy;
var ChiSquared       = dists.ChiSquared;
var Custom           = dists.Custom;
var Erlang           = dists.Erlang;
var Exponential      = dists.Exponential;
var F                = dists.F;
var Gamma            = dists.Gamma;
var Hypergeometric   = dists.Hypergeometric;
var Laplace          = dists.Laplace;
var Levy             = dists.Levy;
var Logarithmic      = dists.Logarithmic;
var Logistic         = dists.Logistic;
var LogLogistic      = dists.LogLogistic;
var LogNormal        = dists.LogNormal;
var NegativeBinomial = dists.NegativeBinomial;
var Normal           = dists.Normal;
var Pareto           = dists.Pareto;
var Poisson          = dists.Poisson;
var Rayleigh         = dists.Rayleigh;
var StudentT         = dists.StudentT;
var Triangular       = dists.Triangular;
var Uniform          = dists.Uniform;
var Weibull          = dists.Weibull;

var ParamError       = dists.ParamError;

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
    it('Should calculate kurtosis', () => {
      var b = new Beta(2, 3);
      var num = 3*(2+3+1)*(2*Math.pow(2+3,2) + 2*3*(2+3-6));
      var den = 2*3*(2+3+2)*(2+3+3);
      assert.strictEqual(b.kurtosis(), (num / den) - 3);
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
    it('Should return mode', () => {
      var b = new Beta(2, 3);
      assert.strictEqual(b.mode(), (2 - 1) / (2 + 3 - 2));
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
    it('Should return skewness', () => {
      var b = new Beta(2, 3);
      assert.strictEqual(b.skewness(), (2*(3-2)*Math.sqrt(2+3+1)) / (Math.sqrt(2)*Math.sqrt(3)*(2+3+2)));
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

      // Test against Excel. BINOM.DIST(9.9, 20, 0.5, true).
      assert.strictEqual(roundIt(bin.cdf(9.9), 5), 0.4119);

    });
    it('Should return kurtosis', () => {
      var bin = new Binomial(5, 0.3);
      assert.strictEqual(bin.kurtosis(), (1-6*(1-0.3)*0.3)/(5*(1-0.3)*0.3));
    });
    it('Should return mean', () => {
      var bin = new Binomial(5, 0.2);
      assert.strictEqual(bin.mean(), 5 * 0.2);
    });
    it('Should return median', () => {
      var bin = new Binomial(10, 0.3);
      assert.strictEqual(bin.median(), Math.floor(10 * 0.3));
    });
    it('Should calculate mode', () => {
      var bin = new Binomial(10, 0.4);
      assert.strictEqual(bin.mode(), Math.floor(0.4*(10 + 1)));
    });
    it('Should calculate pdf', () => {
      var bin = new Binomial(20, 0.5);

      // Test against Excel. BINOM.DIST(15, 20, 0.5, false).
      assert.strictEqual(roundIt(bin.pdf(15), 5), 0.01479);

      // Test against Excel. BINOM.DIST(9.9, 20, 0.5, false).
      assert.strictEqual(roundIt(bin.pdf(9.9), 5), 0.16018);

    });
    it('Should sample values', () => {
      var bin = new Binomial(5, 0.2);
      var samples = bin.sample();
      assert.ok(typeof samples === 'number');
      samples = bin.sample(3);
      assert.strictEqual(samples.length, 3);
    });
    it('Should return skewness', () => {
      var bin = new Binomial(3, 0.2);
      assert.strictEqual(bin.skewness(), (1-2*0.2)/(Math.sqrt(3*(1-0.2)*0.2)));
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
      assert.strictEqual(c.cdf(1), 0.75);
    });
    it('Should return mean', () => {
      var c = new Cauchy(10, 2);
      assert.strictEqual(c.mean(), undefined);
    });
    it('Should return median', () => {
      var c = new Cauchy(10, 2);
      assert.strictEqual(c.median(), 10);
    });
    it('Should return mode', () => {
      var c = new Cauchy(10, 2);
      assert.strictEqual(c.mode(), 10);
    });
    it('Should calculate pdf', () => {
      var c = new Cauchy(0, 1);

      // Test against keisan.casio.com.
      assert.strictEqual(roundIt(c.pdf(0), 5), 0.31831);
      assert.strictEqual(roundIt(c.pdf(1), 5), 0.15915);

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
    it('Should return kurtosis', () => {
      var c = new ChiSquared(2);
      assert.strictEqual(c.kurtosis(), 12/2);
    });
    it('Should return mean', () => {
      var c = new ChiSquared(2);
      assert.strictEqual(c.mean(), 2);
    });
    it('Should return median', () => {
      var c = new ChiSquared(2);
      assert.strictEqual(c.median(), 2 * Math.pow(1 - 2/(9*2), 3));
    });
    it('Should return mode', () => {
      var c = new ChiSquared(5);
      assert.strictEqual(c.mode(), 3);
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
    it('Should return skewness', () => {
      var c = new ChiSquared(2);
      assert.strictEqual(c.skewness(), 2 * Math.sqrt(2) * Math.sqrt(1/2));
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
    it('Should return kurtosis', () => {
      var er = new Erlang(5, 2);
      assert.strictEqual(er.kurtosis(), 6/5);
    });
    it('Should return mean', () => {
      var er = new Erlang(4, 0.5);
      assert.strictEqual(er.mean(), 4 / 0.5);
    });
    it('Should return mode', () => {
      var e = new Erlang(4, 6);
      assert.strictEqual(e.mode(), (1 / 6)*(4 - 1));
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
    it('Should return skewness', () => {
      var er = new Erlang(5, 2);
      assert.strictEqual(er.skewness(), 2 / Math.sqrt(5));
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
    it('Should return mode', () => {
      var ex = new Exponential(4);
      assert.strictEqual(ex.mode(), 0);
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
    it('Should return kurtosis', () => {
      var f = new F(2, 9);
      var num = 12 * ((5*9-22)*2*(9+2-2) + (9-4)*Math.pow(9-2,2));
      var den = (9-8)*(9-6)*2*(9-2-2);
      assert.strictEqual(f.kurtosis(), num / den);
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
    it('Should return mode', () => {
      var n = 3;
      var m = 4;
      var f = new F(n, m);
      assert.strictEqual(f.mode(), (n*(m-2)) / (m*(n+2)));
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
    it('Should return skewness', () => {
      var f = new F(3, 8);
      var num = 2 * Math.sqrt(2) * Math.sqrt(8-4) * (8+2*3-2);
      var den = (8-6) * Math.sqrt(3) * Math.sqrt(8+3-2);
      assert.strictEqual(f.skewness(), num / den);
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
    it('Should return kurtosis', () => {
      var g = new Gamma(3, 2);
      assert.strictEqual(g.kurtosis(), 6/3);
    });
    it('Should return mean', () => {
      var g = new Gamma(1, 2);
      assert.strictEqual(g.mean(), 1 * 2);
    });
    it('Should return mode', () => {
      var g = new Gamma(2, 3);
      assert.strictEqual(g.mode(), (2 - 1)*3);
      g = new Gamma(0.5, 4);
      assert.strictEqual(g.mode(), undefined);
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
    it('Should return skewness', () => {
      var g = new Gamma(3, 2);
      assert.strictEqual(g.skewness(), 2 / Math.sqrt(3));
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
    it('Should return kurtosis', () => {
      // @TODO Add actual test.
      assert.ok(true);
    });
    it('Should return mean', () => {
      var h = new Hypergeometric(500, 60, 200);
      assert.strictEqual(h.mean(), 200*(60/500));
    });
    it('Should return mode', () => {
      var h = new Hypergeometric(500, 60, 200);
      assert.strictEqual(h.mode(), Math.floor(((200+1)*(60+1)) / (500+2)) );
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
    it('Should return skewness', () => {
      // @TODO: Actually test this.
      /*var n = 500;
      var m = 60;
      var N = 200;
      var h = new Hypergeometric(n, m, N);
      var num = Math.sqrt(N-1) * (N-2*m) * (N-2*n);
      var den = (N-2) * Math.sqrt(m*n*(N-m)*(N-n));
      assert.strictEqual(h.skewness(), num / den);*/
      assert.ok(true);
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
      var l = new Laplace(0, 2);

      // Test against keisan.casio.com.
      assert.strictEqual(roundIt(l.cdf(0.5), 5), 0.61060);

    });
    it('Should return mean', () => {
      var l = new Laplace(5, 1);
      assert.strictEqual(l.mean(), 5);
    });
    it('Should return median', () => {
      var l = new Laplace(5, 1);
      assert.strictEqual(l.median(), 5);
    });
    it('Should return mode', () => {
      var l = new Laplace(5, 1);
      assert.strictEqual(l.mode(), 5);
    });
    it('Should calculate pdf', () => {
      var l = new Laplace(0, 2);

      // Test against keisan.casio.com.
      assert.strictEqual(roundIt(l.pdf(0.5), 5), 0.19470);
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

  describe('Levy', () => {
    it('Should instantiate', () => {
      var l = new Levy(2, 4);
      assert.strictEqual(l.location, 2);
      assert.strictEqual(l.scale, 4);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new Levy(1, -1); }, ParamError);
    });
    it('Should calculate cdf', () => {
      var l = new Levy(0, 4);
      var cdf = l.cdf(2);

      assert.ok(true);
    });
    it('Should return kurtosis', () => {
      var l = new Levy(1, 4);
      assert.strictEqual(l.kurtosis(), undefined);
    });
    it('Should return mean', () => {
      var l = new Levy(1, 4);
      assert.strictEqual(l.mean(), Number.POSITIVE_INFINITY);
    });
    it('Should return median', () => {
      var l = new Levy(2, 5);
      var m = l.median();
      assert.ok(true);
    });
    it('Should return mode', () => {
      var l = new Levy(0, 1);
      assert.strictEqual(l.mode(), 1/3);
      l = new Levy(1, 2);
      assert.strictEqual(l.mode(), undefined);
    });
    it('Should calculate pdf', () => {
      var l = new Levy(0, 2);
      var pdf = l.pdf(1);
      assert.ok(true);
    });
    it('Should sample values', () => {
      var l = new Levy(0, 0.5);
      var s = l.sample(5);
      assert.strictEqual(s.length, 5);
    });
    it('Should return skewness', () => {
      var l = new Levy(0, 1);
      assert.strictEqual(l.skewness(), undefined);
    });
    it('Should return variance', () => {
      var l = new Levy(1, 10);
      assert.strictEqual(l.variance(), Number.POSITIVE_INFINITY);
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
    it('Should return mode', () => {
      var l = new Logarithmic(0.4);
      assert.strictEqual(l.mode(), 1);
    });
    it('Should calculate pdf', () => {
      var l = new Logarithmic(0.33);
      var pdf = l.pdf(1);
      assert.ok(true);
      //assert.throws(() => { l.pdf(0.5); }, RangeError);
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
      var l = new Logistic(0, 1);

      // Test against keisan.casio.com.
      assert.strictEqual(roundIt(l.cdf(1), 5), 0.73106);
    });
    it('Should return mean', () => {
      var l = new Logistic(1, 0.5);
      assert.strictEqual(l.mean(), 1);
    });
    it('Should return median', () => {
      var l = new Logistic(10, 0.5);
      assert.strictEqual(l.median(), 10);
    });
    it('Should return mode', () => {
      var l = new Logistic(10, 0.5);
      assert.strictEqual(l.mode(), 10);
    });
    it('Should calculate pdf', () => {
      var l = new Logistic(5, 2);

      // Test against keisan.casio.com.
      assert.strictEqual(roundIt(l.pdf(1), 5), 0.052500);
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
    it('Should return mode', () => {
      var l = new LogLogistic(2, 4);
      assert.strictEqual(l.mode(), 2 * Math.pow( (4-1)/(4+1), 1/4));
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
      var a = 1;
      var b = Math.PI / 3;
      assert.strictEqual(l.variance(), Math.pow(a, 2) * ( (2*b)/Math.sin(2*b) - Math.pow(b, 2)/Math.pow(Math.sin(b), 2)) );
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
    it('Should return kurtosis', () => {
      var n = new LogNormal(1, 2);
      assert.strictEqual(n.kurtosis(), 3*Math.exp(2*Math.pow(2,2)) + 2*Math.exp(3*Math.pow(2,2)) + Math.exp(4*Math.pow(2,2)) - 3);
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
    it('Should return mode', () => {
      var l = new LogNormal(0, 1);
      assert.strictEqual(l.mode(), Math.exp(0 - Math.pow(1, 2)));
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
    it('Should return skewness', () => {
      var n = new LogNormal(1, 2);
      assert.strictEqual(n.skewness(), Math.sqrt(Math.exp(Math.pow(2,2)) - 1) * (Math.exp(Math.pow(2,2)) + 2) );
    });
    it('Should return variance', () => {
      var l = new LogNormal(1, 2);
      assert.strictEqual(l.variance(), (Math.exp(2*2) - 1)*Math.exp(2*1*1 + 2*2));
    });
  });

  describe('NegativeBinomial', () => {
    it('Should instantiate', () => {
      var b = new NegativeBinomial(10, 0.4);
      assert.strictEqual(b.r, 10);
      assert.strictEqual(b.p, 0.4);
    });
    it('Should enforce range', () => {
      assert.throws(() => { new NegativeBinomial(1.2, 0.5); }, ParamError);
      assert.throws(() => { new NegativeBinomial(0, 0.5); }, ParamError);
      assert.throws(() => { new NegativeBinomial(2, -0.5); }, ParamError);
    });
    it('Should calculate cdf', () => {
      var b = new NegativeBinomial(4, 0.3);

      // Test against Excel. NEGBIN.DIST(10, 4, 0.3, true).
      assert.strictEqual(roundIt(b.cdf(10), 5), 0.64483);
    });
    it('Should return kurtosis', () => {
      var b = new NegativeBinomial(4, 0.3);
      assert.strictEqual(b.kurtosis(), (Math.pow(0.3, 2) - 6*0.3 + 6) / (4*(1-0.3)) );
    });
    it('Should return mean', () => {
      var b = new NegativeBinomial(4, 0.3);
      assert.strictEqual(b.mean(), (4*(1-0.3))/0.3);
    });
    it('Should return median', () => {
      var b = new NegativeBinomial(5, 0.4);
      assert.strictEqual(b.median(), undefined);
    });
    it('Should return mode', () => {
      var b = new NegativeBinomial(5, 0.4);
      assert.strictEqual(b.mode(), 1 + Math.floor((5-1)/0.4));
    });
    it('Should calculate pdf', () => {
      var b = new NegativeBinomial(4, 0.3);
      assert.strictEqual(roundIt(b.pdf(10), 5), 0.06544);
    });
    it('Should sample values', () => {
      var b = new NegativeBinomial(5, 0.3);
      var s = b.sample(5);
      assert.strictEqual(s.length, 5);
    });
    it('Should return skewness', () => {
      var b = new NegativeBinomial(4, 0.3);
      assert.strictEqual(b.skewness(), (2-0.3)/Math.sqrt(4*(1-0.3)));
    });
    it('Should calculate variance', () => {
      var b = new NegativeBinomial(4, 0.3);
      assert.strictEqual(b.variance(), (4*(1-0.3)) / Math.pow(0.3, 2));
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
    it('Should return mode', () => {
      var n = new Normal(10, 2);
      assert.strictEqual(n.mode(), 10);
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
    it('Should return kurtosis', () => {
      var k = 2;
      var a = 5;
      var p = new Pareto(k, a);
      var num = 3*(a-2)*(3*Math.pow(a,2)+a+2);
      var den = (a-4)*(a-3)*a;
      assert.strictEqual(p.kurtosis(), num / den);
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
    it('Should return mode', () => {
      var p = new Pareto(1, 3);
      assert.strictEqual(p.mode(), 1);
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
    it('Should return skewness', () => {
      var k = 2;
      var a = 9;
      var p = new Pareto(k, a);
      var num = 2 * Math.sqrt((a-2)/a) * (a+1);

      assert.strictEqual(p.skewness(), num / (a - 3));
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

      // POISSON.DIST(5, 10, true).
      p = new Poisson(10);
      assert.strictEqual(roundIt(p.cdf(5), 5), 0.06709);
      assert.strictEqual(roundIt(p.cdf(9), 5), 0.45793);
    });
    it('Should return mean', () => {
      var p = new Poisson(1);
      assert.strictEqual(p.mean(), 1);
    });
    it('Should return median', () => {
      var p = new Poisson(2);
      assert.strictEqual(p.median(), Math.floor(2 + 1/3 - 0.02/2));
    });
    it('Should return mode', () => {
      var p = new Poisson(2);
      assert.strictEqual(p.mode(), 2);
      var p = new Poisson(0.5);
      assert.strictEqual(p.mode(), 0);
    });
    it('Should calculate pdf', () => {
      var p = new Poisson(1);

      // Test against Excel. POISSON.DIST(0, 1, false).
      assert.strictEqual(roundIt(p.pdf(0), 5), 0.36788);
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
    it('Should return kurtosis', () => {
      var r = new Rayleigh(2);
      assert.strictEqual(roundIt(r.kurtosis(), 5), 0.24509);
    });
    it('Should return mean', () => {
      var r = new Rayleigh(2);
      assert.strictEqual(r.mean(), 2 * Math.sqrt(Math.PI / 2));
    });
    it('Should return median', () => {
      var r = new Rayleigh(2);
      assert.strictEqual(r.median(), 2 * Math.sqrt(2 * Math.log(2)));
    });
    it('Should return mode', () => {
      var r = new Rayleigh(4);
      assert.strictEqual(r.mode(), 4);
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
    it('Should return skewness', () => {
      var r = new Rayleigh(2);
      assert.strictEqual(roundIt(r.skewness(), 5), 0.63111);
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
    it('Should return mode', () => {
      var s = new StudentT(4);
      assert.strictEqual(s.mode(), 0);
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
      assert.strictEqual(t.modeP, 2);
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
    it('Should return mode', () => {
      var t = new Triangular(1, 2, 3);
      assert.strictEqual(t.mode(), 2);
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
    it('Should return skewness', () => {
      var a = 1;
      var b = 8;
      var c = 4;
      var t = new Triangular(a, c, b);
      var num = Math.sqrt(2) * (a+b-2*c) * (2*a-b-c) * (a-2*b+c);
      var den = 5 * Math.pow(Math.pow(a,2) + Math.pow(b,2) + Math.pow(c,2) -a*b - a*c - b*c, 3/2);
      assert.strictEqual(t.skewness(), num / den);
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
    it('Should return mode', () => {
      var u = new Uniform(0, 1);
      assert.strictEqual(u.mode(), undefined);
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
    it('Should return mode', () => {
      var w = new Weibull(0.5, 1);
      assert.strictEqual(w.mode(), 0);
      w = new Weibull(2, 3);
      assert.strictEqual(w.mode(), 3 * Math.pow((2-1)/2, 1/2));
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
