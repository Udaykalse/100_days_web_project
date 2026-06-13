const person = { name: "Sid" };
function greet(greeting, punctuation) {
  console.log(punctuation);
  console.log(`${greeting} , I'm ${this.name}${punctuation}`);
}

greet.call(person, "Hello", "!");
