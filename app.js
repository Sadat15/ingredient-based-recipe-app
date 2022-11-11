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

app.use("/api/", indexRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/users", usersRouter);
app.use("/api/recipe", recipeRouter);
app.use("/api/ingredient", ingredientRouter);
app.use("/api/cocktail", cocktailRouter);

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

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
 }

module.exports = app;
