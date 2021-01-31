const mongoose = require('mongoose');

const { Schema } = mongoose;

const MealTagSchema = new Schema(
  {
    tag: String,
  },
  { collection: 'meal-tags' },
);

module.exports = mongoose.model('MealTag', MealTagSchema);
