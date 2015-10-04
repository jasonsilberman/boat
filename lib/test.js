var _that = require('./that');
var log = require('./log');

module.exports = function (testName, callback) {
  var that = _that(testName, log.emitter);

  callback(that);
};
