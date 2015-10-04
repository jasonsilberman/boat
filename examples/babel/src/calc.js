class Calc {
  static times () {
    let total = 1;
    for (let i=0;i<arguments.length;i++) {
      total = total * arguments[i];
    }
    return total;
  }

  static square (num) {
    return num * num;
  }
  
  static root (num) {
    return Math.sqrt(num);
  }
}

export default Calc;
