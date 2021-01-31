const mongoose = require('mongoose');

const { Schema } = mongoose;

const DietaryPreferenceSchema = new Schema(
  {
    tag: String,
  },
  { collection: 'dietary-preference-tags' },
);

module.exports = mongoose.model('DietaryPreferenceTag', DietaryPreferenceSchema);
