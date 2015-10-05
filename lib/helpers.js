var fs = require('fs');

module.exports = {
  merge: function (obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
  },
  exists: function (path) {
    try {
      var stats = fs.lstatSync(path);
      return stats.isFile() || stats.isDirectory();
    } catch (e) {
      return false;
    }
  }
};
