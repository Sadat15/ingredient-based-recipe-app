const express = require("express");
const router = express.Router();
const ingredientController = require("../controllers/ingredientController");

/* GET ingredient data */
router.get("/loadAllIngredients", ingredientController.loadAllIngredients);
router.get("/updatePopular", ingredientController.updatePopular);
router.get("/returnAllIngredients", ingredientController.returnAllIngredients);
router.get("/:strIngredient", ingredientController.FindByName);

module.exports = router;
