function currying(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(currying(1)(2)(3));
