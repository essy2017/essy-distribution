'use strict';

import { DistAbstract, factorial } from './util';

const incompleteGamma = require('incomplete-gamma');

/*******************************************************************************
 *
 * A Poisson distribution with parameter lambda.
 * @class Poisson
 * @extends DistAbstract
 *
 ******************************************************************************/
export class Poisson extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param lambda {Number} Greater than 0.
  * @throws {RangeError} On invalid lambda.
  */
  constructor (lambda) {
    super();
    if (lambda <= 0) {
      throw new RangeError('lambda parameter must be greater than 0.');
    }
    this.lambda = lambda;
  }

 /**
  * Cumulative density function.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  */
  cdf (x) {
    x = Math.floor(x);
    if (x >= 0) {
      return incompleteGamma.lower(x + 1, this.lambda) / factorial(x);
    }
    else {
      return NaN;
    }
  }

 /**
  * Returns mean.
  * @method mean
  * @return {Number} Mean value.
  */
  mean () {
    return this.lambda;
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    return (Math.pow(this.lambda, x) * Math.exp(-this.lambda)) / factorial(x);
  }

 /**
  * Returns sample from distribution.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Random sample.
  */
  sampleValue (generator) {
    let L = Math.exp(-this.lambda);
    let k = 0;
    let p = 1;
    while (p > L) {
      k += 1;
      p *= generator.random();
    }
    return k - 1;
  }

}
