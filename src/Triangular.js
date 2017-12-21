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
  *   min {Number} [optional] Defined if min value.
  */
  range () {
    return {
      min : this.min,
      max : this.max
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
  min  : 'Real number less than or equal to mode.',
  mode : 'Real number.',
  max  : 'Real number greater than or equal to mode.'
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Triangular.distName = 'Triangular';
