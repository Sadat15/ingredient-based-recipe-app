const Ingredient = require("../models/ingredient");
const mongoose = require("mongoose");
const axios = require("axios");

const IngredientController = {
  FindByName: async (req, res) => {
    const searchParams = req.params.strIngredient.toLowerCase();
    const ingredient = await Ingredient.findOne({
      strIngredient: searchParams,
    });
    res.json(ingredient);
  },
  loadAllIngredients: async (req, res) => {
    for (let i = 1; i < 616; i++) {
      if (i !== 332) {
        const url = `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API}/lookup.php?iid=${i}`;
        const response = await axios.get(url);
        if (response.data.ingredients !== null) {
          const ingredient = response.data.ingredients[0];
          const newIngredient = new Ingredient({
            idIngredient: ingredient.idIngredient,
            strIngredient: ingredient.strIngredient.toLowerCase(),
            strDescription: ingredient.strDescription,
            strType: ingredient.strType,
            strAlcohol: ingredient.strAlcohol,
            strABV: ingredient.strABV,
            trolleyLink: "ingredient.trolleyLink",
            price: 0,
            priceQuantity: "ingredient.priceQuantity",
            priceUnit: 0,
          });
          await newIngredient.save();
        }
      }
    }
  },
  updatePopular: async (req, res) => {
    const url = `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API}/popular.php`;
    const recipes = await axios.get(url);
    const recipeList = recipes.data.drinks;
    for (let i = 0; i < recipeList.length; i++) {
      // loop through each of the 15 ingredients in each recipe
      for (let j = 1; j < 16; j++) {
        const ingredient = recipeList[i][`strIngredient${j}`];
        if (ingredient !== null) {
          const ingredientData = await Ingredient.findOne({
            strIngredient: ingredient.toLowerCase(),
          });
          ingredientData.ingredientPopularity++;
          await ingredientData.save();
        }
      }
    }
  },
  returnAllIngredients: async (req, res) => {
    const filter = {};
    const ingredients = await Ingredient.find(filter);
    res.json(ingredients);
  },
};

module.exports = IngredientController;
