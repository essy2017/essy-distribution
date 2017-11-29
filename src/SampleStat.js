
/*******************************************************************************
 *
 * Calculates sample statistics from data set.
 * @class SampleStat
 *
 ******************************************************************************/
export class SampleStat {

 /**
  * Constructor.
  * @method constructor
  * @param values {Number[]} Sample values.
  * @throws {RangeError} If no values.
  */
  constructor (values) {
    if (!values || values.length < 1) {
      throw new RangeError('values must include at least one element.');
    }
    this.values = values.sort( (a, b) => a - b );
    this.n = values.length;
  }

 /**
  * Returns kurtosis.
  * @method kurtosis
  * @return {Number}
  */
  kurtosis () {
    const mean = this.mean();
    const sd   = this.stdDev();
    const n    = this.n;
    const a    = (n * (n + 1)) / ((n - 1)*(n - 2)*(n - 3));
    const b    = this.values.reduce( (acc, cur) => acc + Math.pow((cur - mean)/sd, 4), 0);
    const c    = (3*Math.pow(n - 1, 2)) / ((n - 2)*(n - 3));
    return a * b - c;
  }

 /**
  * Returns maximum value.
  * @method max
  * @return {Number}
  */
  max () {
    return this.values[this.n - 1];
  }

 /**
  * Returns mean.
  * @method mean
  * @return {Number} Sample mean.
  */
  mean () {
    return this.values.reduce( (acc, cur) => acc + cur, 0) / this.n;
  }

 /**
  * Returns median.
  * @method median
  * @return {Number}
  */
  median () {
    return this.n % 2 === 0 ?
      (this.values[this.n/2 - 1] + this.values[this.n/2]) / 2 :
      this.values[(this.n - 1) / 2];
  }

 /**
  * Returns minimum sampled value.
  * @method min
  * @return {Number}
  */
  min () {
    return this.values[0];
  }

 /**
  * Calculates percentile.
  * @method percentile
  * @param x {Number}
  */
  percentile (x) {

    const index = this.values.indexOf(x);

    // Exact match.
    if (index > -1) {
      return index / (this.n - 1);
    }

    // Greater than all values.
    if (x > this.values[this.n - 1]) {
      return 1;
    }

    for (let i = this.n - 1; i >= 0; i--) {
      if (this.values[i] < x) {
        return i / (this.n - 1) +
          (x - this.values[i]) / (this.values[i + 1] - this.values[i]) / (this.n - 1);
      }
    }
    return 0;
  }

 /**
  * Calculates quantile.
  * @method quantile
  * @param p {Number} Percentile.
  * @return {Number}
  */
  quantile (p) {

    if (p < 0 || p > 1) {
      throw new RangeError('percentile must be in range [0, 1].');
    }
    if (this.n === 1) {
      return this.values[0];
    }

    const incr  = 1 / (this.n - 1),
          index = p / incr,
          lower = Math.floor(index);

    // Return exact match or interpolate.
    return lower === index ?
      this.values[index] :
      this.values[lower] + (index - lower) * (this.values[lower + 1] - this.values[lower]);
  }

 /**
  * Returns sample range (max - min).
  * @method range
  * @return {Number}
  */
  range () {
    return this.values[this.n - 1] - this.values[0];
  }

 /**
  * Returns skew.
  * @method skew
  * @return {Number}
  */
  skew () {
    const mean = this.mean();
    const sd   = this.stdDev();
    return (this.n / ((this.n - 1)*(this.n - 2))) * this.values.reduce( (acc, cur) => acc + Math.pow((cur - mean)/sd, 3), 0);
  }

 /**
  * Returns standard deviation.
  * @method stdDev
  * @return {Number}
  */
  stdDev () {
    return Math.sqrt(this.variance());
  }

 /**
  * Returns variance.
  * @method variance
  * @return {Number} Sample variance.
  */
  variance () {
    const mean = this.mean();
    return this.values.reduce( (acc, cur ) => acc + Math.pow(cur - mean, 2), 0 ) / (this.n - 1);
  }
}
