const fetch = require("node-fetch");
const axios = require("axios");
require("dotenv").config();
const Cocktail = require("../models/cocktail");
var mongoose = require("mongoose");


const CocktailsController = {
  FindOne: async (req, res) => {

    const cocktail = await Cocktail.findOne({idDrink: req.params.id})
    // const cocktail = await response.json();
    res.json(cocktail)
  },

  Find: async (req, res) => {

    const searchArray = req.params.searchQuery.split(',')
    console.log(searchArray)
    let searchResult = []
    for (let j = 0; j < searchArray.length; j++) {
      const searchWord = searchArray[j]
      const cocktails1 = await Cocktail.find({strIngredient1: 'gin'})
      const cocktails2 = await Cocktail.find({strIngredient2: 'gin'})
      const cocktails3 = await Cocktail.find({strIngredient3: 'gin'})
      const cocktails4 = await Cocktail.find({strIngredient4: 'gin'})
      const cocktails5 = await Cocktail.find({strIngredient5: 'gin'})
      const cocktails6 = await Cocktail.find({strIngredient6: 'gin'})
      const cocktails7 = await Cocktail.find({strIngredient7: 'gin'})
      const cocktails8 = await Cocktail.find({strIngredient8: 'gin'})
      const cocktails9 = await Cocktail.find({strIngredient9: 'gin'})
      const cocktails10 = await Cocktail.find({strIngredient10: 'gin'})
      const cocktails11 = await Cocktail.find({strIngredient11: 'gin'})
      const cocktails12 = await Cocktail.find({strIngredient12: 'gin'})
      const cocktails13 = await Cocktail.find({strIngredient13: 'gin'})
      const cocktails14 = await Cocktail.find({strIngredient14: 'gin'})
      const cocktails15 = await Cocktail.find({strIngredient15: 'gin'})


      searchResult = [].concat(
        cocktails1, 
        cocktails2, 
        cocktails3, 
        cocktails4, 
        cocktails5, 
        cocktails6, 
        cocktails7,
        cocktails8,
        cocktails9,
        cocktails10,
        cocktails11,
        cocktails12,
        cocktails13,
        cocktails14,
        cocktails15,
        searchResult)
        console.log(searchResult.length)
      // const cocktails = await Cocktail.find().or([
      //   {strIngredient1: 'gin'},
      //   {strIngredient2: 'gin'},
      //   {strIngredient3: 'gin'},
      //   {strIngredient4: 'gin'},
      //   {strIngredient5: 'gin'},
      //   {strIngredient6: 'gin'},
      //   {strIngredient7: 'gin'},
      //   {strIngredient8: 'gin'},
      //   {strIngredient9: 'gin'},
      //   {strIngredient10: 'gin'},
      //   {strIngredient11: 'gin'},
      //   {strIngredient12: 'gin'},
      //   {strIngredient13: 'gin'},
      //   {strIngredient14: 'gin'},
      //   {strIngredient15: 'gin'},
      //   {strIngredient16: 'gin'}
      // ])

    //     { $and: [
    //       { $or: [
    //       {strIngredient1: 'gin'},
    //       {strIngredient2: 'gin'},
    //       {strIngredient3: 'gin'},
    //       {strIngredient4: 'gin'},
    //       {strIngredient5: 'gin'},
    //       {strIngredient6: 'gin'},
    //       {strIngredient7: 'gin'},
    //       {strIngredient8: 'gin'},
    //       {strIngredient9: 'gin'},
    //       {strIngredient10: 'gin'},
    //       {strIngredient11: 'gin'},
    //       {strIngredient12: 'gin'},
    //       {strIngredient13: 'gin'},
    //       {strIngredient14: 'gin'},
    //       {strIngredient15: 'gin'},
    //       {strIngredient16: 'gin'}
    //     ]
    //   }
    // ]}
    // )
    
      // const cocktails = await Cocktail.find({strIngredient1: 'gin'})
      // searchResult = [].concat(cocktails, searchResult)
    }

    // search for cocktails with ingredients in one query
    // const cocktails = await Cocktail.find({$or: [
    //   {strIngredient1: "gin"},
    //   {strIngredient1: "rum"}
    // ]})


    // const cocktails = await Cocktail.find({strIngredient1: 'gin'})
    // const searchResultUnique = [
    //   ...searchResult
    //     .reduce((previousValue, currentValue) => {
    //       previousValue.set(currentValue.idDrink, currentValue);
    //       return previousValue;
    //     }, new Map())
    //     .values(),
    // ];

    // console.log(cocktails.length)

    res.json(searchResult)
  },
  findAllByIngredients: async (req, res) => {
    const searchIngredients = req.params.searchQuery.split(',')
    let searchResult = []
    for (let j = 0; j < searchIngredients.length; j++) {
      const searchIngredient = searchIngredients[j].charAt(0).toUpperCase() + searchIngredients[j].slice(1)
      const cocktails = await Cocktail.find({$or: [
        {strIngredient1: searchIngredient},
        {strIngredient2: searchIngredient},
        {strIngredient3: searchIngredient},
        {strIngredient4: searchIngredient},
        {strIngredient5: searchIngredient},
        {strIngredient6: searchIngredient},
        {strIngredient7: searchIngredient},
        {strIngredient8: searchIngredient},
        {strIngredient9: searchIngredient},
        {strIngredient10: searchIngredient},
        {strIngredient11: searchIngredient},
        {strIngredient12: searchIngredient},
        {strIngredient13: searchIngredient},
        {strIngredient14: searchIngredient},
        {strIngredient15: searchIngredient},
      ]})
      searchResult = [].concat(cocktails, searchResult)
    }
    console.log(searchResult.length)
    res.json(searchResult)
  },
  
};

module.exports = CocktailsController;

// module.exports = { getRecipes };
