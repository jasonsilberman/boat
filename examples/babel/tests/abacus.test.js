const test = require('../../../').test;
import Abacus from '../src/abacus';

test('abacus', (that) => {
  that('1 + 2 should = 3', (assert) => {
    assert(Abacus.add(1, 2)).equals(3);
  });

  that('2 - 1 should = 1', (assert) => {
    assert(Abacus.sub(2, 1)).equals(1);
  });
});
