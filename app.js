var createError = require("http-errors");
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var recipesRouter = require("./routes/recipes");
var recipeRouter = require("./routes/recipe");
var ingredientRouter = require("./routes/ingredient");
var ingredientRouter = require("./routes/ingredient");
var cocktailRouter = require("./routes/cocktail");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/recipes", recipesRouter);
app.use("/users", usersRouter);
app.use("/recipe", recipeRouter);
app.use("/ingredient", ingredientRouter);
app.use("/cocktail", cocktailRouter);

const mongoDbUrl = process.env.MONGODB_URL || "mongodb://0.0.0.0/recipe";
const conn = mongoose.createConnection(mongoDbUrl);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
