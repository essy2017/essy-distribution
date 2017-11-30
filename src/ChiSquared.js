/*
Copyright � 1999 CERN - European Organization for Nuclear Research.
Permission to use, copy, modify, distribute and sell this software and its documentation for any purpose
is hereby granted without fee, provided that the above copyright notice appear in all copies and
that both that copyright notice and this permission notice appear in supporting documentation.
CERN makes no representations about the suitability of this software for any purpose.
It is provided "as is" without expressed or implied warranty.
*/
'use strict';

import { DistAbstract } from './util';
import { gamma } from 'mathfn';
const incompleteGamma = require('incomplete-gamma');

/*******************************************************************************
 *
 * Chi-squared distribution.
 * @class ChiSquared
 * @extends DistAbstract
 *
 ******************************************************************************/
export class ChiSquared extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param freedom {Number} Degrees of freedom.
  */
  constructor (freedom) {
    super();
    if (freedom < 0) {
      throw new RangeError('freedom parameter must be greater than 0.');
    }
    this.df = freedom;

    // Caching for subsequent samples.
    this.df_in = -1;
    this.b = null;
    this.vm = null;
    this.vp = null;
    this.vd = null;
  }

 /**
  * Cumulative distribution function.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  */
  cdf (x) {
    return (1 / gamma(this.df/2)) * incompleteGamma.lower(this.df/2, x/2);
  }

 /**
  * Returns distribution mean.
  * @method mean
  * @return {Number}
  */
  mean () {
    return this.df;
  }

 /**
  * Returns distribution median.
  * @method median
  * @return {Number}
  */
  median () {
    return this.df * Math.pow(1 - 2 / (9 * this.df), 3);
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    return (1 / (Math.pow(2, this.df / 2) * gamma(this.df / 2))) *
      Math.pow(x, this.df / 2 - 1) * Math.exp(-(x / 2));
  }

 /**
  * Samples random value from distribution.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number}
  */
  sampleValue (generator) {

    var u,v,z,zz,r;

  	if (this.df == 1.0) {
  		for(;;) {
  			u = generator.random();
  			v = generator.random() * 0.857763884960707;
  			z = v / u;
  			if (z < 0) continue;
  			zz = z * z;
  			r = 2.5 - zz;
  			if (z < 0.0) r = r + zz * z / (3.0 * z);
  			if (u < r * 0.3894003915) return(z*z);
  			if (zz > (1.036961043 / u + 1.4)) continue;
  			if (2.0 * Math.log(u) < (- zz * 0.5 )) return(z*z);
  		}
  	}
  	else {
  		if (this.df != this.df_in) {
  			this.b = Math.sqrt(this.df - 1.0);
  			this.vm = - 0.6065306597 * (1.0 - 0.25 / (this.b * this.b + 1.0));
  			this.vm = (-this.b > this.vm) ? -this.b : this.vm;
  			this.vp = 0.6065306597 * (0.7071067812 + this.b) / (0.5 + this.b);
  			this.vd = this.vp - this.vm;
  			this.df_in = this.df;
  		}
  		for(;;) {
  			u = generator.random();
  			v = generator.random() * this.vd + this.vm;
  			z = v / u;
  			if (z < -this.b) continue;
  			zz = z * z;
  			r = 2.5 - zz;
  			if (z < 0.0) r = r + zz * z / (3.0 * (z + this.b));
  			if (u < r * 0.3894003915) return((z + this.b)*(z + this.b));
  			if (zz > (1.036961043 / u + 1.4)) continue;
  			if (2.0 * Math.log(u) < (Math.log(1.0 + z / this.b) * this.b * this.b - zz * 0.5 - z * this.b)) return((z + this.b)*(z + this.b));
  		}
  	}
  }

 /**
  * Returns variance.
  * @method variance
  * @return {Number}
  */
  variance () {
    return 2 * this.df;
  }
}