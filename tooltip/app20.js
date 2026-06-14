let arr = [10,45,2,99,23];

let largest = arr[0];

for(let i=1;i<arr.length;i++){
 if(arr[i] > largest){
   largest = arr[i];
 }
}

console.log(largest);