const fetch = require("node-fetch");
require("dotenv").config();

const RecipesController = {
  All: async (req, res) => {
    // access drinks parameter
    const { drinks } = req.params;
    const url = `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API}/filter.php?i=${drinks}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  },

  FindByid: async (req, res) => {
    const { id } = req.params;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  }
};

module.exports = RecipesController;

// module.exports = { getRecipes };
