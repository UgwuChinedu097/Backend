console.log("i am a boy");

// You have an array of student scores:
// Use a for loop to find the highest score in the array.
// Use reduce to find the total sum of all scores and calculate the average.
const scores = [80, 95, 78, 88, 92, 67, 75, 89, 100, 55];
let highestScore = scores[0];

for (let i = 0; i < scores.length; i++) {
  if (scores[i] > highestScore) {
    highestScore = scores[i];
  }
}
console.log(highestScore);

const total = scores.reduce((a, b) => {
  return a + b;
}, 0);
console.log(total);

const average = scores.reduce((a, b) => {
  return a + b / 10;
}, 0);
console.log(average);

// Given an array of products:
// Use reduce to calculate the total cost of all products.
// Use map to create a new array that adds a "discountedPrice" field to each
// product, where the discount is 10% off the original price.

const products = [
  { name: "Laptop", price: 1500 },
  { name: "Phone", price: 700 },
  { name: "Tablet", price: 300 },
  { name: "Monitor", price: 400 },
];

const totalProduct = products.reduce((a, b) => {
  return a + b.price;
}, 0);
console.log(totalProduct);
const discountProduct = products.map((dis) => dis.price * 0.9);

console.log(discountProduct);

// ForEach & Map (String Manipulation)
// Given an array of people's full names:
// Use map to return an array where each name is properly capitalized (e.g., "John Doe").
// Use forEach to log each person's initials (e.g., "JD" for "John Doe").

const names = ["john doe", "jane smith", "alice wonderland", "bob builder"];

const capitalizedNames = names.map(name => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
});

console.log(capitalizedNames);

names.forEach(name => {
  const initials = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');
  console.log(initials);
});

// Given an array of employees:
// Use filter to get employees who earn more than 5000.
// Use filter to get employees younger than 30.
// Use sort to arrange employees by their salary in descending order.

const employees = [
  { name: "Michael", age: 45, salary: 5000 },
  { name: "Sarah", age: 30, salary: 7000 },
  { name: "David", age: 25, salary: 4500 },
  { name: "Emily", age: 28, salary: 5500 },
  { name: "John", age: 35, salary: 6000 },
];

const highestPaid = employees.filter((hp) => hp.salary > 5000);
console.log(highestPaid);

const youngest = employees.filter((y) => y.age < 30);
console.log(youngest);

const descending = employees.sort((a, b) => b.salary - a.salary);
console.log(descending);

// Combination Challenge (Real-Life Example)
//  You are given a list of transactions in a bank account:

// Use reduce to find the total balance (start from 0).
// Use filter to get all deposit transactions.
// Use map to create a new array that includes each transaction but adds a "status"
// field that shows "completed" for deposits and "pending" for withdrawals

const transactions = [
  { type: "deposit", amount: 1000 },
  { type: "withdrawal", amount: 500 },
  { type: "deposit", amount: 1200 },
  { type: "withdrawal", amount: 300 },
  { type: "deposit", amount: 400 },
  { type: "withdrawal", amount: 700 },
];

const start = 0;
const totalBalance = transactions.reduce((a, b) => {
  return a + b.amount;
}, start);
console.log(totalBalance);

const getDeposit = transactions.filter((get) => get.type === "deposit");
console.log(getDeposit);

const transactionsWithStatus = transactions.map((transaction) => {
  return {
    ...transaction,
    status: transaction.type === "deposit" ? "completed" : "pending",
  };
});

console.log(transactionsWithStatus);
