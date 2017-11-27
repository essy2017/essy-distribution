'use strict';

import { DistAbstract } from './util';

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
  * @throws {RangeError} If scale is out of range.
  */
  constructor (scale) {
    super();
    if (scale <= 0) {
      throw new RangeError('scale parameter must be greater than 0.');
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
  * Returns sample from distribution.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Random sample.
  */
  sampleValue (generator) {
    return this.scale * Math.sqrt(-2 * Math.log(1 - generator.random()));
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
