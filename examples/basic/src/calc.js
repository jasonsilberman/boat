module.exports = {
  times: function () {
    var total = 1;
    for (var i=0;i<arguments.length;i++) {
      total = total * arguments[i];
    }
    return total;
  },
  square: function (num) {
    return num * num;
  },
  root: function (num) {
    return Math.sqrt(num);
  }
}
