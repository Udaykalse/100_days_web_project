const obj = {
  name: "Uday",
  getName() {
    console.log(this.name);
  }
};

const fn = obj.getName;

fn();
obj.getName();