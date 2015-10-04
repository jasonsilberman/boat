var test = require('../../../').test;
var Calc = require('../src/calc');

test('calc', function (that) {
  that('3 * 4 should = 12', function (assert) {
    assert(Calc.times(3, 4)).equals(12);
  });

  that('3*3 should = 9', function (assert) {
    assert(Calc.square(3)).equals(9);
  });

  that('sqrt 9 should = 3', function (assert) {
    assert(Calc.root(9)).equals(3);
  });
});
