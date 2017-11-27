'use strict';

import { DistAbstract } from './util';

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
  * @throws {RangeError} On invalid parameters.
  */
  constructor (min, mode, max) {
    super();
    if (max <= min) {
      throw new RangeError('max parameter must be greater than min.');
    }
    if (mode < min) {
      throw new RangeError('mode parameter must be greater than or equal to min.');
    }
    if (mode > max) {
      throw new RangeError('mode parameter must be less than or equal to min.');
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

}
