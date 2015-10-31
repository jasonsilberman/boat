module.exports = {
  sum: function () {
    var total = 0;
    for (var i=0;i<arguments.length;i++) {
      total = total + arguments[i];
    }
    return total;
  },
  sub: function (a, b) {
    return this.sum(a, -b);
  },
  add: function (a, b) {
    return this.sum(a, b);
  },
};
