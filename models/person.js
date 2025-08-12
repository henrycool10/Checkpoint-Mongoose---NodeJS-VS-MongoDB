// models/person.js

const mongoose = require('mongoose');

// Create a schema for Person
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

// Create and export the model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;