var path = require('path');
var helpers = require('./helpers');
var log = require('./log');
var glob = require('glob');
var watchr = require('watchr');
var decache = require('decache');

function requireHook(hook, extraPath) {
  if (! extraPath) {
    extraPath = '';
  }

  if (typeof hook === 'object') {
    var hookPath = hook.path;
    delete hook.path;

    require(path.join(extraPath, hookPath))(hook);
    hook.path = hookPath;
  } else {
    require(path.join(extraPath, hook));
  }
}

function runTests(paths, options) {
  log.begin(options);

  if (options.compiler) {
    requireHook(options.compiler);
  }

  if (options.before) {
    requireHook(options.before, options.cwd);
  }

  paths.forEach(function (file) {
    if (options.watch) {
      helpers.uncache(file);
    }
    require(file);
  });

  if (options.after) {
    requireHook(options.after, options.cwd);
  }

  return log.finish();
}

module.exports = function (files, options) {
  options = helpers.merge({
    before: null,
    after: null,
    reporter: './reporters/dot',
    cwd: process.cwd(),
    compiler: null,
    watch: false,
    watchFiles: []
  }, options);

  var testFiles = [];
  files.forEach(function (f) {
    var files = glob.sync(f, {
      cwd: options.cwd
    });
    files.forEach(function (file) {
      testFiles.push(path.join(options.cwd, file));
    });
  });

  var status = runTests(testFiles, options);

  if (options.watch === true) {
    var watchFiles = [];
    if (options.watchFiles.length > 0) {
      options.watchFiles.forEach(function (f) {

        if (/(\*)/.test(f)) {
          var files = glob.sync(f, {
            cwd: options.cwd
          });
          files.forEach(function (file) {
            watchFiles.push(path.join(options.cwd, file));
          });
        } else {
          watchFiles.push(path.join(options.cwd, f));
        }
      });
    } else {
      watchFiles = testFiles;
    }

    log.beginWatch();

    watchr.watch({
      paths: watchFiles,
      listeners: {
        error: function (err) {
          if (err) {
            throw err;
          }
        },
        change: function (changeType, filePath) {
          if (changeType !== 'delete') {
            var status = runTests(testFiles, helpers.merge({watchedRun: true}, options));
          }
        }
      },
      next: function (err, watchers) {
        if (err) {
          throw err;
        }
      }
    })
  }

  return status;
};
