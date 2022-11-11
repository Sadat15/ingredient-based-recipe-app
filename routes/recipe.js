// requires
const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

/* GET recipes listing. */
router.get("/:id", recipeController.FindByid);

module.exports = router;