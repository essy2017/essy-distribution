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
  * Returns distribution kurtosis.
  * @method kurtosis
  * @return {Number}
  */
  kurtosis () {
    if (this.df2 > 8) {
      const n = this.df1;
      const m = this.df2;
      const num = 12 * ( (5*m - 22) * n*(m + n - 2) + (m - 4)*Math.pow(m - 2, 2));
      const den = (m - 8) * (m - 6) * n * (m - n - 2);
      return num / den + 3;
    }
    return undefined;
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
    if (x < 0.01) x = 0.01;
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
  *   maxInclusive {Boolean} [optional] True if max value is inclusive.
  *   min {Number} [optional] Defined if min value.
  *   minInclusive {Boolean} [optional] True if min value is inclusive.
  */
  range () {
    return {
      min          : 0,
      minInclusive : true
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
  * Returns distribution skewness.
  * @method skewness
  * @return {Number}
  */
  skewness () {
    const n = this.df1;
    const m = this.df2;

    if (m > 6) {
      const num = 2 * Math.sqrt(2) * Math.sqrt(m - 4) * (m + 2*n - 2);
      const den = (m - 6) * Math.sqrt(n) * Math.sqrt(m + n - 2);
      return num / den;
    }
    return undefined;
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
  n: {
    description  : 'Real number greater than 0.',
    min          : 0,
    minInclusive : false
  },
  m: {
    description  : 'Real number greater than 0.',
    min          : 0,
    minInclusive : false
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
F.distName = 'F';
