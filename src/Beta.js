'use strict';

import { DistAbstract } from './util';
import { incBeta, gamma } from 'mathfn';

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
  * @throws {RangeError} If alpha or beta out of range.
  */
  constructor (alpha, beta) {
    super();
    if (alpha <= 0) {
      throw new RangeError('alpha parameter must be greater than 0.');
    }
    if (beta <= 0) {
      throw new RangeError('beta parameter must be greater than 0.');
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
    return incBeta(x, this.alpha, this.beta);
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
  * Samples distribution.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Sampled value.
  */
  sampleValue (generator) {
    const u = randg(this.alpha, generator);
    return u / (u + randg(this.beta, generator));
  }

}
