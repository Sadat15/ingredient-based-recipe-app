const Ingredient = require("./models/ingredient");

const fetch = require("node-fetch");
require("dotenv").config();

const IngredientsController = {
  New: async () => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552`;
    const response = await fetch(url);
    const data = await response.json();
    const ingredient = new Ingredient(data)
    ingredient.save(() => {})
  }
};

module.exports = RecipesController;

// module.exports = { getRecipes };
