let arr = [1, 2, 3, 4, 7];
let smallest = Infinity;
let secondSmallest = Infinity;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] < smallest) {
    secondSmallest = smallest;
    smallest = arr[i];
  } else if (arr[i] < secondSmallest && arr[i] !== smallest) {
    secondSmallest = arr[i];
  }
}

console.log(secondSmallest);
