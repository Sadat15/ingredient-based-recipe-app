const express = require("express");
const router = express.Router();
const cocktailsController = require("../controllers/cocktailsController");

/* GET cocktail listing. */
router.get("/getall/:searchQuery", cocktailsController.findAllByIngredients);
router.get("/:id", cocktailsController.FindOne);

module.exports = router;