module.exports = function (thing) {
  var fail = function (message) {
    throw new Error(message);
  };

  return {
    equals: function (anotherThing) {
      if (thing !== anotherThing) {
        fail(thing + ' does not equal: ' + anotherThing);
      }
    },
    isA: function (anotherThing) {
      if (typeof thing !== anotherThing) {
        fail(thing + ' is not a: ' + anotherThing);
      }
    },
    true: function () {
      if (!thing) {
        fail(thing + ' is not true');
      }
    },
    false: function () {
      if (thing) {
        fail(thing + ' is not false');
      }
    }
  };
};
