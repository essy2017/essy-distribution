'use strict';

import { DistAbstract } from './util';

/*******************************************************************************
 *
 * Logistic distribution.
 * @class Logistic
 * @extends DistAbstract
 *
 ******************************************************************************/
export class Logistic extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param mean {Number}
  * @param scale {Number}
  */
  constructor (mean, scale) {
    super();
    this.m = mean;
    this.scale = scale;
  }

 /**
  * Cumulative density function.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  */
  cdf (x) {
    return 1 / (1 + Math.exp(-((x - this.m) / this.scale)));
  }

 /**
  * Returns distribution mean.
  * @method mean
  * @return {Number} Distribution mean.
  */
  mean () {
    return this.m;
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    const e = Math.exp(- ((x - this.m) / this.scale));
    return e / (this.scale * Math.pow(1 + e, 2));
  }

 /**
  * Samples distribution.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Random sample.
  */
  sampleValue (generator) {
    const x = generator.random();
    return this.m + this.scale * Math.log(x / (1 - x));
  }

}