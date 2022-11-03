var mongoose = require("mongoose");
const Ingredient = require("./ingredient");
const fetch = require("node-fetch");
require("dotenv").config();

mongoose.connect("mongodb://0.0.0.0/recipe", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

async function createArrayOfIngredients () {
  for (let i = 1; i <= 616; i++) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${i}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.ingredients !== null) {
      const ingredient = new Ingredient(data.ingredients[0])

      ingredient.save(function(err, doc) {
        if (err) return console.error(err);
      });
    }
  }
}

createArrayOfIngredients()