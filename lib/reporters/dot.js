var colors = require('colors');

var check = '✓';
var x = '✖';

var parseStack = function (stack) {
  var lines = stack.split("\n");
  var message = lines.shift();
  lines.shift();
  return [message, lines];
};

module.exports = function (options) {
  var startTime = Date.now();

  return {
    ping: function (info) {
      var message;
      if (info.error !== null) {
        message = 'x'.red;
      } else {
        message = '.';
      }
      process.stdout.write(message);
    },
    // http://stackoverflow.com/a/12305221
    beginWatch: function () {
      var watchString = ' Watching';

      var spinner = "⣾⣽⣻⢿⡿⣟⣯⣷";

      var out = process.stdout;
      (function(spinner, out, ws) {
        var i = 0;
        setInterval(function() {
            out.clearLine();
            out.cursorTo(0);
            out.write((spinner[i] + ws).cyan);
            i = (i + 1) % spinner.length;
        }, 300);
      })(spinner, out, watchString);
    },

    endWatch: function () {
      process.stdout.write("\n");

      if (options.watchedRun) {
        process.stdout.write("\n");
      }
    },

    finish: function (stats) {
      var elapsedTime = Date.now() - startTime;

      process.stdout.write("\n");
      process.stdout.write("\n");

      if (stats.failed.length < 1) {
        console.log((check + ' ' + stats.tests.length + ' tests completed').green + ' (' + elapsedTime + 'ms)' + "\n");
      } else {
        console.log((x + ' ' + stats.failed.length + ' out of ' + stats.tests.length + ' tests failed:').red + ' (' + elapsedTime + 'ms)');
        stats.failed.forEach(function (info, idx) {
          var stack = parseStack(info.error.stack);
          console.log('  ' + (idx + 1) + ') [' + info.name[0]+ '] ' + info.name[1] + ': ' + stack[0].red);
          console.log(stack[1].join("\n"));
          process.stdout.write("\n");
        });
      }
    }
  }
};
