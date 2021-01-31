const express = require('express');
const CuisineTag = require('../models/cuisine-tag');
const DietaryPreferenceTag = require('../models/dietary-preference-tag');
const MealTag = require('../models/meal-tags');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cuisine = await CuisineTag.find({});
    const dietaryPreference = await DietaryPreferenceTag.find({});
    const meal = await MealTag.find({});

    res.send({
      cuisine,
      dietaryPreference,
      meal,
    });
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
