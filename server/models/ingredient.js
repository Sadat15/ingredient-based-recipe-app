const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
  idIngredient: Number,
  strIngredient: String,
  strDescription: String,
  strType: String,
  strAlcohol: String,
  strABV: Number
})

const Ingredient = mongoose.model("Ingredient", IngredientSchema)

module.exports = Ingredient;