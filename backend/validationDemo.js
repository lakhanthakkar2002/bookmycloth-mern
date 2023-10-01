import Validator from "validatorjs";
let data = {
  name: "John",
  email: "johndoe@gmail.com",
  age: 28,
};

let rules = {
  name: "required",
  email: "required|email",
  age: "min:18",
};

let validation = new Validator(data, rules);

if (validation.passes()) {
  console.log("Validation Passes");
} // true
else {
  console.log("Validation Fails...");
}
//   validation.fails(); // false
