Javascript Distributions and Sampling
=====================================

Installation
-------------------------------------
    npm install essy-distribution

Description
-------------------------------------
Defines multiple distributions with methods for random sampling and calculating
distribution properties. Sampling functions are largely ported from CERN's
[cern.jet.random](https://dst.lbl.gov/ACSSoftware/colt/api/cern/jet/random/package-summary.html) Java package.
See the source code for details.

This package was created during the development of [Essy Tree](https://essytree.com) to
support Monte Carlo simulations.

Basic Usage
-------------------------------------

    var dists  = require('essy-distribution');
    var normal = new dists.Normal(0, 1);

    var mean = normal.mean();     // 0
    var sample = normal.sample(); // eg, 0.2314311234

Each distribution defines the following methods:

#### cdf(x {Number})
Cumulative distribution function.

#### mean()
Returns distribution mean.

#### median()
Returns distribution median.

#### pdf(x {Number})
Probability density function.

#### sample([n {Number}] [,generator {Object}])
Samples the distribution. If no arguments are provided or `n = 1` a single
sampled value is returned. If `n` is greater than 1, an array of `n` sampled
values is returned.

The method accepts an optional `generator` object that defines a method `random()`.
If no generator is provided a [mersenne-twister](https://www.npmjs.com/package/mersenne-twister) is used.

#### variance()
Returns variance.

Distributions
-------------------------------------

#### Beta(alpha, beta)
See [documentation](https://essytree.com/docs#dist-beta).

#### Binomial(samples, probability)
See [documentation](https://essytree.com/docs#dist-binomial).

#### Cauchy(location, scale)
See [article](https://en.wikipedia.org/wiki/Cauchy_distribution).

#### ChiSquared(degreesOfFreedom)
See [article](https://en.wikipedia.org/wiki/Chi-squared_distribution).

#### Custom(values)
A custom distribution. The `values` argument should be an array of numbers.

#### Erlang(shape, rate)
See [documentation](https://essytree.com/docs#dist-erlang). Does not define `median()`.

#### Exponential(lambda)
See [documentation](https://essytree.com/docs#dist-exponential).

#### F(degreesOfFreedom1, degreesOfFreedom2)
See [article](https://en.wikipedia.org/wiki/F-distribution).

#### Gamma(shape, scale)
See [documentation](https://essytree.com/docs#dist-gamma). Does not define `median()`.

#### Hypergeometric(N, K, n)
See [article](https://en.wikipedia.org/wiki/Hypergeometric_distribution).

#### Laplace(location, scale)
See [documentation](https://essytree.com/docs#dist-laplace).

#### Logarithmic(probability)
See [documentation](https://essytree.com/docs#dist-logarithmic). Does not define `median()`.

#### Logistic(mean, scale)
See [documentation](https://essytree.com/docs#dist-logistic).

#### LogLogistic(scale, shape)
See [documentation](https://essytree.com/docs#dist-loglogistic).

#### LogNormal(mean, se)
See [documentation](https://essytree.com/docs#dist-lognormal).

#### Normal(mean, se)
See [documentation](https://essytree.com/docs#dist-normal).

#### Pareto(scale, shape)
See [article](https://en.wikipedia.org/wiki/Pareto_distribution).

#### Poisson(lambda)
See [documentation](https://essytree.com/docs#dist-poisson).

#### Rayleigh(scale)
See [documentation](https://essytree.com/docs#dist-rayleigh).

#### StudentT(degreesOfFreedom)
See [article](https://en.wikipedia.org/wiki/Student%27s_t-distribution).

#### Triangular(min, mode, max)
See [documentation](https://essytree.com/docs#dist-triangular).

#### Uniform(min, max)
See [documentation](https://essytree.com/docs#dist-uniform).

#### Weibull(shape, scale)
See [documentation](https://essytree.com/docs#dist-weibull).
