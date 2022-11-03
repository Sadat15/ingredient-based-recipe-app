const Ingredient = require("./models/ingredient");
const fetch = require("node-fetch");
require("dotenv").config();

const ingredientsArray = []
for (let i = 0; i <= 1; i++) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=1`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.ingredients[0])
  
  if (data !== null) {
    ingredientsArray.push(data.ingredients[0])
  }
  console.log(ingredientsArray)
}