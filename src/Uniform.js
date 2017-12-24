'use strict';

import { DistAbstract } from './util';
import ParamError from './ParamError';

/*******************************************************************************
 *
 * Uniform distribution.
 * @class Uniform
 * @extends DistAbstract
 *
 ******************************************************************************/
export class Uniform extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param min {Number} Minimum value.
  * @param max {Number} Maximum value.
  * @throws {ParamError} If max <= min.
  */
  constructor (min, max) {
    super();
    if (max <= min) {
      throw new ParamError(1, 'max', 'max parameter must be greater than min.');
    }
    this.min = min;
    this.max = max;
  }

 /**
  * Cumulative density function.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  */
  cdf (x) {
    if (x < this.min) {
      return 0;
    }
    if (x < this.max) {
      return (x - this.min) / (this.max - this.min);
    }
    return 1;
  }

 /**
  * Returns kurtosis.
  * @method kurtosis
  * @return {Number}
  */
  kurtosis () {
    return 1.8;
  }

 /**
  * Returns distribution mean.
  * @method mean
  * @return {Number} Distribution mean.
  */
  mean () {
    return (this.min + this.max) / 2;
  }

 /**
  * Returns distribution median.
  * @method median
  * @return {Number}
  */
  median () {
    return (this.min + this.max) / 2;
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    if (x >= this.min && x <= this.max) {
      return 1 / (this.max - this.min);
    }
    return 0;
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
      min          : this.min,
      minInclusive : true,
      max          : this.max,
      maxInclusive : true
    };
  }

 /**
  * Samples distribution.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Random number in range [min, max].
  */
  sampleValue (generator) {
    return this.min + (this.max - this.min) * generator.random();
  }

 /**
  * Returns skewness.
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
    return (1/12) * Math.pow(this.max - this.min, 2);
  }
}


/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */
Uniform.params = {
  min : 'Real number less than max.',
  max : 'Real number greater than min.'
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Uniform.distName = 'Uniform';
