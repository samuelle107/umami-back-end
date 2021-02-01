const express = require('express');
const CuisineTag = require('../models/cuisine-tag');
const DietaryPreferenceTag = require('../models/dietary-preference-tag');
const MealTag = require('../models/meal-tags');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cuisineTags = await CuisineTag.find({}).sort({ tag: 1 });
    const dietaryPreferenceTags = await DietaryPreferenceTag.find({}).sort({ tag: 1 });
    const mealTags = await MealTag.find({}).sort({ tag: 1 });

    res.send({
      cuisineTags,
      dietaryPreferenceTags,
      mealTags,
    });
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
