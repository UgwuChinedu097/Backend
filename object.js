let person = {
  name: "victor",
  isStudent: true,
  favFoods: [ "rice", "spag", "indomie", ""],
  familyname: "Lora",
  score: 50
};

// Deconstruct in object method
const { names, isStudent, favFoods} = person;




let personName = person.name

// keys 
console.log(Object.keys(person))
// values
console.log(Object.values(person))

module.exports = person
