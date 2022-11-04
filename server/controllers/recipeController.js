const fetch = require("node-fetch");
require("dotenv").config();
const axios = require("axios");

const RecipesController = {
  All: async (req, res) => {
    // access drinks parameter
    const { drinks } = req.params;
    // const url = `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API}/filter.php?i=${drinks}`;
    const drinkArray = drinks.split(",");
    let drinksList;
    let response;
    for (i = 0; i < drinkArray.length; i++) {
      let url = `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API}/filter.php?i=${drinkArray[i]}`;
      response = await axios(url);
      if (i === 0) {
        drinksList = await response.data.drinks;
      } else {
        drinksList = drinksList.concat(response.data.drinks);
      }
    }
    // const finalDrinkList = await drinksList.flat().filter();
    const finalDrinkList = [
      ...drinksList
        .reduce((a, c) => {
          a.set(c.idDrink, c);
          return a;
        }, new Map())
        .values(),
    ];
    console.log(finalDrinkList.length);
    console.log(drinksList.length);
    res.json(finalDrinkList);
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
