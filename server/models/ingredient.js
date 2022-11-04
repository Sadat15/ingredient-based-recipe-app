const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
  idIngredient: Number,
  strIngredient: String,
  strDescription: String,
  strType: String,
  strAlcohol: String,
  strABV: Number,
  trolleyLink: String,
  price: Number,
  priceQuantity: String,
  priceUnit: Number,
  lastUpdated: Date
})

const Ingredient = mongoose.model("Ingredient", IngredientSchema)

module.exports = Ingredient;


