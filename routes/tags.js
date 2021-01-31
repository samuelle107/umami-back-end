const express = require('express');
const CuisineTag = require('../models/cuisine-tag');
const DietaryPreferenceTag = require('../models/dietary-preference-tag');
const MealTag = require('../models/meal-tags');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cuisineTags = await CuisineTag.find({});
    const dietaryPreferenceTags = await DietaryPreferenceTag.find({});
    const mealTag = await MealTag.find({});

    res.send({
      cuisineTags,
      dietaryPreferenceTags,
      mealTag,
    });
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
