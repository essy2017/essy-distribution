'use strict';

import { DistAbstract } from './util';
import ParamError from './ParamError';

/*******************************************************************************
 *
 * A triangular distribution.
 * @class Triangular
 * @extends DistAbstract
 *
 ******************************************************************************/
export class Triangular extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param min {Number} Minimum value.
  * @param mode {Number} Mode value. >= min and <= max.
  * @param max {Number} Maximum value. > max.
  * @throws {ParamError} On invalid parameters.
  */
  constructor (min, mode, max) {
    super();
    if (max <= min) {
      throw new ParamError(2, 'max', 'max parameter must be greater than min.');
    }
    if (mode < min) {
      throw new ParamError(1, 'mode', 'mode parameter must be greater than or equal to min.');
    }
    if (mode > max) {
      throw new ParamError(1, 'mode', 'mode parameter must be less than or equal to min.');
    }
    this.min = min;
    this.mode = mode;
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
    if (x <= this.mode) {
      return Math.pow(x - this.min, 2) / ( (this.max - this.min)*(this.mode - this.min ));
    }
    if (x < this.max) {
      return 1 - Math.pow(this.max - x, 2) / ( (this.max - this.min)*(this.max - this.mode) );
    }
    return 1;
  }

 /**
  * Returns kurtosis.
  * @method kurtosis
  * @return {Number}
  */
  kurtosis () {
    return 2.4;
  }

 /**
  * Returns mean.
  * @method mean
  * @return {Number} Distribution mean.
  */
  mean () {
    return (this.min + this.mode + this.max) / 3;
  }

 /**
  * Returns distribution median.
  * @method median
  * @return {Number}
  */
  median () {
    if (this.mode >= ((this.min + this.max) / 2)) {
      return this.min + Math.sqrt(((this.max - this.min)*(this.mode - this.min)) / 2);
    }
    else {
      return this.max - Math.sqrt(((this.max - this.min)*(this.max - this.mode)) / 2);
    }
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    if (x < this.min) {
      return 0;
    }
    if (x < this.mode) {
      return (2 * (x - this.min)) / ( (this.max - this.min)*(this.mode - this.min) );
    }
    if (x === this.mode) {
      return 2 / (this.max - this.min);
    }
    if (x <= this.max) {
      return (2 * (this.max - x)) / ( (this.max - this.min)*(this.max - this.mode) );
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
  * Returns sampled value.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Random sampled value.
  */
  sampleValue (generator) {

    const a = this.min;
    const b = this.max;
    const m = this.mode;
    const t = (m - a) / (b - a);
    const r = generator.random();

    if (r <= t) {
      return a + Math.sqrt(r * (m-a) * (b-a));
    }
    else {
      return b - Math.sqrt((1-r) * (b-m) * (b-a));
    }
  }

 /**
  * Returns skewness.
  * @method skewness
  * @return {Number}
  */
  skewness () {
    const a = this.min;
    const b = this.max;
    const c = this.mode;
    const num = Math.sqrt(2) * (a+b-2*c) * (2*a-b-c) * (a-2*b+c);
    const den = 5 * Math.pow(Math.pow(a,2) + Math.pow(b,2) + Math.pow(c,2) - a*b - a*c - b*c, 3/2);
    return num / den;
  }

 /**
  * Returns variance.
  * @method variance
  * @return {Number}
  */
  variance () {
    return (this.min*this.min + this.mode*this.mode + this.max*this.max - this.min*this.max - this.min*this.mode - this.max*this.mode) / 18;
  }

}


/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */
Triangular.params = {
  min: {
    description  : 'Real number less than or equal to mode.',
    max          : 'mode',
    maxInclusive : true
  },
  mode: {
    description  : 'Real number.',
    min          : 'min',
    minInclusive : true,
    max          : 'max',
    maxInclusive : true
  },
  max: {
    description  : 'Real number greater than or equal to mode.',
    min          : 'mode',
    minInclusive : true
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Triangular.distName = 'Triangular';
