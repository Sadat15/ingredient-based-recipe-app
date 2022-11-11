const fetch = require("node-fetch");
const axios = require("axios");
require("dotenv").config();

const RecipesController = {
  All: async (req, res) => {
    // access drinks parameter
    const { drinks } = req.params;
    const drinksArray = drinks.split(",");
    let drinksList;
    let response;
    // const responseDrinksList = new Set();
    for (i = 0; i < drinksArray.length; i++) {
      let url = `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API}/filter.php?i=${drinksArray[i]}`;
      response = await axios(url);
      if (i === 0) {
        drinksList = await response.data.drinks;
      } else {
        drinksList = drinksList.concat(response.data.drinks);
      }
    }
    const responseDrinksList = [
      ...drinksList
        .reduce((previousValue, currentValue) => {
          previousValue.set(currentValue.idDrink, currentValue);
          return previousValue;
        }, new Map())
        .values(),
    ];

    res.json(responseDrinksList);
  },

  FindByid: async (req, res) => {
    const { id } = req.params;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  },
};

module.exports = RecipesController;

// module.exports = { getRecipes };
