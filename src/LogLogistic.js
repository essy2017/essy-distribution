'use strict';

import { DistAbstract } from './util';
import ParamError from './ParamError';
import { Logistic } from './Logistic';

// TODO: Confirm sampling...

/*******************************************************************************
 *
 * Log Logisitic distribution.
 * @class LogLogistic
 * @extends DistAbstract
 *
 ******************************************************************************/
export class LogLogistic extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param scale {Number} Scale parameter value.
  * @param shape {Number} Shape parameter value.
  * @throws {ParamError} On invalid parameter.
  */
  constructor (scale, shape) {
    super();
    if (scale <= 0) {
      throw new ParamError(0, 'scale', 'scale parameter must be greater than 0.');
    }
    if (shape <= 0) {
      throw new ParamError(1, 'shape', 'shape parameter must be greater than 0.');
    }
    this.scale = scale;
    this.shape = shape;
  }

 /**
  * Cumulative density function.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  */
  cdf (x) {
    if (x < 0) return 0;
    return 1 / (1 + Math.pow(x/this.scale, -this.shape));
  }

 /**
  * Returns distribution mean.
  * @method mean
  * @return {Number} Distribution mean.
  */
  mean () {
    if (this.shape < 1) throw new Error('LogLogistic shape parameter < 1: no mean defined.');
    return (this.scale * Math.PI / this.shape) /
      Math.sin(Math.PI / this.shape);
  }

 /**
  * Returns distribution median.
  * @method median
  * @return {Number}
  */
  median () {
    return this.scale;
  }

 /**
  * Returns distribution mode.
  * @method mode
  * @return {Number}
  */
  mode () {
    return this.shape > 1 ?
      this.scale * Math.pow((this.shape - 1) / (this.shape + 1), 1 / this.shape) :
      0;
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    if (x < 0) return 0;
    const num = (this.shape / this.scale) * Math.pow(x / this.scale, this.shape - 1);
    const den = Math.pow(1 + Math.pow(x / this.scale, this.shape), 2);
    return num / den;
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
  * Samples distribution.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Sampled value.
  */
  sampleValue (generator) {
    const l = new Logistic(Math.log(this.scale), 1 / this.shape);
    const s = l.sampleValue(generator);
    return Math.exp(s);
  }

 /**
  * Returns variance.
  * @method variance
  * @return {Number}
  */
  variance () {
    if (this.shape <= 2) {
      return undefined;
    }
    const a = this.scale;
    const b = Math.PI / this.shape;
    return Math.pow(a, 2) * ( (2*b)/Math.sin(2*b) - Math.pow(b, 2)/Math.pow(Math.sin(b), 2) );
  }

}

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */
LogLogistic.params = {
  scale: {
    description  : 'Real number greater than 0.',
    min          : 0,
    minInclusive : false
  },
  shape: {
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
LogLogistic.distName = 'Log-logistic';
