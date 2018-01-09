'use strict';

import { DistAbstract } from './util';
import ParamError from './ParamError';

/*******************************************************************************
 *
 * Laplace distribution.
 * @class Laplace
 * @extends DistAbstract
 *
 ******************************************************************************/
export class Laplace extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param location {Number} Location mu, real number.
  * @param scale {Number} Scale s, greater than 0.
  * @throws {ParamError} On invalid parameter.
  */
  constructor (location, scale) {
    super();
    if (scale <= 0) {
      throw new ParamError(1, 'scale', 'scale must be greater than 0.');
    }
    this.location = location;
    this.scale = scale;
  }

 /**
  * Cumulative density function.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  */
  cdf (x) {
    if (x < this.location) {
      return 0.5 * Math.exp(- (Math.abs(x - this.location) / this.scale));
    }
    else {
      return 1 - 0.5 * Math.exp(- (x - this.location)/this.scale);
    }
  }

 /**
  * Returns distribution kurtosis.
  * @method kurtosis
  * @return {Number}
  */
  kurtosis () {
    return 6;
  }

 /**
  * Returns mean value.
  * @method mean
  * @return {Number} Mean value.
  */
  mean () {
    return this.location;
  }

 /**
  * Returns distribution median.
  * @method median
  * @return {Number}
  */
  median () {
    return this.location;
  }

 /**
  * Returns distribution mode.
  * @method mode
  * @return {Number}
  */
  mode () {
    return this.location;
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    return (1 / (2*this.scale)) * Math.exp(- (Math.abs(x - this.location) / this.scale));
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
  * Generates sample.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Sampled value.
  */
  sampleValue (generator) {
    const u = generator.random() - 0.5;
    const sgn = u === 0 ? 0 : u > 0 ? 1 : -1;
    return this.location - this.scale * sgn * Math.log(1 - 2*Math.abs(u));
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
    return 2 * this.scale * this.scale;
  }

}

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */
Laplace.params = {
  location: {
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
Laplace.distName = 'Laplace';
