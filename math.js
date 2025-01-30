const math = (a, b, sign) => {
  if (sign === "+") {
    return a + b;
  } else if (sign === "*") {
    return a * b;
  } else if (sign === "-") {
    return a - b;
  } else if (sign === "/") {
    return a / b;
  } else {
    return "Invalid Operators";
  }
};

console.log(math(2, 3, "+"));
module.exports = math;

function name() {
  const today = new Date();
  return today.getFullYear();
}

console.log(name());
