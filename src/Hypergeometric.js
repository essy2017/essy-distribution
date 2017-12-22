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
import ParamError from './ParamError';

/**
 * Validates integer.
 * @method checkInt
 * @param int {Number} Integer to check.
 * @param max {Number} [optional] Max allowed for integer.
 * @return {Boolean} True if valid.
 */
function checkInt (int, max) {
  if (int < 0) return false;
  if (Math.floor(int) !== int) return false;
  if (typeof max !== 'undefined') {
    if (int > max) return false;
  }
  return true;
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


// From cern.jet.math.Arithmetic
var logFactorials = [
   0.00000000000000000,   0.00000000000000000,   0.69314718055994531,
   1.79175946922805500,   3.17805383034794562,   4.78749174278204599,
   6.57925121201010100,   8.52516136106541430,  10.60460290274525023,
  12.80182748008146961,  15.10441257307551530,  17.50230784587388584,
  19.98721449566188615,  22.55216385312342289,  25.19122118273868150,
  27.89927138384089157,  30.67186010608067280,  33.50507345013688888,
  36.39544520803305358,  39.33988418719949404,  42.33561646075348503,
  45.38013889847690803,  48.47118135183522388,  51.60667556776437357,
  54.78472939811231919,  58.00360522298051994,  61.26170176100200198,
  64.55753862700633106,  67.88974313718153498,  71.25703896716800901
];

// From cern.jet.math.Arithmetic
function logFactorial (k) {
  k = Math.floor(k);
	if (k >= 30) {
    var r, rr;
		var C0 =  9.18938533204672742e-01;
		var C1 =  8.33333333333333333e-02;
		var C3 = -2.77777777777777778e-03;
		var C5 =  7.93650793650793651e-04;
		var C7 = -5.95238095238095238e-04;

		r  = 1.0 / k;
		rr = r * r;
		return (k + 0.5)*Math.log(k) - k + C0 + r*(C1 + rr*(C3 + rr*(C5 + rr*C7)));
	}
	else {
		return logFactorials[k];
  }
}

// From cern.jet.math.Arithmetic
function fc_lnpk (k, N_Mn, M, n) {
	return (logFactorial(k) + logFactorial(M - k) + logFactorial(n - k) + logFactorial(N_Mn + k));
}

/*******************************************************************************
 *
 * A hypergeometric distribution.
 * @class Hypergeometric
 * @extends DistAbstract
 *
 ******************************************************************************/
export class Hypergeometric extends DistAbstract {

 /**
  * Constructor.
  * @method constructor
  * @param N {Number} Integer >= 0.
  * @param M {Number} Integer >= 0 and <= N.
  * @param n {Number} Integer >= 0 and <= N.
  * @throws {ParamError} On invalid parameter value.
  */
  constructor (N, M, n) {
    super();
    if (!checkInt(N)) {
      throw new ParamError(0, 'N', 'N parameter must be integer greater than or equal to 0.');
    }
    if (!checkInt(M, N)) {
      throw new ParamError(1, 'M', 'M parameter must be integer greater than or equal to 0 and less than or equal to N.');
    }
    if (!checkInt(n, N)) {
      throw new ParamError(2, 'n', 'n parameter must be integer greater than or equal to 0 and less than or equal to N.');
    }
    this.N = N;
    this.M = M;
    this.n = n;

    // cached vars shared by hmdu(...) and hprs(...)
    this.N_last = this.M_last = this.n_last = -1;
    this.N_Mn = this.m = null;

  	// cached vars for hmdu(...)
    this.mp = this.b = this.Mp = this.np = this.fm = null;

  	// cached vars for hprs(...)
    this.k2 = this.k4 = this.k1 = this.k5 = null;
    this.dl = this.dr = this.r1 = this.r2 = this.r4 = this.r5 = this.ll = this.lr = this.c_pm = null;
    this.f1 = this.f2 = this.f4 = this.f5 = this.p1 = this.p2 = this.p3 = this.p4 = this.p5 = this.p6 = null;
  }

 /**
  * Returns distribution mean.
  * @method mean
  * @return {Number}
  */
  mean () {
    return this.n * (this.M / this.N);
  }

 /**
  * Probability density function.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  * @throws {RangeError} If x is not an integer.
  */
  pdf (x) {

    var min = Math.max(0, this.n + this.M - this.N),
        max = Math.min(this.n, this.M);

    if (x < min || x > max) return 0;

    if (Math.floor(x) !== x) {
      throw new RangeError('x must be an integer.');
    }

    return (choose(this.M, x) * choose(this.N - this.M, this.n - x)) / choose(this.N, this.n);
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
      min          : Math.max(0, this.n + this.M - this.N),
      minInclusive : true,
      max          : Math.min(this.n, this.M),
      maxInclusive : true,
      discrete     : true
    };
  }

 /**
  * Samples random value. From cern.jet.random.HyperGeometric.
  * @method sampleValue
  * @param generator {RandomEngine} With random() method.
  * @return {Number}
  */
  sampleValue (generator) {

    var Nhalf, n_le_Nhalf, M_le_Nhalf, K;

  	Nhalf =  this.N / 2;
  	n_le_Nhalf = (this.n <= Nhalf)  ?  this.n  :  this.N - this.n;
  	M_le_Nhalf = (this.M <= Nhalf)  ?  this.M  :  this.N - this.M;

  	if ((this.n*this.M/this.N) < 10) {
  		K = (n_le_Nhalf <= M_le_Nhalf)
  			?  this.hmdu(this.N, M_le_Nhalf, n_le_Nhalf, generator)
  			:  this.hmdu(this.N, n_le_Nhalf, M_le_Nhalf, generator);
  	}
  	else {
  		K = (n_le_Nhalf <= M_le_Nhalf)
  			?  this.hprs(this.N, M_le_Nhalf, n_le_Nhalf, generator)
  			:  this.hprs(this.N, n_le_Nhalf, M_le_Nhalf, generator);
  	}

  	if (this.n <= Nhalf) {
  		return (this.M <= Nhalf) ? K : this.n - K;
  	}
  	else {
  		return (this.M <= Nhalf) ? this.M - K : this.n - this.N + this.M + K;
  	}
  }

 /**
  * Returns variance.
  * @method variance
  * @return {Number}
  */
  variance () {
    return this.n * (this.M / this.N) * ((this.N - this.M) / this.N) * ((this.N - this.n) / (this.N - 1));
  }

 /**
  * From cern.jet.random.HyperGeometric
  */
  hmdu (N, M, n, generator) {

    var I, K, p, nu, c, d, U;

    if (N != this.N_last || M != this.M_last || n != this.n_last) {   // set-up           */
      this.N_last = N;
     this.M_last = M;
     this.n_last = n;

     this.Mp = (M + 1);
     this.np = (n + 1);  this.N_Mn = N - M - n;

     p  = this.Mp / (N + 2.0);
     nu = this.np * p;                             /* mode, real       */
     if ((this.m = nu) == nu && p == 0.5) {     /* mode, integer    */
      this.mp = this.m--;
     }
     else {
      this.mp = this.m + 1;                           /* mp = m + 1       */
      }

   /* mode probability, using the external function flogfak(k) = ln(k!)    */
     this.fm = Math.exp(logFactorial(N - M) - logFactorial(this.N_Mn + this.m) - logFactorial(n - this.m)
       + logFactorial(M)     - logFactorial(M - this.m)    - logFactorial(this.m)
       - logFactorial(N)     + logFactorial(N - n)    + logFactorial(n)   );

   /* safety bound  -  guarantees at least 17 significant decimal digits   */
   /*                  b = min(n, (long int)(nu + k*c')) */
      this.b = (nu + 11.0 * Math.sqrt(nu * (1.0 - p) * (1.0 - n/N) + 1.0));
      if (this.b > n) this.b = n;
    }

    for (;;) {
      if ((U = generator.random() - this.fm) <= 0.0)  return(this.m);
      c = d = this.fm;

   /* down- and upward search from the mode                                */
      for (I = 1; I <= this.m; I++) {
        K  = this.mp - I;                                   /* downward search  */
        c *= K/(this.np - K) * ((this.N_Mn + K)/(this.Mp - K));
        if ((U -= c) <= 0.0)  return(K - 1);

        K  = this.m + I;                                    /* upward search    */
        d *= (this.np - K)/K * ((this.Mp - K)/(this.N_Mn + K));
        if ((U -= d) <= 0.0)  return(K);
      }

   /* upward search from K = 2m + 1 to K = b                               */
      for (K = this.mp + this.m; K <= this.b; K++) {
        d *= (this.np - K)/K * ((this.Mp - K)/(this.N_Mn + K));
        if ((U -= d) <= 0.0)  return(K);
      }
    }
  }

  hprs (N, M, n, generator) {

    var Dk, X, V, Mp, np, p, nu, U, Y, W;

  	if (N != this.N_last || M != this.M_last || n != this.n_last) {  /* set-up            */
  		this.N_last = N;
  		this.M_last = M;
  		this.n_last = n;

  		Mp = (M + 1);
  		np = (n + 1);  this.N_Mn = N - M - n;

  		p  = Mp / (N + 2.0);  nu = np * p;              // main parameters

  		// approximate deviation of reflection points k2, k4 from nu - 1/2
  		U  = Math.sqrt(nu * (1.0 - p) * (1.0 - (n + 2.0)/(N + 3.0)) + 0.25);

  		// mode m, reflection points k2 and k4, and points k1 and k5, which
  		// delimit the centre region of h(x)
  		// k2 = ceil (nu - 1/2 - U),    k1 = 2*k2 - (m - 1 + delta_ml)
  		// k4 = floor(nu - 1/2 + U),    k5 = 2*k4 - (m + 1 - delta_mr)

  		this.m  = nu;
  		this.k2 =  Math.ceil(nu - 0.5 - U);  if (this.k2 >= this.m)  this.k2 = this.m - 1;
  		this.k4 = (nu - 0.5 + U);
  		this.k1 = this.k2 + this.k2 - this.m + 1;            				// delta_ml = 0
  		this.k5 = this.k4 + this.k4 - this.m;                               // delta_mr = 1

  		// range width of the critical left and right centre region
  		this.dl = (this.k2 - this.k1);
  		this.dr = (this.k5 - this.k4);

  		// recurrence constants r(k) = p(k)/p(k-1) at k = k1, k2, k4+1, k5+1
  		this.r1 = (np/ this.k1       - 1.0) * (Mp - this.k1)/(this.N_Mn + this.k1);
  		this.r2 = (np/ this.k2       - 1.0) * (Mp - this.k2)/(this.N_Mn + this.k2);
  		this.r4 = (np/(this.k4 + 1) - 1.0) * (M  - this.k4)/(this.N_Mn + this.k4 + 1);
  		this.r5 = (np/(this.k5 + 1) - 1.0) * (M  - this.k5)/(this.N_Mn + this.k5 + 1);

  		// reciprocal values of the scale parameters of expon. tail envelopes
  		this.ll =  Math.log(this.r1);                                  // expon. tail left  //
  		this.lr = -Math.log(this.r5);                                  // expon. tail right //

  		// hypergeom. constant, necessary for computing function values f(k)

  		this.c_pm = fc_lnpk(this.m, this.N_Mn, M, n);

  		// function values f(k) = p(k)/p(m)  at  k = k2, k4, k1, k5
  		this.f2 = Math.exp(this.c_pm - fc_lnpk(this.k2, this.N_Mn, M, n));
  		this.f4 = Math.exp(this.c_pm - fc_lnpk(this.k4, this.N_Mn, M, n));
  		this.f1 = Math.exp(this.c_pm - fc_lnpk(this.k1, this.N_Mn, M, n));
  		this.f5 = Math.exp(this.c_pm - fc_lnpk(this.k5, this.N_Mn, M, n));

  		// area of the two centre and the two exponential tail regions
  		// area of the two immediate acceptance regions between k2, k4
  		this.p1 = this.f2 * (this.dl + 1.0);                           // immed. left
  		this.p2 = this.f2 * this.dl         + this.p1;                      // centre left
  		this.p3 = this.f4 * (this.dr + 1.0) + this.p2;                      // immed. right
  		this.p4 = this.f4 * this.dr         + this.p3;                      // centre right
  		this.p5 = this.f1 / this.ll         + this.p4;                      // expon. tail left
  		this.p6 = this.f5 / this.lr         + this.p5;                      // expon. tail right
  	}

  	for (;;) {
  		// generate uniform number U -- U(0, p6)
  		// case distinction corresponding to U
  		if ((U = generator.random() * this.p6) < this.p2) {    // centre left

  			// immediate acceptance region R2 = [k2, m) *[0, f2),  X = k2, ... m -1
  			if ((W = U - this.p1) < 0.0)  return(this.k2 + (U/this.f2));
  			// immediate acceptance region R1 = [k1, k2)*[0, f1),  X = k1, ... k2-1
  			if ((Y = W / this.dl) < this.f1 )  return(this.k1 + (W/this.f1));

  			// computation of candidate X < k2, and its counterpart V > k2
  			// either squeeze-acceptance of X or acceptance-rejection of V
  			Dk = (this.dl * generator.random()) + 1;
  			if (Y <= this.f2 - Dk * (this.f2 - this.f2/this.r2)) {            // quick accept of
  				return(this.k2 - Dk);                          // X = k2 - Dk
  			}
  			if ((W = this.f2 + this.f2 - Y) < 1.0) {                // quick reject of V
  				V = this.k2 + Dk;
  				if (W <= this.f2 + Dk * (1.0 - this.f2)/(this.dl + 1.0)) { // quick accept of
  					return(V);                              // V = k2 + Dk
  				}
  				if (Math.log(W) <= this.c_pm - fc_lnpk(V, this.N_Mn, M, n)) {
  					return(V);               // final accept of V
  				}
  			}
  			X = this.k2 - Dk;
  		}
  		else if (U < this.p4) {                              // centre right

  			// immediate acceptance region R3 = [m, k4+1)*[0, f4), X = m, ... k4
  			if ((W = U - this.p3) < 0.0)  return(this.k4 - ((U - this.p2)/this.f4));
  			// immediate acceptance region R4 = [k4+1, k5+1)*[0, f5)
  			if ((Y = W / this.dr) < this.f5 )  return(this.k5 - (W/this.f5));

  			// computation of candidate X > k4, and its counterpart V < k4
  			// either squeeze-acceptance of X or acceptance-rejection of V
  			Dk = (this.dr * generator.random()) + 1;
  			if (Y <= this.f4 - Dk * (this.f4 - this.f4*this.r4)) {            // quick accept of
  				return(this.k4 + Dk);                          // X = k4 + Dk
  			}
  			if ((W = this.f4 + this.f4 - Y) < 1.0) {                // quick reject of V
  				V = this.k4 - Dk;
  				if (W <= this.f4 + Dk * (1.0 - this.f4)/this.dr) {       // quick accept of
  					return(V);                            // V = k4 - Dk
  				}
  				if (Math.log(W) <= this.c_pm - fc_lnpk(V, this.N_Mn, M, n)) {
  					return(V);                            // final accept of V
  				}
  			}
  			X = this.k4 + Dk;
  		}
  		else {

  			Y = generator.random();
  			if (U < this.p5) {                                 // expon. tail left
  				Dk = (1.0 - Math.log(Y)/this.ll);
  				if ((X = this.k1 - Dk) < 0)  continue;         // 0 <= X <= k1 - 1
  				Y *= (U - this.p4) * this.ll;                       // Y -- U(0, h(x))
  				if (Y <= this.f1 - Dk * (this.f1 - this.f1/this.r1)) {
  					return(X);                            // quick accept of X
  				}
  			}
  			else {                                        // expon. tail right
  				Dk = (1.0 - Math.log(Y)/this.lr);
  				if ((X = this.k5 + Dk) > n )  continue;        // k5 + 1 <= X <= n
  				Y *= (U - this.p5) * this.lr;                       // Y -- U(0, h(x))   /
  				if (Y <= this.f5 - Dk * (this.f5 - this.f5*this.r5)) {
  					return(X);                            // quick accept of X
  				}
  			}
  		}

  	// acceptance-rejection test of candidate X from the original area
  	// test, whether  Y <= f(X),    with  Y = U*h(x)  and  U -- U(0, 1)
  	// log f(X) = log( m! (M - m)! (n - m)! (N - M - n + m)! )
  	//          - log( X! (M - X)! (n - X)! (N - M - n + X)! )
  	// by using an external function for log k!

  		if (Math.log(Y) <= this.c_pm - fc_lnpk(X, this.N_Mn, M, n))  return(X);
  	}
  }
}

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */
Hypergeometric.params = {
  N : 'Integer greater than or equal to 0.',
  M : 'Integer greater than or equal to 0 and less than or equal to N.',
  n : 'Integer greater than or equal to 0 and less than or equal to N.'
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Hypergeometric.distName = 'Hypergeometric';

/**
 * Indication that distribution is discrete.
 * @property discrete
 * @type Boolean
 * @static
 */
Hypergeometric.discrete = true;
