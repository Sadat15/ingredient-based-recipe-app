const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
  idIngredient: Number,
  ingredientPopularity: {
    type: Number,
    default: 0,
  },
  strIngredient: String,
  strDescription: String,
  strType: String,
  strAlcohol: String,
  strABV: Number,
  trolleyLink: String,
  price: Number,
  priceQuantity: String,
  priceUnit: Number,
  lastUpdated: { type: Date, default: Date.now },
});

const Ingredient = mongoose.model("Ingredient", IngredientSchema);

module.exports = Ingredient;
