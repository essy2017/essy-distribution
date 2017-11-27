'use strict';

import { DistAbstract } from './util';
import { erf } from 'mathfn';

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
 * A normal distribution. Adapted from CERN Java implementation.
 * @class Normal
 * @extends DistAbstract
 *
 ******************************************************************************/
export class Normal extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param mean {Number} Mean parameter.
  * @param se {Number} Standard error parameter. >0.
  * @throws {RangeError} If se parameter is not greater than 0.
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
    return 0.5 * (1 + erf((x - this.m) / (this.se * Math.sqrt(2))));
  }

 /**
  * Returns mean distribution value.
  * @method mean
  * @return {Number} Mean value.
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
    return (1 / Math.sqrt(2 * Math.pow(this.se, 2) * Math.PI)) *
           Math.exp(- (Math.pow(x - this.m, 2) / (2 * Math.pow(this.se, 2)) ) );
  }

 /**
  * Returns sample from distribution.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Sampled value.
  */
  sampleValue (generator) {

    let x, y, r, z;

    do {
      x = 2 * generator.random() - 1;
      y = 2 * generator.random() - 1;
      r = x*x + y*y;
    } while (r >= 1);

    z = Math.sqrt(-2 * Math.log(r) / r);
    return this.m + this.se * y * z;
  }

}
