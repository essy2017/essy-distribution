'use strict';

import { DistAbstract } from './util';
import ParamError from './ParamError';

import { regIncBeta, regInvIncBeta, gamma } from 'essy-stats';

// From jStat.
function randn () {
  let u, v, x, y, q;
  do {
    u = Math.random();
    v = 1.7156 * (Math.random() - 0.5);
    x = u - 0.449871;
    y = Math.abs(v) + 0.386595;
    q = x * x + y * (0.19600 * y - 0.25472 * x);
  } while (q > 0.27597 && (q > 0.27846 || v * v > -4 * Math.log(u) * u * u));
  return v / u;
}

// From jStat.
function randg (shape, generator) {
  var oalph = shape;
  var a1, a2, u, v, x;

  if (shape < 1) {
    shape += 1;
  }
  a1 = shape - 1 / 3;
  a2 = 1 / Math.sqrt(9 * a1);
  do {
    do {
      x = randn();
      v = 1 + a2 * x;
    } while (v <= 0);
    v = v * v * v;
    u = generator.random();
  } while(u > 1 - 0.331 * Math.pow(x, 4) &&
          Math.log(u) > 0.5 * x*x + a1 * (1 - v + Math.log(v)));

  // alpha > 1
  if (shape == oalph) {
    return a1 * v;
  }

  // alpha < 1
  do {
    u = generator.random();
  } while (u === 0);
  return Math.pow(u, 1 / oalph) * a1 * v;
}

/*******************************************************************************
 *
 * Beta distribution.
 * @class Beta
 * @extends DistAbstract
 *
 ******************************************************************************/
export class Beta extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param alpha {Number} Alpha parameter value. >0
  * @param beta {Number} Beta parameter value. >0
  * @throws {ParamError} If alpha or beta out of range.
  */
  constructor (alpha, beta) {
    super();
    if (alpha <= 0) {
      throw new ParamError(0, 'alpha', 'alpha parameter must be greater than 0.');
    }
    if (beta <= 0) {
      throw new ParamError(1, 'beta', 'beta parameter must be greater than 0.');
    }
    this.alpha = alpha;
    this.beta = beta;
  }

 /**
  * Cumulative density function.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  */
  cdf (x) {
    if (x < 0 || x > 1) return 0;
    return regIncBeta(this.alpha, this.beta, x);
  }

 /**
  * Returns distribution kurtosis.
  * @method kurtosis
  * @return {Number}
  */
  kurtosis () {
    const a = this.alpha;
    const b = this.beta;
    const num = 3*(a + b + 1)*(2*Math.pow(a + b, 2) + a*b*(a + b - 6));
    const den = a * b * (a + b + 2) * (a + b + 3);
    return num / den - 3;
  }

 /**
  * Returns distribution mean.
  * @method mean
  * @return {Number} Distribution mean.
  */
  mean () {
    return this.alpha / (this.alpha + this.beta);
  }

 /**
  * Returns distribution median.
  * @method median
  * @return {Number}
  */
  median () {
    return regInvIncBeta(0.5, this.alpha, this.beta);
  }

 /**
  * Returns distribution mode.
  * @method mode
  * @return {Number}
  */
  mode () {
    if ((this.alpha + this.beta) === 2 ) {
      return undefined;
    }
    return (this.alpha - 1) / (this.alpha + this.beta - 2);
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    if (x < 0 || x > 1) return 0;
    const num = Math.pow(x, this.alpha - 1) * Math.pow(1 - x, this.beta - 1);
    const den = (gamma(this.alpha) * gamma(this.beta)) / gamma(this.alpha + this.beta);
    return num / den;
  }

 /**
  * Returns distribution range.
  * @method range
  * @return {Object} With properties:
  *   discrete {Boolean} [optional] True if only integers.
  *   max {Number} [optional] Defined if max value.
  *   maxInclusive {Boolean} [optional] True if max value is inclusive.
  *   min {Number} [optional] Defined if min value.
  *   minInclusive {Boolean} [optional] True if min value is inclusive.
  */
  range () {
    return {
      min: 0,
      minInclusive: true,
      max: 1,
      maxInclusive: true
    };
  }

 /**
  * Samples distribution.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Sampled value.
  */
  sampleValue (generator) {
    const u = randg(this.alpha, generator);
    return u / (u + randg(this.beta, generator));
  }

 /**
  * Returns distribution skewness.
  * @method skewness
  * @return {Number}
  */
  skewness () {
    const num = 2 * (this.beta - this.alpha) * Math.sqrt(this.alpha + this.beta + 1);
    const den = Math.sqrt(this.alpha) * Math.sqrt(this.beta) * (this.alpha + this.beta + 2);
    return num / den;
  }

 /**
  * Returns variance.
  * @method variance
  * @return {Number}
  */
  variance () {
    return (this.alpha * this.beta) / (Math.pow(this.alpha + this.beta, 2) * (this.alpha + this.beta + 1));
  }
}

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */
Beta.params = {
  alpha: {
    description  : 'Real number greater than 0.',
    min          : 0,
    minInclusive : false
  },
  beta: {
    description  : 'Real number greater than 0.',
    min          : 0,
    minInclusive : false
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Beta.distName = 'Beta';
