var mongoose = require("mongoose");
const Ingredient = require("./ingredient");
const fetch = require("node-fetch");
require("dotenv").config();
const fetchPrice = require('./scraping')

mongoose.connect("mongodb://0.0.0.0/recipe-test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

async function populateDatabase () {
  for (let i = 23; i <= 23; i++) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${i}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.ingredients !== null) {
      const ingredientName = data.ingredients[0].strIngredient.toLowerCase().split(' ').join('+')
      data.ingredients[0].trolleyLink = `https://www.trolley.co.uk/search/?from=search&q=${ingredientName}`

      const priceList = await fetchPrice(ingredientName)
      
      if (priceList == []) {
        data.ingredients[0].price = null
        data.ingredients[0].priceQuantity = null
        data.ingredients[0].priceUnit = null

      } else {
        const priceUnit = Number(priceList[0].split(' ')[1].substring(1)).toFixed(2)
        const priceValue = Number(priceList[0].split(' ')[2].substring(1)).toFixed(2)
        const priceQuantity = priceList[0].split(' ')[4]
    
        data.ingredients[0].price = priceValue
        data.ingredients[0].priceQuantity = priceQuantity
        data.ingredients[0].priceUnit = priceUnit
      }

      data.ingredients[0].lastUpdated = new Date

      const ingredient = new Ingredient(data.ingredients[0])

      ingredient.save(function(err, doc) {
        if (err) return console.error(err);
      });
    }
  }
}

populateDatabase()


// read bla bla bla Ingredient
// if (Date.now - ingredient.date > 7 days) {
//   run script (go to the link amazonFreshLink - get price)
//   if (result is undefined) {
//  run it again
//   }
//   update ingredient with new price and current date 
// }