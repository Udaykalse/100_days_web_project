// Input: "madam"
// Output: true

let string = "madam";
let reverseString = "";
for (let i = string.length - 1; i >= 0; i--) {
  reverseString += string[i];
}
console.log(reverseString);
console.log(string === reverseString);
