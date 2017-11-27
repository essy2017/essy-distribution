'use strict';

import { DistAbstract } from './util';
import { beta, incBeta } from 'mathfn';

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
 * A logarithmic distribution. Adapted from CERN Java implementation.
 * @class Logarithmic
 * @extends DistAbstract
 *
 ******************************************************************************/
export class Logarithmic extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param prob {Number} Probability parameter value. [0, 1]
  */
  constructor (prob) {
    super();
    if (prob < 0 || prob > 1) {
      throw new RangeError('probability parameter must be in range [0, 1].');
    }
    this.prob = prob;
  }

 /**
  * Cumulative density function.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  */
  //cdf (x) {
    //const b = incBeta(this.prob, x + 1, 0) / beta(x + 1, 0);
    //return 1 + (incBeta(this.prob, x + 1, 0) / Math.log(1 - this.prob));
    //return incBeta(this.prob, x + 1, 0);
  //}

 /**
  * Returns distribution mean.
  * @method mean
  * @return {Number} Mean value for distribution.
  */
  mean () {
    return (-1 / Math.log(1 - this.prob)) * (this.prob / (1 - this.prob));
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    return (-1 / Math.log(1 - this.prob)) * (Math.pow(this.prob, x) / x);
  }

 /**
  * Returns sampled value.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Random sampled value.
  */
  sampleValue (generator) {

    const a = this.prob;
    let t = -1, h = -1, u, v, p, q, k;

    if (a < 0.97) {
      t = -a / Math.log(1 - a);
    }
    else {
      h = Math.log(1 - a);
    }

    u = generator.random();
    if (a < 0.97) {
      k = 1;
      p = t;
      while (u > p) {
        u -= p;
        k++;
        p *= a * (k - 1)/k;
      }
      return k;
    }

    if (u > a) {
      return 1;
    }

    u = generator.random();
    v = u;
    q = 1 - Math.exp(v * h);
    if (u <= q * q) {
      k = 1 + Math.log(u) / Math.log(q);
      return k;
    }
    if (u > q) {
      return 1;
    }
    return 2;

  }

}
