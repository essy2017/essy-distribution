'use strict';

import { DistAbstract  } from './util';
import ParamError from './ParamError';
import { factorial, upperIncGamma } from 'essy-stats';

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
  * @throws {ParamError} On invalid lambda.
  */
  constructor (lambda) {
    super();
    if (lambda <= 0) {
      throw new ParamError(0, 'lambda', 'lambda parameter must be greater than 0.');
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
    if (x < 0) {
      return 0;
    }

    // 170 is the threshold for factorial(x).
    if (x > 170) {
      return 1;
    }
    return upperIncGamma(x + 1, this.lambda) / factorial(x);
  }

 /**
  * Returns distribution kurtosis.
  * @method kurtosis
  * @return {Number}
  */
  kurtosis () {
    return (1 / this.lambda) + 3;
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
  * Returns distribution median.
  * @method median
  * @return {Number}
  */
  median () {
    return Math.floor(this.lambda + 1/3 - 0.02/this.lambda);
  }

 /**
  * Returns distribution mode.
  * @method mode
  * @return {Number}
  */
  mode () {
    return Math.floor(this.lambda);
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    // 170 is the threshold for factorial(x).
    if (x < 0 || x > 170) {
      return 0;
    }
    return (Math.pow(this.lambda, x) * Math.exp(-this.lambda)) / factorial(x);
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
      discrete     : true,
      min          : 0,
      minInclusive : true
    };
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

 /**
  * Returns skewness.
  * @method skewness
  * @return {Number}
  */
  skewness () {
    return 1 / Math.sqrt(this.lambda);
  }

 /**
  * Returns variance.
  * @method variance
  * @return {Number}
  */
  variance () {
    return this.lambda;
  }

}


/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */
Poisson.params = {
  lambda: {
    description  : 'An integer greater than or equal to 0.',
    discrete     : true,
    min          : 0,
    minInclusive : true
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Poisson.distName = 'Poisson';

/**
 * Indication that distribution is discrete.
 * @property discrete
 * @type Boolean
 * @static
 */
Poisson.discrete = true;
