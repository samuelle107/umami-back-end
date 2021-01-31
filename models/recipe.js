const mongoose = require('mongoose');

const { Schema } = mongoose;

const RecipeSchema = new Schema({
  author: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
  directions: [
    {
      direction: String,
      title: String,
    },
  ],
  email: { type: String, required: true },
  imageUrl: String,
  ingredients: [
    {
      ingredient: String,
      quantity: Number,
      unit: String,
    },
  ],
  servingSize: { type: Number, required: true },
  tags: {
    cuisine: String,
    dietaryPreferences: [String],
    meal: String,
  },
  title: { type: String, required: true },
  uid: { type: String, required: true },
});

module.exports = mongoose.model('Recipe', RecipeSchema);
