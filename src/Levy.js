'use strict';

import { DistAbstract } from './util';
import { Normal } from './Normal';
import ParamError from './ParamError';
import { erf } from 'essy-stats';

/*******************************************************************************
 *
 * Levy distribution.
 * @class Levy
 * @extends DistAbstract
 *
 ******************************************************************************/
export class Levy extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param location {Number}
  * @param scale {Number} Greater than 0.
  * @throws {ParamError}
  */
  constructor (location, scale) {
    super();
    if (scale <= 0) {
      throw new ParamError(1, 'scale', 'scale must be greater than 0.');
    }
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
      return 0;
    }
    return 1 - erf(Math.sqrt(this.scale / (2*(x - this.location)) ));
  }

 /**
  * Returns distribution kurtosis.
  * @method kurtosis
  * @return {Number}
  */
  kurtosis () {
    return undefined;
  }

 /**
  * Returns mean value.
  * @method mean
  * @return {Number} Mean value.
  */
  mean () {
    return Number.POSITIVE_INFINITY;
  }

 /**
  * Returns distribution median.
  * @method median
  * @return {Number}
  */
  median () {
    return this.location + this.scale / (2 * Math.pow(1 / (1 - erf(1/2)), 2));
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    const a = Math.sqrt(this.scale / (2*Math.PI));
    const b = Math.exp(- (this.scale / (2*(x-this.location))));
    const c = Math.pow(x - this.location, 1.5);
    return a * (b / c);
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
      min          : this.location,
      minInclusive : true
    };
  }

 /**
  * Generates sample.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Sampled value.
  */
  sampleValue (generator) {
    const u = generator.random();
    const n = new Normal(0, 1);
    const x = 1 - (u / 2);
    return this.location + (this.scale / Math.pow(1 / n.cdf(x), 2));
  }

 /**
  * Returns distribution skewness.
  * @method skewness
  * @return {Number}
  */
  skewness () {
    return undefined;
  }

 /**
  * Returns variance.
  * @method variance
  * @return {Number}
  */
  variance () {
    return Number.POSITIVE_INFINITY;
  }

}
