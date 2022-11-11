var mongoose = require("mongoose");
const Cocktail = require("../../models/cocktail")
require("../mongodb_helper");
// const fetch = require("jest-fetch-mock");

describe("Cocktail model",  () => {
  beforeEach(async () => {
    await mongoose.connection.collections.cocktails.deleteMany({});
  });

  // async is easier for deleting mutliple collections
  // afterEach(async () => {
  //   await mongoose.connection.collections.cocktails.deleteMany({});
  // });


  it("can list all cocktails", (done) => {
    Cocktail.find((err, cocktails) => {
      expect(err).toBeNull();
      expect(cocktails).toEqual([]);
      done();
    });
  });

  it("finds all cocktails in the database", (done) => {

  const cocktail1 = new Cocktail({ idDrink: 1, strDrink: "Test cocktail" });

  cocktail1.save((err) => {
    expect(err).toBeNull();

    Cocktail.find((err, cocktails) => {
      expect(err).toBeNull();
      expect(cocktails[0]).toMatchObject({ strDrink: "Test cocktail" });
      done();
      });
    });
  });

  it("finds a cocktail by db id", async () => {

    const cocktail1 = new Cocktail({ idDrink: 1, strDrink: "Test cocktail" });
    await cocktail1.save()

    const cocktail2 = new Cocktail({ idDrink: 2, strDrink: "Test cocktail2" });
    await cocktail2.save()
    
    const cocktail = await Cocktail.findById(cocktail1._id)

    // expect(cocktail.length).toEqual(1)
    expect(cocktail.strDrink).toEqual("Test cocktail")
  });

  it("finds a cocktail by its cocktail id", async () => {

    const cocktail1 = new Cocktail({ idDrink: 1, strDrink: "Test cocktail" });
    await cocktail1.save()

    const cocktail2 = new Cocktail({ idDrink: 2, strDrink: "Test cocktail2" });
    await cocktail2.save()
    // 
    const cocktail = await Cocktail.findOne({ idDrink: 1 })

    // expect(cocktail.length).toEqual(1)
    expect(cocktail.strDrink).toEqual("Test cocktail")
  });

});