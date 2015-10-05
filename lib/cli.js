var path = require('path');
var helpers = require('./helpers');
var colors = require('colors');
var run = require('./run');

var check = '✓';
var x = '✖';

module.exports = {
  init: function (argv) {
    if (argv.help) {
      console.log(this.help());
    } else if (this.empty(argv)) {
      this.run({
        config: './boat.config.js'
      });
    } else {
      this.run({
        config: argv._[0]
      });
    }
  },
  run: function (options) {
    var configFile = path.join(process.cwd(), options.config);
    if (! helpers.exists(configFile)) {
      console.log(x.red + ' failed:'.red + ' could not find config file.');
      return false;
    }

    var config = require(configFile);
    if (typeof config['cwd'] === 'undefined') {
      config['cwd'] = path.dirname(configFile);
    }
    return run(config.files, config);
  },
  help: function () {
    return  "  Usage: boat <path>" +
            "\n\n" +
            "  A simple javascript testing framework" +
            "\n\n" +
            "  Arguments:" +
            "\n\n" +
            "    <path>          (optional) The path to the config file" +
            "\n";
    ;
  },
  empty: function (argv) {
    var empty = true;
    if (argv.length > 1) {
      empty = false;
    } else if (argv._.length > 0) {
      empty = false;
    }
    return empty;
  }
};
