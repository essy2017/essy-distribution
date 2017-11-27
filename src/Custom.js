'use strict';

import { DistAbstract } from './util';
import { Uniform } from './Uniform';

/*******************************************************************************
 *
 * Custom distribution.
 * @class Custom 
 * @extends DistAbstract
 *
 ******************************************************************************/
export class Custom extends DistAbstract {
  
 /**
  * Constructor.
  * @method constructor 
  * @param values {Number[]} Values for distribution.
  */  
  constructor (values) {
    super();
    this.values = values.sort( (a, b) => a - b );
  }

 /**
  * Cumulative distribution function.
  * @method cdf
  * @param x {Number}
  * @return {Number}
  */  
  cdf (x) {
    
    let index = -1;
    const n = this.values.length;
    
    if (x < this.values[0]) {
      return 0;
    }
    
    let i = n - 1;
    while (i >= 0) {
      if (this.values[i] <= x) {
        index = i;
        break;
      }
      i--;
    }
    
    return (index + 1) / n;
  }

 /**
  * Returns distribution mean.
  * @method mean
  * @return {Number}
  */  
  mean () {
    return this.values.reduce( (acc, cur) => acc + cur ) / this.values.length;
  }

 /**
  * Returns distribution median.
  * @method median 
  * @return {Number}
  */  
  median () {
    const n = this.values.length;
    if (n % 2 === 0) {
      return (this.values[n/2 - 1] + this.values[n/2]) / 2;
    }
    return this.values[(n - 1) / 2];
  }

 /**
  * Probability density function.
  * @method pdf 
  * @param x {Number}
  * @return {Number}
  */  
  pdf (x) {
    return this.values.reduce( (acc, cur) => acc + (cur === x ? 1 : 0), 0 ) / this.values.length;
  }

 /**
  * Samples random value from distribution.
  * @method sampleValue 
  * @param generator {RandomEngine} With random() method.
  * @return {Number}
  */  
  sampleValue (generator) {
    const u = new Uniform(0, this.values.length);
    const i = Math.floor(u.sample(1, generator));
    return this.values[i];
  }

 /**
  * Returns variance.
  * @method variance
  * @return {Number}
  */  
  variance () {
    const mean = this.mean();
    return this.values.reduce( (acc, cur ) => acc + Math.pow(cur - mean, 2) ) / (this.values.length - 1);
  }
}