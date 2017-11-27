'use strict';

import { DistAbstract } from './util';
import { Logistic } from './Logistic';

// TODO: Confirm sampling...

/*******************************************************************************
 *
 * Log Logisitic distribution.
 * @class LogLogistic
 * @extends DistAbstract
 *
 ******************************************************************************/
export class LogLogistic extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param scale {Number} Scale parameter value.
  * @param shape {Number} Shape parameter value.
  */
  constructor (scale, shape) {
    super();
    if (scale <= 0) {
      throw new RangeError('scale parameter must be greater than 0.');
    }
    if (shape <= 0) {
      throw new RangeError('shape parameter must be greater than 0.');
    }
    this.scale = scale;
    this.shape = shape;
  }

 /**
  * Cumulative density function.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  */
  cdf (x) {
    if (x < 0) return 0;
    return 1 / (1 + Math.pow(x/this.scale, -this.shape));
  }

 /**
  * Returns distribution mean.
  * @method mean
  * @return {Number} Distribution mean.
  */
  mean () {
    if (this.shape < 1) throw new Error('LogLogistic shape parameter < 1: no mean defined.');
    return (this.scale * Math.PI / this.shape) /
      Math.sin(Math.PI / this.shape);
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    if (x < 0) return 0;
    const num = (this.shape / this.scale) * Math.pow(x / this.scale, this.shape - 1);
    const den = Math.pow(1 + Math.pow(x / this.scale, this.shape), 2);
    return num / den;
  }

 /**
  * Samples distribution.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Sampled value.
  */
  sampleValue (generator) {
    const l = new Logistic(Math.log(this.scale), 1 / this.shape);
    const s = l.sampleValue(generator);
    return Math.exp(s);
  }

 /**
  * Returns variance.
  * @method variance
  * @return {Number}
  */
  variance () {
    return Math.pow(this.scale, 2) * ((2*this.shape / Math.sin(2*this.shape)) - (Math.pow(this.shape, 2) / Math.pow(Math.sin(this.shape), 2)));
  }

}
