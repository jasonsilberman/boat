const test = require('../../../').test;
import Calc from '../src/calc';

test('calc', (that) => {
  that('3 * 4 should = 12', (assert) => {
    assert(Calc.times(3, 4)).equals(12);
  });

  that('3*3 should = 9', (assert) => {
    assert(Calc.square(3)).equals(9);
  });

  that('sqrt 9 should = 3', (assert) => {
    assert(Calc.root(9)).equals(3);
  });
});
