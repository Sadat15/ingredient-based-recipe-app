const Ingredient = require("./models/ingredient");

const fetch = require("node-fetch");
require("dotenv").config();

const IngredientsController = {
  // All: async (req, res) => {
  //   // access drinks parameter
  //   const { drinks } = req.params;
  //   const url = `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API}/filter.php?i=${drinks}`;
  //   const response3 = await fetch(url2);
  //   const data4 = await response3.json();
  //   console.log(data);
  //   res.json(data);
  // },

  FindByid: async (req, res) => {
    const { id } = 1
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=1`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const ingredient = new Ingredient(data)
    ingredient.save(() => {})
  }
};

module.exports = RecipesController;

// module.exports = { getRecipes };
