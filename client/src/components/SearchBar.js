import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchItemButton from "./SearchItemButton";
import BackgroundImage from "../img/sb1.png";
import "./SearchBar.css";
import { Outlet, Link } from "react-router-dom";
import Navbar from "./NavBar";
// import "./SearchBar.css";

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

    const el = document.getElementById("search-box");

    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const typedSearchWord = document.querySelector(".input-field").value;

        if (!search.includes(typedSearchWord) && typedSearchWord.length > 0) {
          console.log("hey1");
          const updatedSearch = search.push(typedSearchWord);
          console.log("updated search" + updatedSearch);
          setSearch(updatedSearch);
        }
        getRecipes();
        document.querySelector(".input-field").value = "";
      }
    });
  }, []);

  const getRecipes = async () => {
    console.log("function");
    console.log(searchWord);
    if (search.length > 0) {
      const parameters = search.map((word) => word.replace(" ", "_"));
      const response = await axios.get(
        `http://localhost:9000/recipes/${parameters}`
      );
      if (response.data !== null) {
        setRecipes(response.data);
      }
    } else if (searchWord.length > 0) {
      const parameter = searchWord.replace(" ", "_");
      const response = await axios.get(
        `http://localhost:9000/recipes/${parameter}`
      );
      if (response.data !== null) {
        setRecipes(response.data);
      }
    }
    setSuggestions([]);
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
    setSuggestions([]);
  };

  const searchBackground = {
    background: `url(${BackgroundImage}) no-repeat center center/cover`,
    height: "250px",
  };

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

  const addFromSuggestion = (item) => {
    // add the search word to the search array if it's not there yet
    if (!search.includes(item)) {
      const updatedSearch = search.push(item);
      setSearch(updatedSearch);
    }
    setSuggestions([]);
    document.querySelector(".input-field").value = "";
  };

  return (
    <>
      <div className="search-bar">
        <Navbar />
        <div className="background" style={searchBackground}>
          <div className="container">
            <div className="row" style={{ minHeight: "80px" }}>
              {search?.map((item) => (
                <div
                  className="col-1"
                  key={item}
                  onClick={() => removeSearchItem(item)}
                >
                  <SearchItemButton item={item} />
                </div>
              ))}
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="dropdown col-8 px-3">
                <div id="myDropdown" className="dropdown-content pull-right">
                  <input
                    type="text"
                    className="form-control input-field"
                    placeholder="Search for ingredients"
                    id="search-box"
                    onChange={(e) => suggestIngredients(e.target.value)}
                  />
                  {suggestions.map((item, i) => (
                    <a
                      key={item + i}
                      href="#"
                      onClick={() => addFromSuggestion(item.strIngredient)}
                    >
                      {item.strIngredient}
                    </a>
                  ))}
                </div>
              </div>
              <div className="col-4">
                <Link to="/recipes">
                  <button
                    className="btn btn-primary float-start"
                    id="search-button"
                    onClick={getRecipes}
                  >
                    Search
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet context={{ recipes, setRecipes, search, setSearchQuery }} />
    </>
  );
}

export default SearchBar;
