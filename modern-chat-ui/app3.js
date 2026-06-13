const car = { brand: "Tesla" };
function showModel(yr) {
  console.log(`${this.brand} Model ${yr}`);
}

const boundFu = showModel.bind(car, 2026);
const obj = {
  name: "ReactJS",
  show: function () {
    setTimeout(
      function () {
        console.log(this.name);
      }.bind(this),
      100,
    );
  },
};
obj.show();
