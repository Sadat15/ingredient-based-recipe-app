import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchItemButton from "./SearchItemButton";

function SearchBar(props) {
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
      props.childToParent(parameters);
      setRecipes(response.data);
    } else if (searchWord.length > 0) {
      const parameter = searchWord.replace(" ", "_");
      const response = await axios.get(
        `http://localhost:9000/recipes/${parameter}`
      );
      setRecipes(response.data);
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
      <div className="search-bar d-flex justify-content-center pb-2">
        <input
          className="input-field"
          type="text"
          placeholder="Search for a recipe"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="add-button mx-2 btn btn-primary"
          onClick={addSearchWord}
        >
          Add
        </button>
        <button className="search-button btn btn-primary" onClick={getRecipes}>
          Search
        </button>
      </div>
      <div className="search-items d-flex justify-content-center">
        <div className="d-flex">
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
      {recipes.drinks?.map((recipe) => (
        <div key={recipe.idDrink}>
          <h1>
            <Link to={`/recipe/${recipe.idDrink}`}>{recipe.strDrink}</Link>
          </h1>
          <img src={recipe.strDrinkThumb} alt={recipe.strDrink} />
        </div>
      ))}
    </div>
  );
}

export default SearchBar;
