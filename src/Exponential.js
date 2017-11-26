'use strict';

import { DistAbstract } from './util';

/*
Copyright 1999 CERN - European Organization for Nuclear Research.
Permission to use, copy, modify, distribute and sell this software and its documentation for any purpose
is hereby granted without fee, provided that the above copyright notice appear in all copies and
that both that copyright notice and this permission notice appear in supporting documentation.
CERN makes no representations about the suitability of this software for any purpose.
It is provided "as is" without expressed or implied warranty.
*/


/*******************************************************************************
 *
 * Exponential distribution. Adapted from CERN Java implementation.
 * @class Exponential
 * @extends DistAbstract
 *
 ******************************************************************************/
export class Exponential extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param lambda {Number} Scale parameter value.
  */
  constructor (lambda) {
    super();
    this.lambda = lambda;
  }

 /**
  * Cumulative density function.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  */
  cdf (x) {
    return 1 - Math.exp(-x * this.lambda);
  }

 /**
  * Returns distribution mean.
  * @method mean
  * @return {Number} Mean of distribution.
  */
  mean () {
    return 1 / this.lambda;
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    return this.lambda * Math.exp(-x * this.lambda);
  }

 /**
  * Returns sample value.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Random sample from distribution.
  */
  sampleValue (generator) {
    return -Math.log(generator.random()) / this.lambda;
  }

}