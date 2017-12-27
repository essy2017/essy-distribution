'use strict';

import { DistAbstract } from './util';
import ParamError from './ParamError';

/*******************************************************************************
 *
 * A Rayleigh distribution.
 * @class Rayleigh
 * @extends DistAbstract
 *
 ******************************************************************************/
export class Rayleigh extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param scale {Number} Scale, > 0.
  * @throws {ParamError} If scale is out of range.
  */
  constructor (scale) {
    super();
    if (scale <= 0) {
      throw new ParamError(0, 'scale', 'scale parameter must be greater than 0.');
    }
    this.scale = scale;
  }

 /**
  * Cumulative density function.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  */
  cdf (x) {
    if (x < 0) return 0;
    return 1 - Math.exp(- Math.pow(x, 2) / (2 * Math.pow(this.scale, 2)) );
  }

 /**
  * Returns kurtosis.
  * @method kurtosis
  * @return {Number}
  */
  kurtosis () {
    return (32 - 3*Math.pow(Math.PI, 2)) / Math.pow(4 - Math.PI, 2);
  }

 /**
  * Returns mean.
  * @method mean
  * @return {Number} Mean value.
  */
  mean () {
    return this.scale * Math.sqrt(Math.PI / 2);
  }

 /**
  * Returns distribution median.
  * @method median
  * @return {Number}
  */
  median () {
    return this.scale * Math.sqrt(2 * Math.log(2));
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    if (x < 0) return 0;
    return (x / Math.pow(this.scale, 2)) * Math.exp(- Math.pow(x, 2) / (2 * Math.pow(this.scale, 2)) );
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
  * Returns sample from distribution.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Random sample.
  */
  sampleValue (generator) {
    return this.scale * Math.sqrt(-2 * Math.log(1 - generator.random()));
  }

 /**
  * Returns skewness.
  * @method skewness
  * @return {Number}
  */
  skewness () {
    const num = (Math.PI - 3) * Math.sqrt(Math.PI / 2);
    const den = Math.pow(2 - Math.PI / 2, 3/2);
    return num / den;
  }

 /**
  * Returns variance.
  * @method variance
  * @return {Number}
  */
  variance () {
    return ((4 - Math.PI) / 2) * this.scale * this.scale;
  }

}


/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */
Rayleigh.params = {
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
Rayleigh.distName = 'Rayleigh';
