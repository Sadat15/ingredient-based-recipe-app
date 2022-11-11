// requires
const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

/* GET recipes listing. */
router.get("/:drinks", recipeController.All);

module.exports = router;
