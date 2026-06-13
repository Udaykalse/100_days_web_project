// Input: [1,2,3,2,4,1]
// Output: [1,2]

let inputVal = [1, 2, 3, 2, 4, 1];
let outputVal = [];
for (let i = 0; i < inputVal.length; i++) {
  if (outputVal.indexOf(inputVal[i]) === -1) {
    outputVal.push(inputVal[i]);
  }
}

console.log(outputVal);


