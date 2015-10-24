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

    if (typeof this.emitter === 'undefined') {
      this.emitter = new events.EventEmitter();
      this.emitter.on('pass', this.pass);
      this.emitter.on('fail', this.fail);
    }
  },

  beginWatch: function () {
    module.exports.reporter.beginWatch();
  },

  pass: function (info) {
    if (! module.exports.didSendEndWatch) {
        module.exports.reporter.endWatch();
        module.exports.didSendEndWatch = true;
    }
    module.exports.passed.push(info);
    module.exports.tests.push(info);
    module.exports.reporter.ping(info);
  },

  fail: function (info) {
    if (! module.exports.didSendEndWatch) {
        module.exports.reporter.endWatch();
        module.exports.didSendEndWatch = true;
    }
    module.exports.failed.push(info);
    module.exports.tests.push(info);
    module.exports.reporter.ping(info);
  },

  finish: function () {
    module.exports.reporter.finish({
      tests: module.exports.tests,
      passed: module.exports.passed,
      failed: module.exports.failed
    });

    module.exports.passed = [];
    module.exports.failed = [];
    module.exports.tests = [];

    module.exports.didSendEndWatch = false;

    return !!module.exports.failed.length;
  }
};
