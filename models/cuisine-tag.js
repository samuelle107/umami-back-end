const mongoose = require('mongoose');

const { Schema } = mongoose;

const CuisineTagSchema = new Schema(
  {
    tag: String,
  },
  { collection: 'cuisine-tags' },
);

module.exports = mongoose.model('CuisineTag', CuisineTagSchema);
