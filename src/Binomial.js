'use strict';

import { DistAbstract, factorial } from './util';
import ParamError from './ParamError';
import { regIncBeta } from 'essy-stats';

/*
Copyright  1999 CERN - European Organization for Nuclear Research.
Permission to use, copy, modify, distribute and sell this software and its documentation for any purpose
is hereby granted without fee, provided that the above copyright notice appear in all copies and
that both that copyright notice and this permission notice appear in supporting documentation.
CERN makes no representations about the suitability of this software for any purpose.
It is provided "as is" without expressed or implied warranty.
*/

// Lookups for stirlingCorrection().
const STIRLINGS = [
  0.0,
	     8.106146679532726e-02, 4.134069595540929e-02,
	     2.767792568499834e-02, 2.079067210376509e-02,
	     1.664469118982119e-02, 1.387612882307075e-02,
	     1.189670994589177e-02, 1.041126526197209e-02,
	     9.255462182712733e-03, 8.330563433362871e-03,
	     7.573675487951841e-03, 6.942840107209530e-03,
	     6.408994188004207e-03, 5.951370112758848e-03,
	     5.554733551962801e-03, 5.207655919609640e-03,
	     4.901395948434738e-03, 4.629153749334029e-03,
	     4.385560249232324e-03, 4.166319691996922e-03,
	     3.967954218640860e-03, 3.787618068444430e-03,
	     3.622960224683090e-03, 3.472021382978770e-03,
	     3.333155636728090e-03, 3.204970228055040e-03,
	     3.086278682608780e-03, 2.976063983550410e-03,
	     2.873449362352470e-03, 2.777674929752690e-03
];

/**
 * Returns the StirlingCorrection.
 * Correction term of the Stirling approximation for log(k!)
 * (series in 1/k, or table values for small k)
 * with int parameter k.
 *
 * log k! = (k + 1/2)log(k + 1) - (k + 1) + (1/2)log(2Pi) +
 *          stirlingCorrection(k + 1)
 *
 * log k! = (k + 1/2)log(k)     -  k      + (1/2)log(2Pi) +
 *          stirlingCorrection(k)
 *
 */
function stirlingCorrection (k) {
	const C1 =  8.33333333333333333e-02;     //  +1/12
	const C3 = -2.77777777777777778e-03;     //  -1/360
	const C5 =  7.93650793650793651e-04;     //  +1/1260
	const C7 = -5.95238095238095238e-04;     //  -1/1680

	let r, rr;

	if (k > 30) {
		r = 1 / k;
		rr = r * r;
		return r*(C1 + rr*(C3 + rr*(C5 + rr*C7)));
	}
	else {
    return STIRLINGS[k];
  }
}

/**
 * Performs n choose k.
 * @method choose
 * @param n {Number}
 * @param k {Number}
 * @return {Number}
 */
function choose (n, k) {

  if (k < 0) return 0;
	if (k === 0) return 1;
	if (k === 1) return n;

	// binomial(n,k) = (n * n-1 * ... * n-k+1 ) / ( 1 * 2 * ... * k )
	var a = n - k + 1,
	    b = 1,
	    bin = 1;
	for (var i = k; i-- > 0; ) {
		bin *= (a++) / (b++);
	}
	return bin;
}

/*******************************************************************************
 *
 * Binomial distribution.
 * @class Binomial
 * @extends DistAbstract
 *
 ******************************************************************************/
