require('dotenv').config();

let mongoose = require('mongoose');

const uriSecret = process.env['MONGO_URI']

mongoose.connect(uriSecret, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

let arrayOfPeople = [
  { name: "Joel", age: 31, favoriteFoods: ["burger"] },
  { name: "Rue", age: 32, favoriteFoods: ["salad"] },
  { name: "Nancy", age: 25, favoriteFoods: ["pizza"] }
];

const createAndSavePerson = (done) => {
  let ulrichMabou = new Person({
    name: "Ulrich Mabou",
    age: 30,
    favoriteFoods: ["okok", "eru", "taro", "poulet dg"]
  });

  ulrichMabou.save((err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, personFound) => {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, (err, person) => {
    if (err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return console.log(err)
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { new: true }, (err, person) => {
    if (err) return console.log(err);
    person.age = ageToSet;
    done(null, person);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({ _id: personId }, (err, person) => {
    if (err) return console.log(err)
    done(null, person)
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, res) => {
    if (err) return console.log(err)
    done(null, res)
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0})
    .exec((err, people) => {
      if (err) return console.log(err);
      done(null, people);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
