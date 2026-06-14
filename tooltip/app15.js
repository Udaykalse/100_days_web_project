function cFun(a) {
  return function (b) {
    return a + b;
  };
}
// let add =cFun(4);
console.log(cFun(9)(4))
