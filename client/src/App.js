import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Recipe from "./components/Recipe";
import Recipes from "./components/Recipes";

function App() {
  const [data, setData] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [id, setId] = useState("");

  const idToParent = (id) => {
    setId(id);
  };

  const recipesToParent = (data) => {
    setRecipes(data);
  };

  const childToParent = (data) => {
    setData(data);
  };

  return (
    <BrowserRouter>
      <SearchBar
        childToParent={childToParent}
        idToParent={idToParent}
        recipesToParent={recipesToParent}
      />
      <Routes>
        <Route
          path="recipes"
          element={<Recipes data={data} idToParent={idToParent} recipesData={recipes} />}
        />
        <Route path="recipe/:id" element={<Recipe data={data} id={id} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
