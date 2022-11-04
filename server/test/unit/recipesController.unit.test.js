const recipesController = require("../../controllers/recipeController");
const axios = require("axios");
jest.mock("axios");

const mockData = {
  drinks: [
    {
      strDrink: "Margarita",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
      strInstructions:
        "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten..",
      strIngredient1: "Tequila",
      strIngredient2: "Triple sec",
      strIngredient3: "Lime juice",
      strIngredient4: "Salt",
      strMeasure1: "1 1/2 oz ",
      strMeasure2: "1/2 oz ",
      strMeasure3: "1 oz ",
      strMeasure4: null,
    },
  ],
};

describe("recipesController", () => {
  describe("getRecipes", () => {
    it("should call res.json", async () => {
      // mock fetch
      axios.mockResolvedValue({ data: mockData });
      //mock res
      const res = { json: jest.fn() };
      await recipesController.All({ params: { drinks: "gin,vodka,rum" } }, res);
      expect(axios).toHaveBeenCalledTimes(3);
      expect(res.json).toHaveBeenCalled();
    });
  });
});
