'use strict';

import { DistAbstract } from './util';
import { gamma } from 'mathfn';

/*******************************************************************************
 *
 * A Weibull distribution.
 * @class Weibull
 * @extends DistAbstract
 *
 ******************************************************************************/
export class Weibull extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param shape {Number} Shape parameter value. >0
  * @param scale {Number} Scale parameter value. >0
  * @throws {RangeError} On invalid parameter.
  */
  constructor (shape, scale) {
    super();
    if (shape <= 0) {
      throw new RangeError('shape parameter must be greater than 0.');
    }
    if (scale <= 0) {
      throw new RangeError('scale parameter must be greater than 0.');
    }
    this.alpha = shape;
    this.beta = scale;
  }

 /**
  * Cumulative density function.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  */
  cdf (x) {
    if (x >= 0) {
      return 1 - Math.exp(- Math.pow(x / this.beta, this.alpha));
    }
    return 0;
  }

 /**
  * Returns mean for distribution.
  * @method mean
  * @return {Number} Mean value.
  */
  mean () {
    return this.beta * gamma(1 + 1/this.alpha);
  }

 /**
  * Returns distribution median.
  * @method median 
  * @return {Number}
  */  
  median () {
    return this.beta * Math.pow(Math.log(2), 1 / this.alpha);
  }
  
 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    if (x >= 0) {
      return (this.alpha / this.beta) * Math.pow(x / this.beta, this.alpha - 1) * Math.exp(-Math.pow(x / this.beta, this.alpha));
    }
    return 0;
  }

 /**
  * Samples random value from distribution.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Random sample.
  */
  sampleValue (generator) {
    // Polar method.
	  // See Simulation, Modelling & Analysis by Law & Kelton, pp259
    return Math.pow(this.beta * (-Math.log(1 - generator.random())), 1 / this.alpha);
  }

 /**
  * Returns variance.
  * @method variance
  * @return {Number}
  */
  variance () {
    return this.beta*this.beta * (gamma(1 + 2/this.alpha) - Math.pow(gamma(1 + 1/this.alpha), 2));
  }
}
