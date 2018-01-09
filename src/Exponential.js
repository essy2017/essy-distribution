'use strict';

import { DistAbstract } from './util';
import ParamError from './ParamError';

/*
Copyright 1999 CERN - European Organization for Nuclear Research.
Permission to use, copy, modify, distribute and sell this software and its documentation for any purpose
is hereby granted without fee, provided that the above copyright notice appear in all copies and
that both that copyright notice and this permission notice appear in supporting documentation.
CERN makes no representations about the suitability of this software for any purpose.
It is provided "as is" without expressed or implied warranty.
*/


/*******************************************************************************
 *
 * Exponential distribution. Adapted from CERN Java implementation.
 * @class Exponential
 * @extends DistAbstract
 *
 ******************************************************************************/
export class Exponential extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param lambda {Number} Scale parameter value. >0
  * @throws {ParamError} On invalid parameter value.
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
    if (x < 0) return 0;
    return 1 - Math.exp(-x * this.lambda);
  }

 /**
  * Returns distribution kurtosis.
  * @method kurtosis
  * @return {Number}
  */
  kurtosis () {
    return 9;
  }

 /**
  * Returns distribution mean.
  * @method mean
  * @return {Number} Mean of distribution.
  */
  mean () {
    return 1 / this.lambda;
  }

 /**
  * Returns distribution median.
  * @method median
  * @return {Number}
  */
  median () {
    return (1 / this.lambda) * Math.log(2);
  }

 /**
  * Returns distribution mode.
  * @method mode
  * @return {Number}
  */
  mode () {
    return 0;
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    if (x < 0) return 0;
    return this.lambda * Math.exp(-x * this.lambda);
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
      min          : 0,
      minInclusive : true
    };
  }

 /**
  * Returns sample value.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Random sample from distribution.
  */
  sampleValue (generator) {
    return -Math.log(generator.random()) / this.lambda;
  }

 /**
  * Returns distribution skewness.
  * @method skewness
  * @return {Number}
  */
  skewness () {
    return 2;
  }

 /**
  * Returns variance.
  * @method variance
  * @return {Number}
  */
  variance () {
    return Math.pow(this.lambda, -2);
  }

}


/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */
Exponential.params = {
  lamba: {
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
Exponential.distName = 'Exponential';
