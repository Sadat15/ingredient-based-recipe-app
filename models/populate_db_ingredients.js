var mongoose = require("mongoose");
const Ingredient = require("./ingredient");
const fetch = require("node-fetch");
const fetchPrice = require('./scraping')
require("dotenv").config();


mongoose.connect("mongodb://0.0.0.0/recipe-test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const findMedianPrice = (prices) => {
  const topFivePrices = prices.slice(0, 5).map(priceString => priceString.split(' '))
  const sortedTopFivePrices = topFivePrices.sort((a, b) => {
    if (b[2] < a[2]) return -1;
    if (b[2] > a[2]) return 1;
    return 0
  })
  
  const medianIndex = Math.floor(topFivePrices.length/2)
  return sortedTopFivePrices[medianIndex]
}

async function populateDatabase () {
  
  for (let i = 1; i <= 616 ; i++) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${i}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.ingredients !== null) {
      data.ingredients[0].strIngredient = data.ingredients[0].strIngredient.toLowerCase()
      const ingredientName = data.ingredients[0].strIngredient.toLowerCase().split(' ').join('+')
      
      data.ingredients[0].trolleyLink = `https://www.trolley.co.uk/search/?from=search&q=${ingredientName}`

      let priceList = []

      if (i !== 332 || i !== 534) {
        priceList = await fetchPrice(ingredientName)
      } 

      if (priceList.length === 0) {
        data.ingredients[0].priceItem = null
        data.ingredients[0].priceQuantity = null
        data.ingredients[0].priceUnit = null
 
      } else {
        const medianPrice = findMedianPrice(priceList)
        data.ingredients[0].priceItem = Number(medianPrice[1].substring(1)).toFixed(2)
        
        if (medianPrice.length < 5) {
          data.ingredients[0].priceUnit = null;
          data.ingredients[0].priceQuantity = "each"
        } else {
          data.ingredients[0].priceUnit = Number(medianPrice[2].substring(1)).toFixed(2);
          data.ingredients[0].priceQuantity = Number(medianPrice[3]).toFixed(2);
        }
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