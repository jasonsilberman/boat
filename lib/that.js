var assert = require('./assert');

module.exports = function (testName, eventEmitter) {
  return function (caseName, callback) {
    var timeStart = Date.now();
    try {
      callback(assert);

      eventEmitter.emit('pass', {
        elapsedTime: (Date.now() - timeStart),
        error: null,
        name: [testName, caseName]
      });
    } catch (e) {
      eventEmitter.emit('fail', {
        elapsedTime: (Date.now() - timeStart),
        error: e,
        name: [testName, caseName]
      });
    }
  };
};
