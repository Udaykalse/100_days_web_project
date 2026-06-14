let arr = [1,2,3,2,4,1]
let uniqueArr = []
 function duplicateRemove(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!arr.includes(arr[i])) {
      uniqueArr.push([i]);
    }
  }
};
console.log(uniqueArr)