const fetch = require("node-fetch");
require("dotenv").config();

const RecipesController = {
  All: async (req, res) => {
    // access drinks parameter
    const { drinks } = req.params;
    // const url = `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API}/filter.php?i=${drinks}`;
    const drinkArray = drinks.split(",");
    let data;
    let response;
    for (i = 0; i < drinkArray.length; i++) {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkArray[i]}`;
      response = await fetch(url);
      if (i === 0) {
        data = await response.json();
      }
      data.drinks = data.drinks.concat(response.json().drinks);
    }
    // data.drinks = [...new Set(data.drinks)];
    console.log(data.drinks);
    res.json(data);
  },

  FindByid: async (req, res) => {
    const { id } = req.params;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    res.json(data);
  },
};

module.exports = RecipesController;

// module.exports = { getRecipes };
