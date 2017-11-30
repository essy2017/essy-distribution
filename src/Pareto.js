'use strict';

import { DistAbstract } from './util';
import { Uniform } from './Uniform';

/*******************************************************************************
 *
 * Pareto distribution.
 * @class Pareto
 * @extends DistAbstract
 *
 ******************************************************************************/
export class Pareto extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param scale {Number} > 0.
  * @param shape {Number} > 0.
  * @throws {RangeError} On invalid parameter value.
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
  * Cumulative distribution function.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  */
  cdf (x) {
    return x < this.scale ? 0 : 1 - Math.pow(this.scale / x, this.shape);
  }

 /**
  * Returns distribution mean.
  * @method mean
  * @return {Number}
  */
  mean () {
    if (this.shape <= 1) {
      return Number.POSITIVE_INFINITY;
    }
    return (this.shape * this.scale) / (this.shape - 1);
  }

 /**
  * Returns distribution median.
  * @method median
  * @return {Number}
  */
  median () {
    return this.scale * Math.pow(2, 1 / this.shape);
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    return x < this.scale ? 0 : (this.shape * Math.pow(this.scale, this.shape)) / Math.pow(x, this.shape + 1);
  }

 /**
  * Samples random value.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number}
  */
  sampleValue (generator) {
    var u = new Uniform(0, 1),
        s = u.sample(1, generator);
    while (s === 0) {
      s = u.sample(1, generator);
    }
    return this.scale / Math.pow(s, 1 / this.shape);
  }

 /**
  * Returns variance.
  * @method variance
  * @return {Number}
  */
  variance () {
    if (this.shape <= 2) {
      return Number.POSITIVE_INFINITY;
    }
    return (this.shape * Math.pow(this.scale, 2)) / (Math.pow(this.shape - 1, 2) * (this.shape - 2));
  }

}