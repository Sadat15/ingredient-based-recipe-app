import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchItemButton from "./SearchItemButton";
import BackgroundImage from "../img/sb1.png";
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
        `http://localhost:9000/api/ingredient/returnAllIngredients`
      );
      setIngredients(response.data);
    };
    loadAllIngredients();

    const el = document.getElementById('search-box');

    el.addEventListener('keydown', e => {
      if(e.key === 'Enter'){
        
        const typedSearchWord = document.querySelector(".input-field").value

        if (!search.includes(typedSearchWord) && typedSearchWord.length > 0) {
          const updatedSearch = search.push(typedSearchWord);
          setSearch(updatedSearch);
        } 
        getRecipes()
        document.querySelector(".input-field").value = ''
      }
    })

  }, []);

  const getRecipes = async () => {
    if (search.length > 0) {
      const parameters = search.map((word) => word.replace(" ", "_"));
      const response = await axios.get(
        `http://localhost:9000/api/cocktail/getall/${parameters}`
      );
      if (response.data !== null) {
        updateIngredients(response.data)
        const sortedArrayOfRecipes = response.data.sort((a, b) => {
          if (a.numberOfOverlapping === b.numberOfOverlapping) {
            return a.missingIngredients - b.missingIngredients
          }
          return b.numberOfOverlapping - a.numberOfOverlapping
        })

        const sortedUniqueRecipes = sortedArrayOfRecipes.filter((value, index, self) => (
          index === self.findIndex((t) => (
            t.idDrink === value.idDrink
          ))
        ));
        setRecipes(sortedUniqueRecipes);
      }
    } else if (searchWord.length > 0) {
      const updatedSearch = search.push(searchWord);
      setSearch(updatedSearch);

      const parameter = searchWord.replace(" ", "_");
      const response = await axios.get(
        `http://localhost:9000/api/cocktail/getall/${parameter}`
      );
      updateIngredients(response.data)

      const sortedArrayOfRecipes = response.data.sort((a, b) => {
        if (a.numberOfOverlapping === b.numberOfOverlapping) {
          return a.missingIngredients - b.missingIngredients
        }
        return b.numberOfOverlapping - a.numberOfOverlapping
      })

      setRecipes(sortedArrayOfRecipes);
    }
  }
    

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

  const searchBackground = {
    background: `url(${BackgroundImage}) no-repeat center center/cover`,
    height: "auto",
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
    document.querySelector(".input-field").value = "";
  };

  const updateIngredients = (data) => {
    for (let i = 0; i < data.length; i++) {
      const recipeIngredients = []
      for (let j=1; j<= 15; j++) {
        if (data[i][`strIngredient${j}`] !== null) {
          recipeIngredients.push(data[i][`strIngredient${j}`])
        }
      }

      const recipeIngredientsLower = recipeIngredients.map(element => element.toLowerCase())

      let searchLower = search.map(element => element.toLowerCase())

      var allUniqueIngredients = recipeIngredientsLower.concat(searchLower.filter((item) => recipeIngredientsLower.indexOf(item) < 0));

      const numberOfOverlapping = searchLower.length + recipeIngredientsLower.length - allUniqueIngredients.length

      const missingIngredients = allUniqueIngredients.length - searchLower.length
      
      data[i].ingredientsArray = recipeIngredients
      data[i].numberOfOverlapping = numberOfOverlapping
      data[i].missingIngredients = missingIngredients
      
    }
  }


  return (
    <>
    <Navbar />
      <div
        className=" center-search search-bar d-flex search-background align-items-center "
        style={searchBackground}
      >
        
        <div className="container">
          
          <div className="row centre-search align-items-center">
            <div className="col-md-8 p-2 ">
              <input
                className="input-field form-control inputbox-transparent"
                id="search-box"
                type="text"
                placeholder="Start by typing your ingredients"
                onChange={(e) => suggestIngredients(e.target.value)}
              />
            </div>
            <div className="col-1 m-2 text-center">
              <button
                className="add-button btn btn-recipe-primary"
                onClick={addSearchWord}
              >
                Add
              </button>
            </div>
            <div className="col-1 m-2">
              <Link to="/recipes">
                <button
                  className="search-button btn btn-recipe-primary text-center"
                  id="search-button"
                  onClick={getRecipes}
                >
                  Search
                </button>
              </Link>
            </div>
          </div>
          <div className="m-2">
            <div className="row row-cols-auto d-flex justify-content-around">
              <div className="col-6 text-center">
                {suggestions.map((suggestion, i) => (
                  <button
                    className="search-item-button add-button m-2 btn btn-recipe-secondary"
                    onClick={() => {
                      addFromSuggestion(suggestion.strIngredient);
                    }}
                    key={`suggestion${i}`}
                  >
                    {suggestion.strIngredient}
                  </button>
                ))}
              </div>
              <div className="added col-6">
                {search?.map((item) => (
                  <div
                    className="d-inline"
                    key={item}
                    onClick={() => removeSearchItem(item)}
                  >
                    <SearchItemButton item={item} />
                  </div>
                ))}
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

// Sorting strategy

// [1,2,3] - search

// [2,5,8,9,3] - recipe 1 - overlap is [2, 3] - length is 2, missing ingredients ingredients.length - overlap.length (3)

// [2,6,7] - recipe 2 - overlap is [2] - length is 1, missing ingredients ingredients.length - overlap.length (2)

// [1,2,3,4,7,9] - recipe 3 - overlap is [1,2,3] - length is 3, missing ingredients ingredients.length - overlap.length (3)

// [2,5,8,3] - recipe 4 - overlap is [2, 3] - length is 2, missing ingredients ingredients.length - overlap.length (2)

// sorting: 3, 4, 1, 2