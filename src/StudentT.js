'use strict';

import { DistAbstract } from './util';
import ParamError from './ParamError';
import { gamma, regIncBeta } from 'essy-stats';

/*
Copyright � 1999 CERN - European Organization for Nuclear Research.
Permission to use, copy, modify, distribute and sell this software and its documentation for any purpose
is hereby granted without fee, provided that the above copyright notice appear in all copies and
that both that copyright notice and this permission notice appear in supporting documentation.
CERN makes no representations about the suitability of this software for any purpose.
It is provided "as is" without expressed or implied warranty.
*/
export class StudentT extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param freedom {Number} Degrees of freedom. >0
  * @throws {ParamError} On invalid freedom.
  */
  constructor (freedom) {
    super();
    if (freedom <= 0) {
      throw new ParamError(0, 'df', 'freedom parameter must be greater than 0.');
    }
    this.df = freedom;
  }

 /**
  * Cumulative distribution function.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  */
  cdf (x) {
    let c = 0.5 * regIncBeta(0.5 * this.df, 0.5, this.df / (this.df + x * x));
    if (x >= 0) {
      c = 1 - c;
    }
    return c;
  }

 /**
  * Returns mean.
  * @method mean
  * @return {Number}
  */
  mean () {
    if (this.df <= 1) {
      return NaN;
    }
    return 0;
  }

 /**
  * Returns distribution median.
  * @method median
  * @return {Number}
  */
  median () {
    return 0;
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    const a = gamma((this.df + 1) / 2);
    const b = Math.sqrt(this.df * Math.PI) * gamma(this.df / 2);
    const c = Math.pow(1 + Math.pow(x, 2)/this.df, -((this.df + 1) / 2));
    return (a / b) * c;
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
    return {};
  }

 /**
  * Returns sampled value.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Random sampled value.
  */
  sampleValue (generator) {

    var u, v, w;

    do {
      u = 2 * generator.random() - 1;
      v = 2 * generator.random() - 1;
    }
    while ((w = u * u + v * v) > 1);

    return u * Math.sqrt(this.df * (Math.exp(- 2 / this.df * Math.log(w)) - 1) / w);
  }

 /**
  * Returns variance.
  * @method variance
  * @return {Number}
  */
  variance () {
    if (this.df > 2) {
      return this.df / (this.df - 2);
    }
    if (this.df > 1) {
      return Number.POSITIVE_INFINITY;
    }
    return NaN;
  }
}

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */
StudentT.params = {
  df : 'Real number greater than 0.'
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
StudentT.distName = "Student's T";
