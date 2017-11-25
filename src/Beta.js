'use strict';

import { defaultGenerator } from './util';

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
 *
 ******************************************************************************/
export class Beta {

 /**
  * Constructor.
  * @method constructor
  * @param alpha {Number} Alpha parameter value.
  * @param beta {Number} Beta parameter value.
  */
  constructor (alpha, beta) {
    this.alpha = alpha;
    this.beta = beta;
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
  * Samples distribution.
  * @method sample
  * @param generator {RandomEngine} [optional] With random() method.
  * @return {Number} Sampled value.
  */
  sample (generator) {
    generator = defaultGenerator(generator);
    const u = randg(this.alpha, generator);
    return u / (u + randg(this.beta, generator));
  }

}
