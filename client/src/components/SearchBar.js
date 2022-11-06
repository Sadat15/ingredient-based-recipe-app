import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchItemButton from "./SearchItemButton";
import BackgroundImage from "../img/background-image.png";
import RecipeCardGroup from "./recipe-card-group";

function SearchBar() {
  // onClick gets all recipes
  const [searchWord, setSearch] = useState("");
  const [search, setSearchQuery] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadAllIngredients = async () => {
      const response = await axios.get(
        `http://localhost:9000/ingredient/returnAllIngredients`
      );
      setIngredients(response.data);
    };
    loadAllIngredients();
    console.log(ingredients);
  }, []);

  const getRecipes = async () => {
    if (search.length > 0) {
      const parameters = search.map((word) => word.replace(" ", "_"));
      const response = await axios.get(
        `http://localhost:9000/recipes/${parameters}`
      );
      setRecipes(response.data);
    } else if (searchWord.length > 0) {
      const parameter = searchWord.replace(" ", "_");
      const response = await axios.get(
        `http://localhost:9000/recipes/${parameter}`
      );
      setRecipes(response.data);
    }
  };

  // suggest ingredients based on popularity and what the user has already typed
  const suggestIngredients = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = ingredients.filter((ingredient) => {
        const regex = new RegExp("^" + text, "gi");
        return ingredient.strIngredient.match(regex);
      });
      // sort by popularity
      matches.sort((a, b) => {
        return b.ingredientPopularity - a.ingredientPopularity;
      });
    }
    setSearch(text);
    setSuggestions(matches.slice(0, 5));
  };

  const removeSearchItem = (item) => {
    const newSearch = search.filter((word) => word !== item);
    setSearchQuery(newSearch);
  };

  const addSearchWord = () => {
    // clear search bar with document query selector
    document.querySelector(".input-field").value = "";
    // add the search word to the search array if it's not there yet
    if (!search.includes(searchWord)) {
      const updatedSearch = search.push(searchWord);
      setSearch(updatedSearch);
    }
  };

  const addFromSuggestion = (item) => {
    // add the search word to the search array if it's not there yet
    if (!search.includes(item)) {
      const updatedSearch = search.push(item);
      setSearch(updatedSearch);
    }
  };

  return (
    <div className="search-elements">
      <div
        className="search-bar d-flex justify-content-center pb-2 text-center search-background"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="container">
          <br />
          <br />
          <br />
          <div className="row">
            <div className="col-1"></div>
            <div className="col-8">
              <input
                className="input-field form-control"
                type="text"
                placeholder="Search for a recipe"
                onChange={(e) => suggestIngredients(e.target.value)}
              />
              {suggestions.map((suggestion, i) => (
                <button
                  className="search-item-button add-button mx-2 btn btn-primary"
                  style={{ backgroundColor: "#25aec9", borderColor: "#25aec9" }}
                  onClick={() => {
                    addFromSuggestion(suggestion.strIngredient);
                  }}
                  key={`suggestion${i}`}
                >
                  {suggestion.strIngredient}
                </button>
              ))}
              <div className="text-center">
                {search?.map((item) => (
                  <div
                    className="p-2"
                    key={item}
                    onClick={() => removeSearchItem(item)}
                  >
                    <SearchItemButton item={item} />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-1">
              <button
                className="add-button mx-2 btn btn-primary"
                style={{ backgroundColor: "#20577b", borderColor: "#20577b" }}
                onClick={addSearchWord}
              >
                Add
              </button>
            </div>
            <div className="col-1">
              <button
                className="search-button btn btn-primary"
                style={{ backgroundColor: "#20577b", borderColor: "#20577b" }}
                onClick={getRecipes}
              >
                Search
              </button>
            </div>
            <div className="col-1"></div>
          </div>
          <br />
          <br />
          <br />
        </div>
      </div>
      <div className="search-items d-flex justify-content-center"></div>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            {recipes.drinks?.map((recipe) => (
              <div className="col-md-3" key={recipe.idDrink}>
                <RecipeCardGroup recipe={recipe} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
