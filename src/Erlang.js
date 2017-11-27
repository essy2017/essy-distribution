'use strict';

import { DistAbstract, factorial } from './util';

const incompleteGamma = require('incomplete-gamma');

/*******************************************************************************
 *
 * Provides an Erlang distribution with shape k (natural number) and rate lambda
 * (positive number).
 * @class Erlang
 * @extends DistAbstract
 *
 ******************************************************************************/
export class Erlang extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param shape {Number} Shape k, a positive integer.
  * @param rate {Number} Rate lambda. >0
  */
  constructor (shape, rate) {
    super();
    if (shape < 1 || Math.floor(shape) !== shape) {
      throw new RangeError('shape parameter must be positive integer.');
    }
    if (rate <= 0) {
      throw new RangeError('rate parameter must be positive.');
    }
    this.shape = shape;
    this.rate = rate;
  }

 /**
  * Cumulative density function.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  */
  cdf (x) {
    if (x < 0) {
      return 0;
    }
    const num = incompleteGamma.lower(this.shape, x * this.rate);
    const den = factorial(this.shape - 1);
    return num / den;
  }

 /**
  * Returns mean value.
  * @method mean
  * @return {Number} Mean value.
  */
  mean () {
    return this.shape / this.rate;
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    const num =
      Math.pow(this.rate, this.shape) *
      Math.pow(x, this.shape - 1) *
      Math.exp(-x * this.rate);
    const den = factorial(this.shape - 1);
    return num / den;
  }

 /**
  * Samples distribution.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Random sample.
  */
  sampleValue (generator) {
    let prod = 1;
    for (let i = 0; i < this.shape; i++) {
      prod *= generator.random();
    }
    return -Math.log(prod)/this.rate;
  }

 /**
  * Returns variance.
  * @method variance
  * @return {Number}
  */
  variance () {
    return this.shape / Math.pow(this.rate, 2);
  }
}
