var mongoose = require("mongoose");

require("../mongodb_helper");
var Ingredient = require("../../models/ingredient");

describe("Ingredient model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.ingredients.drop(() => {
      done();
    });
  });

  it("has an ingredient", () => {
    var ingredient = new Ingredient({ strType: 'Vodka' });
    expect(ingredient.strType).toEqual('Vodka');
  });

  it("can list all ingredients", (done) => {
    Ingredient.find((err, ingredients) => {
      expect(err).toBeNull();
      expect(ingredients).toEqual([]);
      done();
    });
  });

  it("can save an ingredient", (done) => {
    var ingredient = new Ingredient({ strType: 'Vodka' });

    ingredient.save((err) => {
      expect(err).toBeNull();

      Ingredient.find((err, ingredients) => {
        expect(err).toBeNull();

        expect(ingredients[0]).toMatchObject({ strType: 'Vodka' });
        done();
      });
    });
  });
});
