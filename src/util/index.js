var MersenneTwister = require('mersenne-twister');

/**
 * Factorial function.
 * @method factorial
 * @param x {Number}
 * @return {Number}
 */
export function factorial (x) {
  if (x === 0) return 1;
  return x * factorial(x - 1);
}

/**
 * Abstract superclass for distributions.
 * @class DistAbstract
 */
export class DistAbstract {

  constructor () {}

 /**
  * Cumulative density function. Must be implemented by subclasses.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  */
  cdf (x) {
    return undefined;
  }

 /**
  * Returns distribution mean. Must be implemented by subclasses.
  * @method mean
  * @return {Number}
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
    return undefined;
  }

 /**
  * Probability density function. Must be implemented by subclasses.
  * @method pdf
  * @param x {Number}
  * @return {Number}
  */
  pdf (x) {
    return undefined;
  }

 /**
  * Samples distribution.
  * @method sample
  * @param n {Number} [optional] Number of samples.
  * @param generator {Object} [optional] Random generator with random() method.
  * @return {Number|Number[]} Single number if single sample, else array of sample values.
  */
  sample (n, generator) {

    n = n || 1;
    generator = generator || new MersenneTwister();

    if (n === 1) {
      return this.sampleValue(generator);
    }
    else {
      let result = [];
      for (let i = 0; i < n; i++) {
        result.push(this.sampleValue(generator));
      }
      return result;
    }
  }

 /**
  * Samples single value. Must be implemented by subclasses.
  * @method sampleValue
  * @param generator {Object} With random() method.
  * @return {Number}
  */
  sampleValue (generator) {
    throw new Error('sampleValue() not implemented.');
  }
}
