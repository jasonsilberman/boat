var test = require('../../../').test;
var Abacus = require('../src/abacus');

test('abacus', function (that) {
  that('1 + 2 should = 3', function (assert) {
    assert(Abacus.add(1, 2)).equals(3);
  });

  that('2 - 1 should = 1', function (assert) {
    assert(Abacus.sub(2, 1)).equals(1);
  });
});
