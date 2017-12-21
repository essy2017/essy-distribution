'use strict';

import { DistAbstract, factorial } from './util';
import ParamError from './ParamError';
import { lowerIncGamma } from 'essy-stats';


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
  * @throws {ParamError} On invalid parameter value.
  */
  constructor (shape, rate) {
    super();
    if (shape < 1 || Math.floor(shape) !== shape) {
      throw new ParamError(0, 'shape', 'shape parameter must be positive integer.');
    }
    if (rate <= 0) {
      throw new ParamError(1, 'rate', 'rate parameter must be positive.');
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
    const num = lowerIncGamma(this.shape, x * this.rate);
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
  * Returns distribution range.
  * @method range
  * @return {Object} With properties:
  *   discrete {Boolean} [optional] True if only integers.
  *   max {Number} [optional] Defined if max value.
  *   min {Number} [optional] Defined if min value.
  */
  range () {
    return {
      min: 0
    };
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


/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */
Erlang.params = {
  shape : 'Positive integer.',
  rate  : 'Real number greater than 0.'
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Erlang.distName = 'Erlang';
