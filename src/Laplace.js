'use strict';

import { DistAbstract } from './util';

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
  */
  constructor (location, scale) {
    super();
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
  * Returns mean value.
  * @method mean
  * @return {Number} Mean value.
  */
  mean () {
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

}
