var path = require('path');
var helpers = require('./helpers');
var log = require('./log');
var glob = require('glob');

module.exports = function (files, options) {
  options = helpers.merge({
    before: null,
    after: null,
    reporter: './reporters/dot',
    cwd: process.cwd()
  }, options);

  log.begin(options);

  if (options.before) {
    require(path.join(options.cwd, options.before));
  }

  files.forEach(function (f) {
    var files = glob.sync(f, {
      cwd: options.cwd
    });
    files.forEach(function (file) {
      require(path.join(options.cwd, file));
    });
  });

  if (options.after) {
    require(path.join(options.cwd, options.after));
  }

  return log.finish();
};
