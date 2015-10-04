class Abacus {
  static sum () {
    var total = 0;
    for (var i=0;i<arguments.length;i++) {
      total = total + arguments[i];
    }
    return total;
  }

  static sub (a, b) {
    return this.sum(a, -b);
  }

  static add (a, b) {
    return this.sum(a, b);
  }
};

export default Abacus;
