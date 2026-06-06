let arr = [1, 2, 3, 4, 7];
let Largest = -Infinity;
let secondLargest = -Infinity;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] > Largest) {
    secondLargest = Largest;
    Largest = arr[i];
  } else if (arr[i] > secondLargest && arr[i] !== Largest) {
    secondLargest = arr[i];
  }
}

console.log(secondLargest);
