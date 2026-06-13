const person = { name: "Aman" };
function intro(age, city) {
  console.log(`${this.name} is ${age} from ${city}`);
}

intro.apply(person, [25, "Latur"]);

const nums = [5, 6, 2, 9];
const max = Math.max.apply(null, nums);
console.log(max);
