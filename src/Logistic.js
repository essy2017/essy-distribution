'use strict';

import { DistAbstract } from './util';
import ParamError from './ParamError';

/*******************************************************************************
 *
 * Logistic distribution.
 * @class Logistic
 * @extends DistAbstract
 *
 ******************************************************************************/
export class Logistic extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param mean {Number}
  * @param scale {Number} > 0.
  * @throws {ParamError} If scale is <= 0.
  */
  constructor (mean, scale) {
    super();
    if (scale <= 0) {
      throw new ParamError(1, 'scale', 'scale parameter must be greater than 0.');
    }
    this.m = mean;
    this.scale = scale;
  }

 /**
  * Cumulative density function.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  */
  cdf (x) {
    return 1 / (1 + Math.exp(- ((x - this.m) / this.scale)) );
  }

 /**
  * Returns distribution kurtosis.
  * @method kurtosis
  * @return {Number}
  */
  kurtosis () {
    return 1.2;
  }

 /**
  * Returns distribution mean.
  * @method mean
  * @return {Number} Distribution mean.
  */
  mean () {
    return this.m;
  }

 /**
  * Returns distribution median.
  * @method median
  * @return {Number}
  */
  median () {
    return this.m;
  }

 /**
  * Returns distribution mode.
  * @method mode
  * @return {Number}
  */
  mode () {
    return this.m;
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    const e = Math.exp(- ((x - this.m) / this.scale));
    return e / (this.scale * Math.pow(1 + e, 2));
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
    return {};
  }

 /**
  * Samples distribution.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Random sample.
  */
  sampleValue (generator) {
    const x = generator.random();
    return this.m + this.scale * Math.log(x / (1 - x));
  }

 /**
  * Returns distribution skewness.
  * @method skewness
  * @return {Number}
  */
  skewness () {
    return 0;
  }

 /**
  * Returns variance.
  * @method variance
  * @return {Number}
  */
  variance () {
    return (this.scale*this.scale * Math.PI*Math.PI) / 3;
  }

}

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */
Logistic.params = {
  mean: {
    description: 'Real number.'
  },
  scale: {
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
Logistic.distName = 'Logistic';
