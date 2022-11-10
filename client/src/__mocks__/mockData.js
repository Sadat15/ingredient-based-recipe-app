// mock api data

const mockDrinksApi = [
  {
    idDrink: "11007",
    strDrink: "Margarita",
    drinkThumb:
      "https://www.thecocktaildb.com/images/media/drink/3pylqc1504816928.jpg",
    missingIngredients: 3,
  },
  {
    idDrink: "11008",
    strDrink: "Vodka Martini",
    drinkThumb:
      "https://www.thecocktaildb.com/images/media/drink/3pylqc1504816928.jpg",
    missingIngredients: 3,
  },
];

const mockMargarita = {
  drinks: [
    {
      idDrink: "11007",
      strDrink: "Margarita",
      strDrinkAlternate: null,
      strTags: "IBA,ContemporaryClassic",
      strVideo: null,
      strCategory: "Ordinary Drink",
      strIBA: "Contemporary Classics",
      strAlcoholic: "Alcoholic",
      strGlass: "Cocktail glass",
      strInstructions:
        "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
      strInstructionsES: null,
      strInstructionsDE:
        "Reiben Sie den Rand des Glases mit der Limettenscheibe, damit das Salz daran haftet. Achten Sie darauf, dass nur der \u00e4u\u00dfere Rand angefeuchtet wird und streuen Sie das Salz darauf. Das Salz sollte sich auf den Lippen des Genie\u00dfers befinden und niemals in den Cocktail einmischen. Die anderen Zutaten mit Eis sch\u00fctteln und vorsichtig in das Glas geben.",
      strInstructionsFR: null,
      strInstructionsIT:
        "Strofina il bordo del bicchiere con la fetta di lime per far aderire il sale.\r\nAvere cura di inumidire solo il bordo esterno e cospargere di sale.\r\nIl sale dovrebbe presentarsi alle labbra del bevitore e non mescolarsi mai al cocktail.\r\nShakerare gli altri ingredienti con ghiaccio, quindi versarli delicatamente nel bicchiere.",
      "strInstructionsZH-HANS": null,
      "strInstructionsZH-HANT": null,
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
      strIngredient1: "Tequila",
      strIngredient2: "Triple sec",
      strIngredient3: "Lime juice",
      strIngredient4: "Salt",
      strIngredient5: null,
      strIngredient6: null,
      strIngredient7: null,
      strIngredient8: null,
      strIngredient9: null,
      strIngredient10: null,
      strIngredient11: null,
      strIngredient12: null,
      strIngredient13: null,
      strIngredient14: null,
      strIngredient15: null,
      strMeasure1: "1 1/2 oz ",
      strMeasure2: "1/2 oz ",
      strMeasure3: "1 oz ",
      strMeasure4: null,
      strMeasure5: null,
      strMeasure6: null,
      strMeasure7: null,
      strMeasure8: null,
      strMeasure9: null,
      strMeasure10: null,
      strMeasure11: null,
      strMeasure12: null,
      strMeasure13: null,
      strMeasure14: null,
      strMeasure15: null,
      strImageSource:
        "https://commons.wikimedia.org/wiki/File:Klassiche_Margarita.jpg",
      strImageAttribution: "Cocktailmarler",
      strCreativeCommonsConfirmed: "Yes",
      dateModified: "2015-08-18 14:42:59",
    },
  ],
};

const mockManhattan = {
  drinks: [
    {
      idDrink: "11008",
      strDrink: "Manhattan",
      strDrinkAlternate: null,
      strTags: "IBA,Classic,Alcoholic",
      strVideo: "https://www.youtube.com/watch?v=TFWPtkNoF4Y",
      strCategory: "Cocktail",
      strIBA: "Unforgettables",
      strAlcoholic: "Alcoholic",
      strGlass: "Cocktail glass",
      strInstructions:
        "Stirred over ice, strained into a chilled glass, garnished, and served up.",
      strInstructionsES: null,
      strInstructionsDE:
        "\u00dcber Eis ger\u00fchrt, in ein gek\u00fchltes Glas geseiht, garniert und serviert.",
      strInstructionsFR: null,
      strInstructionsIT:
        "Mescolate su ghiaccio, filtrate in un bicchiere freddo, guarnite e servite.",
      "strInstructionsZH-HANS": null,
      "strInstructionsZH-HANT": null,
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/yk70e31606771240.jpg",
      strIngredient1: "Sweet Vermouth",
      strIngredient2: "Bourbon",
      strIngredient3: "Angostura bitters",
      strIngredient4: "Ice",
      strIngredient5: "Maraschino cherry",
      strIngredient6: "Orange peel",
      strIngredient7: null,
      strIngredient8: null,
      strIngredient9: null,
      strIngredient10: null,
      strIngredient11: null,
      strIngredient12: null,
      strIngredient13: null,
      strIngredient14: null,
      strIngredient15: null,
      strMeasure1: "3/4 oz ",
      strMeasure2: "2 1/2 oz Blended ",
      strMeasure3: "dash ",
      strMeasure4: "2 or 3 ",
      strMeasure5: "1 ",
      strMeasure6: "1 twist of ",
      strMeasure7: null,
      strMeasure8: null,
      strMeasure9: null,
      strMeasure10: null,
      strMeasure11: null,
      strMeasure12: null,
      strMeasure13: null,
      strMeasure14: null,
      strMeasure15: null,
      strImageSource:
        "https://commons.wikimedia.org/wiki/File:Oak_Fired_Manhattan_-_Stierch_1.jpg",
      strImageAttribution: "Sarah Stierch (CC BY 4.0)",
      strCreativeCommonsConfirmed: "Yes",
      dateModified: "2017-09-02 12:07:09",
    },
  ],
};
// drinkPriceResponse.data.priceItem, drinkPriceResponse.data.trolleyLink, drinkPriceResponse.data.strDescription]
const mockIngredients = {
  priceItem: 1,
  trolleyLink: "www.testlink.com",
  strDescription: "test description",
};

const mockSearchObj = {
  search: ["Tequila", "Bourbon"],
};

const mockSearchArray = ["Tequila", "Bourbon"];

const mockIngredientSuggestions = [
  { strIngredient: "Vodka", ingredientPopularity: 1 },
  { strIngredient: "Vodka rose", ingredientPopularity: 0 },
  { strIngredient: "Tequila", ingredientPopularity: 2 },
];

module.exports = {
  mockDrinksApi,
  mockMargarita,
  mockManhattan,
  mockSearchObj,
  mockSearchArray,
  mockIngredients,
  mockIngredientSuggestions,
};
