const fetch = require("node-fetch");

const RecipesController = {
  All: async (req, res) => {
    // access drinks parameter
    const { drinks } = req.params;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinks}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    res.json(data);
  },

  FindByid: async (req, res) => {
    const { id } = req.params;
    const url = `www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    res.json(data);
  }
};

module.exports = RecipesController;

// module.exports = { getRecipes };
