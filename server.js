// server.js

require('dotenv').config(); // Load env vars
const mongoose = require('mongoose');
const Person = require('./models/person');

// ✅ Connect to MongoDB (no deprecated options)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Connection error:", err));

// =========================================
// All Required Functions Using async/await
// =========================================

// A. Create and Save a Person
const createAndSavePerson = async () => {
  try {
    const person = new Person({
      name: "Alice",
      age: 25,
      favoriteFoods: ["pizza", "pasta"]
    });
    const data = await person.save();
    console.log("✅ Saved person:", data);
  } catch (err) {
    console.error("❌ Error saving person:", err);
  }
};

// B. Create Many People
const arrayOfPeople = [
  { name: "John", age: 30, favoriteFoods: ["sushi"] },
  { name: "Mary", age: 28, favoriteFoods: ["burrito"] },
  { name: "Tom", age: 35, favoriteFoods: ["steak"] }
];

const createManyPeople = async (people) => {
  try {
    const data = await Person.create(people);
    console.log("✅ People created:", data);
  } catch (err) {
    console.error("❌ Error creating people:", err);
  }
};

// C. Find People by Name
const findPeopleByName = async (personName) => {
  try {
    const data = await Person.find({ name: personName });
    console.log(`🔍 Found people named ${personName}:`, data);
  } catch (err) {
    console.error("❌ Error finding people:", err);
  }
};

// D. Find One Person by Favorite Food
const findOneByFood = async (food) => {
  try {
    const data = await Person.findOne({ favoriteFoods: food });
    console.log(`🍕 Found person who likes ${food}:`, data);
  } catch (err) {
    console.error("❌ Error:", err);
  }
};

// E. Find Person by ID
const findPersonById = async (personId) => {
  try {
    const data = await Person.findById(personId);
    console.log("🆔 Found by ID:", data);
  } catch (err) {
    console.error("❌ Error:", err);
  }
};

// F. Find, Edit, Then Save
const findEditThenSave = async (personId) => {
  try {
    const person = await Person.findById(personId);
    person.favoriteFoods.push("hamburger");
    const updated = await person.save();
    console.log("🍔 Updated person:", updated);
  } catch (err) {
    console.error("❌ Error:", err);
  }
};

// G. Find and Update Age
const findAndUpdate = async (personName) => {
  try {
    const updated = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true }
    );
    console.log("🔧 Updated person:", updated);
  } catch (err) {
    console.error("❌ Error:", err);
  }
};

// H. Remove by ID
const removeById = async (personId) => {
  try {
    const removed = await Person.findByIdAndRemove(personId);
    console.log("🗑️ Removed person:", removed);
  } catch (err) {
    console.error("❌ Error:", err);
  }
};

// I. Remove All Named "Mary"
const removeManyPeople = async () => {
  try {
    const result = await Person.deleteMany({ name: "Mary" });
    console.log("❌ Removed Marys:", result);
  } catch (err) {
    console.error("❌ Error:", err);
  }
};

// J. Chain Search Query Helpers
const queryChain = async () => {
  try {
    const data = await Person.find({ favoriteFoods: "burrito" })
      .sort("name")
      .limit(2)
      .select("-age");
    console.log("🔗 Query result:", data);
  } catch (err) {
    console.error("❌ Error:", err);
  }
};


// Uncomment ONE function at a time to test


createAndSavePerson();
// createManyPeople(arrayOfPeople);
// findPeopleByName("John");
// findOneByFood("burrito");
// findPersonById("PASTE_PERSON_ID_HERE");
// findEditThenSave("PASTE_PERSON_ID_HERE");
// findAndUpdate("Alice");
// removeById("PASTE_PERSON_ID_HERE");
// removeManyPeople();
// queryChain();