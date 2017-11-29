'use strict';

import { DistAbstract } from './util';
import { ChiSquared } from './ChiSquared';
import { beta, incBeta } from 'mathfn';

/*******************************************************************************
 *
 * An F distribution.
 * @class F
 * @extends DistAbstract
 *
 ******************************************************************************/
export class F extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param df1 {Number} > 0
  * @param df2 {Number} > 0
  * @throws {RangeError} If parameters are out of range.
  */
  constructor (df1, df2) {
    super();
    if (df1 <= 0) {
      throw new RangeError('df1 parameter must be greater than 0.');
    }
    if (df2 <= 0) {
      throw new RangeError('df2 parameter must be greater than 0.');
    }
    this.df1 = df1;
    this.df2 = df2;
  }

 /**
  * Cumulative distribution function.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  */
  cdf (x) {
    return incBeta( (x * this.df1) / (x * this.df1 + this.df2), this.df1 / 2, this.df2 / 2);
  }

 /**
  * Returns distribution mean.
  * @method mean
  * @return {Number}
  */
  mean () {
    if (this.df2 <= 2) {
      return undefined;
    }
    return this.df2 / (this.df2 - 2);
  }

 /**
  * Returns distribution median.
  * @method median
  * @return {Number}
  */
  median () {
    return undefined;
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    var num = Math.pow(x * this.df1, this.df1) * Math.pow(this.df2, this.df2),
        den = Math.pow(x * this.df1 + this.df2, this.df1 + this.df2);
    return Math.sqrt(num / den) / (x * beta(this.df1 / 2, this.df2 / 2));
  }

 /**
  * Samples random value.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number}
  */
  sampleValue (generator) {
    var c1 = new ChiSquared(this.df1),
        c2 = new ChiSquared(this.df2);

    return (c1.sample(1, generator) / this.df1) / (c2.sample(1, generator) / this.df2);
  }

 /**
  * Returns variance.
  * @method variance
  * @return {Number}
  */
  variance () {
    if (this.df2 <= 4) {
      return undefined;
    }
    return (2 * Math.pow(this.df2, 2) * (this.df1 + this.df2 - 2)) / (this.df1 * Math.pow(this.df2 - 2, 2) * (this.df2 - 4));
  }
}
