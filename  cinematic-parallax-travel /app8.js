let arr = [1, 2, 3, 4, 5];
let evenNums = [];
let oddNums = [];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) {
    evenNums.push(arr[i]);
  } else {
    oddNums.push(arr[i]);
  }
}

console.log(
  `Array :- ${arr} | Odd Number :- ${oddNums} | Even Numbers :- ${evenNums}`,
);
