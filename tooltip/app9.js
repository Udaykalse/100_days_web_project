let outer = "I am outer";
function closureFunction() {
  let outer = "I am Inner";

  console.log("Inside closure Function :- ", outer);
}

// console.log("Outside closure Function :- ", outer);
closureFunction()