export class Binomial extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param n {Number} Trials. Positive integer.
  * @param p {Number} Probability. [0, 1]
  * @throws {ParamError} If parameters are invalid.
  */
  constructor (n, p) {
    super();
    if (n < 1 || Math.floor(n) !== n) {
      throw new ParamError(0, 'n', 'n parameter must be positive integer.');
    }
    if (p < 0 || p > 1) {
      throw new ParamError(1, 'p', 'p parameter must be between 0 and 1.');
    }
    this.n = n;
    this.p = p;
  }

 /**
  * Cumulative density function.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  * @throws {RangeError} On invalid x.
  */
  cdf (x) {
    if (x < 0 || Math.floor(x) !== x) {
      throw new RangeError('x must be a positive integer.');
    }
    return this.n === x ? 1 : regIncBeta(this.n - x, 1 + x, 1 - this.p);
  }

 /**
  * Returns distribution mean.
  * @method mean
  * @return {Number} Distribution mean.
  */
  mean () {
    return this.n * this.p;
  }

 /**
  * Returns distribution median.
  * @method median
  * @return {Number}
  */
  median () {
    return Math.floor(this.n * this.p);
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  * @throws {RangeError} On invalid x.
  */
  pdf (x) {
    if (x < 0 || Math.floor(x) !== x) {
      throw new RangeError('x must be a positive integer.');
    }
    return choose(this.n, x) * Math.pow(this.p, x) * Math.pow(1 - this.p, this.n - x);
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
      minInclusive : true,
      max          : this.n,
      maxInclusive : true,
      discrete     : true
    };
  }

 /**
  * Samples value from distribution.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number} Sampled value.
  */
  sampleValue (generator) {

    const C1_3 = 0.33333333333333333;
    const C5_8 = 0.62500000000000000;
    const C1_6 = 0.16666666666666667;
    const DMAX_KM = 20;

    const n = this.n;
    const p = this.p;

    let bh, i, K, Km, nK;
    let f, rm, U, V, X, T, E;
    let m, p0, b, rc, ss, xm, xl, xr, c, ll, lr;
    let p1, p2, p3, p4;
    let pq, nm, ch;

    let par = Math.min(p, 1-p);
    let q = 1-par;
    let np = n*par;

    // Check for invalid input values
    if( np <= 0 ) return -1;

    rm = np + par;
    m = rm;                      		     // mode, integer
    if (np < 10) {
    	p0 = Math.exp(n * Math.log(q));    // Chop-down
    	bh = (np + 10*Math.sqrt(np*q));
    	b = Math.min(n, bh);
    }
    else {
    	rc = (n + 1.0) * (pq = par / q);   // recurr. relat.
    	ss = np * q;                       // variance
    	i  = 2.195*Math.sqrt(ss) - 4.6*q;  // i = p1 - 0.5
    	xm = m + 0.5;
    	xl = m - i;                        // limit left
    	xr = m + i + 1;                    // limit right
    	f  = (rm - xl) / (rm - xl*par);
      ll = f * (1.0 + 0.5*f);
    	f  = (xr - rm) / (xr * q);
      lr = f * (1.0 + 0.5*f);
    	c  = 0.134 + 20.5/(15.3 + m);      // parallelogram
    										 			           // height
    	p1 = i + 0.5;
    	p2 = p1 * (1.0 + c + c);                  // probabilities
    	p3 = p2 + c/ll;                           // of regions 1-4
    	p4 = p3 + c/lr;
    }

    if (np < 10) {                                      //Inversion Chop-down
    	let pk;

    	K = 0;
    	pk = p0;
    	U = generator.random();
    	while (U > pk) {
    		++K;
    		if (K > b) {
    			U = generator.random();
    			K = 0;
    			pk = p0;
    		}
    		else {
    			U -= pk;
    			pk = ((n-K+1)*par*pk)/(K*q);
    		}
    	}

      return (p > 0.5) ? (n-K) : K;
    }

    for (;;) {
    	V = generator.random();
    	if ((U = generator.random() * p4) <= p1) {    // triangular region
    		K = xm - U + p1*V;
    		return (p > 0.5) ? (n-K) : K;  // immediate accept
    	}
    	if (U <= p2) {                               	 // parallelogram
    		X = xl + (U - p1)/c;
    		if ((V = V*c + 1.0 - Math.abs(xm - X)/p1) >= 1.0)  continue;
    		K = X;
    	}
    	else if (U <= p3) {                           	 // left tail
    		if ((X = xl + Math.log(V)/ll) < 0.0)  continue;
    		K = X;
    		V *= (U - p2) * ll;
    	}
    	else {                                        	 // right tail
    		if ((K = (xr - Math.log(V)/lr)) > n)  continue;
    		V *= (U - p3) * lr;
    	}

    	// acceptance test :  two cases, depending on |K - m|
    	if ((Km = Math.abs(K - m)) <= DMAX_KM || Km + Km + 2 >= ss) {

    		// computation of p(K) via recurrence relationship from the mode
    		f = 1;                              // f(m)
    		if (m < K) {
    			for (i = m; i < K; ) {
    				if ((f *= (rc / ++i - pq)) < V)  break;  // multiply  f
    			}
    		}
    		else {
    			for (i = K; i < m; ) {
    				if ((V *= (rc / ++i - pq)) > f)  break;  // multiply  V
    			}
    		}
    		if (V <= f)  break;                       		 // acceptance test
    	}
    	else {

    		// lower and upper squeeze tests, based on lower bounds for log p(K)
    		V = Math.log(V);
    		T = - Km * Km / (ss + ss);
    		E =  (Km / ss) * ((Km * (Km * C1_3 + C5_8) + C1_6) / ss + 0.5);
    		if (V <= T - E)  break;
    		if (V <= T + E) {
    	    nm = n - m + 1;
    		  ch = xm * Math.log((m + 1.0)/(pq * nm)) +
    				   stirlingCorrection(m + 1) + stirlingCorrection(nm);
    			nK = n - K + 1;

    			// computation of log f(K) via Stirling's formula
    			// final acceptance-rejection test
    			if (V <= ch + (n + 1.0)*Math.log(nm / nK) +
    				(K + 0.5)*Math.log(nK * pq / (K + 1.0)) -
    				stirlingCorrection(K + 1) - stirlingCorrection(nK))  break;
    			}
    		}
    	}
    	return (p>0.5) ? (n-K) : K;
  }

 /**
  * Returns variance.
  * @method variance
  * @return {Number}
  */
  variance () {
    return this.n * this.p * (1 - this.p);
  }
}


/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */
Binomial.params = {
  n : 'Integer greater than 0.',
  p : 'Real number in the range [0, 1].'
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Binomial.distName = 'Binomial';

/**
 * Indication that distribution is discrete.
 * @property discrete
 * @type Boolean
 * @static
 */
Binomial.discrete = true;
