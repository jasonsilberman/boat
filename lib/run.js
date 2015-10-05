var path = require('path');
var helpers = require('./helpers');
var log = require('./log');
var glob = require('glob');

function requireHook(hook, extraPath) {
  if (! extraPath) {
    extraPath = '';
  }

  if (typeof hook === 'object') {
    var hookPath = hook.path;
    delete hook.path;
    
    require(path.join(extraPath, hookPath))(hook);
  } else {
    require(path.join(extraPath, hook));
  }
}

module.exports = function (files, options) {
  options = helpers.merge({
    before: null,
    after: null,
    reporter: './reporters/dot',
    cwd: process.cwd(),
    compiler: null,
    watch: false
  }, options);

  log.begin(options);

  if (options.compiler) {
    requireHook(options.compiler);
  }

  if (options.before) {
    requireHook(options.before, options.cwd);
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
    requireHook(options.after, options.cwd);
  }

  return log.finish();
};
