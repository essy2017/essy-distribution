'use strict';

import { DistAbstract } from './util';
import ParamError from './ParamError';

/*******************************************************************************
 *
 * Clauchy distribution.
 * @class Cauchy
 * @extends DistAbstract
 *
 ******************************************************************************/
export class Cauchy extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param location {Number} Real number.
  * @param scale {Number} > 0.
  * @throws {ParamError} On invalid scale.
  */
  constructor (location, scale) {
    super();
    this.location = location;
    if (scale <= 0) {
      throw new ParamError(1, 'scale', 'scale parameter must be greater than 0.');
    }
    this.scale = scale;
  }

 /**
  * Cumulative distribution function.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  */
  cdf (x) {
    return (1 / Math.PI) * Math.atan((x - this.location) / this.scale) + 0.5;
  }

 /**
  * Returns distribution kurtosis.
  * @method kurtosis
  * @return {undefined}
  */
  kurtosis () {
    return undefined;
  }

 /**
  * Returns distribution mean.
  * @method mean
  * @return {undefined}
  */
  mean () {
    return undefined;
  }

 /**
  * Returns distribution median.
  * @method median
  * @return {Number}
  */
  median () {
    return this.location;
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    return 1 / (Math.PI * this.scale * (1 + Math.pow((x - this.location)/this.scale, 2)));
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
  * Samples random value.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number}
  */
  sampleValue (generator) {
    return this.location + this.scale * Math.tan(Math.PI * generator.random());
  }

 /**
  * Returns distribution skewness.
  * @method skewness
  * @return {undefined}
  */
  skewness () {
    return undefined;
  }

 /**
  * Returns variance.
  * @method variance
  * @return {undefined}
  */
  variance () {
    return undefined;
  }

}

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */
Cauchy.params = {
  location : 'Real number.',
  scale    : 'Real number greater than 0.'
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Cauchy.distName = 'Cauchy';
