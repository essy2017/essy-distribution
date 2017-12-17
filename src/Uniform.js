'use strict';

import { DistAbstract } from './util';

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
  * @throws {RangeError} If max <= min.
  */
  constructor (min, max) {
    super();
    if (max <= min) {
      throw new RangeError('max parameter must be greater than min.');
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
  * Samples distribution.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Random number in range [min, max].
  */
  sampleValue (generator) {
    return this.min + (this.max - this.min) * generator.random();
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
