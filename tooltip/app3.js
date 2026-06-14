function reverseStr(str) {
  let reverseString = str.split("").reverse().join("");
  return reverseString
}

console.log(reverseStr('react'))