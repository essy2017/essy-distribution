'use strict';

import { DistAbstract } from './util';
import { Normal } from './Normal';
import { erf } from 'mathfn';

/*******************************************************************************
 *
 * Log Normal distribution.
 * @class LogNormal
 * @extends DistAbstract
 *
 ******************************************************************************/
export class LogNormal extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param mean {Number} Log mean.
  * @param se {Number} Log se.
  * @throws {RangeError} If se is not greater than 0.
  */
  constructor (mean, se) {
    super();
    if (se <= 0) {
      throw new RangeError('se parameter must be greater than 0.');
    }
    this.m = mean;
    this.se = se;
  }

 /**
  * Cumulative density function.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  */
  cdf (x) {
    if (x <= 0) return 0;
    return 0.5 + 0.5 * erf( (Math.log(x) - this.m) / (this.se * Math.sqrt(2)) );
  }

 /**
  * Returns mean of distribution.
  * @method mean
  * @return {Number} Distribution mean.
  */
  mean () {
    return Math.exp(this.m + Math.pow(this.se, 2)/2);
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    if (x <= 0) return 0;
    return (1 / (x * this.se * Math.sqrt(2 * Math.PI))) * Math.exp(- (Math.pow(Math.log(x) - this.m, 2)) / (2 * Math.pow(this.se, 2)));
  }

 /**
  * Samples value from distribution.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Sampled value.
  */
  sampleValue (generator) {
    const n = new Normal(0, 1);
    const s = n.sample(generator);
    return Math.exp(this.m + s * this.se);
  }

}