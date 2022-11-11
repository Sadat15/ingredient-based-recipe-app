var mongoose = require("mongoose");
const Cocktail = require("./cocktail");
const fetch = require("node-fetch");
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

async function populateDatabase () {
  //1-1500, 10000-10200, 10000-20500
  for (let i = 178000; i <= 1790000 ; i++) {
    const url = `https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${i}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(i)
    if (1 % 100 === 0) {
      console.log(i)
    }
    // console.log(data)
    // console.log(data.drinks)
    // console.log(data.drinks[0])
    if (data.drinks !== null) {
      const cocktail = new Cocktail(data.drinks[0])

      cocktail.save(function(err, doc) {
        if (err) return console.error(err);
      });
    }
    
  }
}

populateDatabase()