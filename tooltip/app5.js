function pali(s1, s2) {
  let s11 = s1.split("").reverse().join("");
  let s12 = s1.split("").reverse().join("");
  return s11 === s12;
}

console.log(pali("madam", "madam"));
