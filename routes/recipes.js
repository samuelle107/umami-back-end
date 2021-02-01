const express = require('express');
const Recipe = require('../models/recipe');
const CuisineTag = require('../models/cuisine-tag');
const DietaryPreferenceTag = require('../models/dietary-preference-tag');
const MealTag = require('../models/meal-tags');

const router = express.Router();

router.get('/', async (req, res) => {
  let tags = {};
  const { cuisine, dietaryPreferences, meal } = req.query;

  try {
    tags = {
      cuisine,
      dietaryPreferences: [dietaryPreferences].flat().filter((item) => item),
      meal,
    };

    Object.keys(tags).forEach(
      (key) => tags[key] === undefined && delete tags[key],
    );
  } catch (error) {
    console.log(error);
  }

  try {
    const filter = {
      'tags.cuisine': tags.cuisine,
      'tags.meal': tags.meal,
      'tags.dietaryPreferences': tags.dietaryPreferences.length > 0 ? { $in: tags.dietaryPreferences } : undefined,
    };
    Object.keys(filter).forEach(
      (key) => filter[key] === undefined && delete filter[key],
    );
    const recipes = await Recipe
      .find(filter)
      .sort({ date: -1 });
    res.send(recipes);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get('/:recipeId', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);

    res.send(recipe);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();

    const { cuisine, dietaryPreferences, meal } = req.body.tags;

    const addTagToDatabase = async (tag, Model) => {
      const doesTagExist = await Model.exists({ tag });

      if (!doesTagExist) {
        await Model.create({ tag });
      }

      return -1;
    };

    await addTagToDatabase(cuisine, CuisineTag);
    await addTagToDatabase(meal, MealTag);
    await Promise.allSettled(
      dietaryPreferences.map((dietaryPreference) => addTagToDatabase(
        dietaryPreference,
        DietaryPreferenceTag,
      )),
    );

    res.send({ id: recipe.id });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
