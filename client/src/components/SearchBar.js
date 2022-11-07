import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchItemButton from './SearchItemButton';
import BackgroundImage from '../img/sb1.png';
import { Outlet, Link } from 'react-router-dom';
import Navbar from './NavBar';

function SearchBar() {
  // onClick gets all recipes
  const [searchWord, setSearch] = useState('');
  const [search, setSearchQuery] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadAllIngredients = async () => {
      if (ingredients.length === 0) {
        const response = await axios.get(
          `http://localhost:9000/ingredient/returnAllIngredients`
        );
        setIngredients(response.data);
      }
    };
    loadAllIngredients();
  }, []);

  const getRecipes = async () => {
    if (search.length > 0) {
      const parameters = search.map((word) => word.replace(' ', '_'));
      const response = await axios.get(
        `http://localhost:9000/recipes/${parameters}`
      );
      if (response.data !== null) {
        setRecipes(response.data);
      }
    } else if (searchWord.length > 0) {
      const parameter = searchWord.replace(' ', '_');
      const response = await axios.get(
        `http://localhost:9000/recipes/${parameter}`
      );
      if (response.data !== null) {
        setRecipes(response.data);
      }
    }
  };

  const removeSearchItem = (item) => {
    const newSearch = search.filter((word) => word !== item);
    setSearchQuery(newSearch);
  };

  const addSearchWord = () => {
    // clear search bar with document query selector
    document.querySelector('.input-field').value = '';
    // add the search word to the search array if it's not there yet
    if (!search.includes(searchWord)) {
      const updatedSearch = search.push(searchWord);
      setSearch(updatedSearch);
    }
  };

  const searchBackground = {
    background: `url(${BackgroundImage}) no-repeat center center/cover`,
    height: '270px',
  };

  const suggestIngredients = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = ingredients.filter((ingredient) => {
        const regex = new RegExp('^' + text, 'gi');
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
  };

  return (
    <>
      <div
        className="search-bar d-flex search-background"
        style={searchBackground}
      >
        <div className="container">
          <Navbar />
          <div className="row centre-search">
            <div className="col-md-8 p-2">
              <input
                className="input-field form-control inputbox-transparent"
                type="text"
                placeholder="Search for a recipe"
                onChange={(e) => suggestIngredients(e.target.value)}
              />
            </div>
            <div className="col-1 m-2">
              <button
                className="add-button btn btn-primary"
                style={{ backgroundColor: '#20577b', borderColor: '#20577b' }}
                onClick={addSearchWord}
              >
                Add
              </button>
            </div>
            <div className="col-1 m-2">
              <Link to="/recipes">
                <button
                  className="search-button btn btn-primary"
                  style={{
                    backgroundColor: '#20577b',
                    borderColor: '#20577b',
                  }}
                  onClick={getRecipes}
                >
                  Search
                </button>
              </Link>
            </div>
          </div>
          <div className="m-2">
            <div className="row d-flex justify-content-around">
              <div className="col-6">
                {suggestions.map((suggestion, i) => (
                  <button
                    className="search-item-button add-button m-2 btn btn-primary"
                    style={{
                      backgroundColor: '#25aec9',
                      borderColor: '#25aec9',
                    }}
                    onClick={() => {
                      addFromSuggestion(suggestion.strIngredient);
                    }}
                    key={`suggestion${i}`}
                  >
                    {suggestion.strIngredient}
                  </button>
                ))}
              </div>
              <div className="col-6">
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
