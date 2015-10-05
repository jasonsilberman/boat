var events = require('events');
var path = require('path');
var fs = require('fs');
var helpers = require('./helpers');

module.exports = {
  passed: [],
  failed: [],
  tests: [],

  begin: function (options) {
    this.options = options;
    var reporterPath = this.options.reporter;
    if (reporterPath.indexOf('/') !== -1) {
      reporterPath = path.join(path.dirname(module.parent.filename), this.options.reporter);
      if (! helpers.exists(reporterPath + '.js')) {
        reporterPath = path.join(process.cwd(), this.options.reporter);
      }
    }
    this.reporter = require(reporterPath)(this.options);

    this.emitter = new events.EventEmitter();
    this.emitter.on('pass', this.pass);
    this.emitter.on('fail', this.fail);
  },

  pass: function (info) {
    module.exports.passed.push(info);
    module.exports.tests.push(info);
    module.exports.reporter.ping(info);
  },

  fail: function (info) {
    module.exports.failed.push(info);
    module.exports.tests.push(info);
    module.exports.reporter.ping(info);
  },

  finish: function () {
    this.reporter.finish({
      tests: this.tests,
      passed: this.passed,
      failed: this.failed
    });
    return !!this.failed.length;
  }
};
