var MersenneTwister = require('mersenne-twister');

export function defaultGenerator (generator) {
  return generator || new MersenneTwister();
}
