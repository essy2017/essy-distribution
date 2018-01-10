'use strict';

import { DistAbstract } from './util';
import ParamError from './ParamError';
import { Gamma } from './Gamma';
import { Poisson } from './Poisson';
import { binomial, regIncBeta } from 'essy-stats';

/*******************************************************************************
 *
 * Log Normal distribution.
 * @class NegativeBinomial
 * @extends DistAbstract
 *
 ******************************************************************************/
export class NegativeBinomial extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param r {Number} Number of failures before stopping.
  * @param p {Number} Probability of success.
  * @throws {ParamError}
  */
  constructor (r, p) {
    super();
    if (r !== Math.floor(r) || r < 1) {
      throw new ParamError(0, 'r', 'r parameter must be integer greater than 0.');
    }
    if (p <= 0 || p >= 1) {
      throw new ParamError(1, 'p', 'p parameter must be in the range (0, 1).');
    }
    this.r = r;
    this.p = p;
    this.gamma = new Gamma(this.r, this.p / (1 - this.p));//1);
  }

 /**
  * Cumulative density function.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  */
  cdf (x) {
    if (x < 0) {
      return 0;
    }
    return regIncBeta(this.r, x + 1, this.p);
  }

 /**
  * Returns distribution kurtosis.
  * @method kurtosis
  * @return {Number}
  */
  kurtosis () {
    return (Math.pow(this.p, 2) - 6*this.p + 6) / (this.r * (1 - this.p));
  }

 /**
  * Returns mean of distribution.
  * @method mean
  * @return {Number} Distribution mean.
  */
  mean () {
    return (this.r * (1 - this.p)) / this.p;
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
  * Returns distribution mode.
  * @method mode
  * @return {Number}
  */
  mode () {
    return 1 + Math.floor((this.r - 1) / this.p);
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    return binomial(x + this.r - 1, this.r - 1) * Math.pow(1 - this.p, x) * Math.pow(this.p, this.r);
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
      discrete     : true,
      min          : 0,
      minInclusive : true
    };
  }

 /**
  * Samples value from distribution.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Sampled value.
  */
  sampleValue (generator) {
    const y = this.gamma.sampleValue(generator);
    const p = new Poisson(y);
    return p.sampleValue(generator);
  }

 /**
  * Returns distribution skewness.
  * @method skewness
  * @return {Number}
  */
  skewness () {
    return (2 - this.p) / Math.sqrt(this.r * (1 - this.p));
  }

 /**
  * Returns variance.
  * @method variance
  * @return {Number}
  */
  variance () {
    return (this.r * (1 - this.p)) / Math.pow(this.p, 2);
  }
}

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */
NegativeBinomial.params = {
  r: {
    description  : 'Integer greater than 0.',
    min          : 0,
    minInclusive : false,
    discrete     : true
  },
  p: {
    description  : 'Real number in the range (0, 1)',
    min          : 0,
    minInclusive : false,
    max          : 1,
    maxInclusive : false
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
NegativeBinomial.distName = 'Negative Binomial';

/**
 * Set flag as discrete distribution.
 * @property discrete
 * @type Boolean
 * @static
 */
NegativeBinomial.discrete = true;
