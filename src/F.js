'use strict';

import { DistAbstract } from './util';
import { ChiSquared } from './ChiSquared';
import ParamError from './ParamError';
import { beta, regIncBeta } from 'essy-stats';

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
  * @throws {ParamError} If parameters are out of range.
  */
  constructor (df1, df2) {
    super();
    if (df1 <= 0) {
      throw new ParamError(0, 'df1', 'df1 parameter must be greater than 0.');
    }
    if (df2 <= 0) {
      throw new ParamError(1, 'df2', 'df2 parameter must be greater than 0.');
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
    return regIncBeta( this.df1 / 2, this.df2 / 2, (x * this.df1) / (x * this.df1 + this.df2 ));
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
  * Returns distribution name.
  * @method name
  * @return {String} Distribution name.
  */
  name () {
    return 'F';
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
  * Returns distribution range.
  * @method range
  * @return {Object} With properties:
  *   discrete {Boolean} [optional] True if only integers.
  *   max {Number} [optional] Defined if max value.
  *   min {Number} [optional] Defined if min value.
  */
  range () {
    return {
      min: 0
    };
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


/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */
F.params = {
  df1 : 'Real number greater than 0.',
  df2 : 'Real number greater than 0.'
};
