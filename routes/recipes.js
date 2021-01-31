const express = require('express');
const Recipe = require('../models/recipe');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find({});

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

    res.send({ id: recipe.id });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
