import React from "react";
import { useState } from "react";
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

  const getRecipes = async () => {
    if (search.length > 0) {
      const parameters = search.map((word) => word.replace(" ", "_"));
      const response = await axios.get(
        `http://localhost:9000/recipes/${parameters}`
      );
      setRecipes(response.data);
      console.log(response);
    } else if (searchWord.length > 0) {
      const parameter = searchWord.replace(" ", "_");
      const response = await axios.get(
        `http://localhost:9000/recipes/${parameter}`
      );
      setRecipes(response.data);
      console.log(response.data.length);
    }
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
                onChange={(e) => setSearch(e.target.value)}
              />

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
            {recipes?.map((recipe) => (
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
