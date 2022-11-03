import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Recipe from "./components/Recipe";

function App() {
  const [data, setData] = useState([]);

  const childToParent = (data) => {
    setData(data);
    console.log(data);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {/* currently the homepage is rendered using React component SearchBar, could be changed later */}
          <Route index element={<SearchBar childToParent={childToParent} />} />
          <Route path="recipe/:id" element={<Recipe data={data}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
