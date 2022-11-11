const recipesController = require("../../controllers/recipeController");
const fetch = require("jest-fetch-mock");

describe("recipesController", () => {
  describe("getRecipes", () => {
    it("should call res.json", async () => {
      // mock fetch
      fetch.mockResponseOnce(JSON.stringify({ data: "12345" }));
      //mock res
      const res = { json: jest.fn() };
      // call the controller
      await recipesController.All(null, res);
      // check that res.json was called
      expect(res.json).toHaveBeenCalled();
    });
  });
});
