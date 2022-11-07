import React from "react";
import { useState, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
import axios from "axios";
// import { Link } from "react-router-dom";

function Recipe() {
  const [drink, setRecipe] = useState([]);
  const [content, setContent] = useState([]);

  const getRecipe = async () => {
    const id = window.location.href.split("/").reverse()[0];
    const response = await axios.get(`http://localhost:9000/recipe/${id}`);
    const drink = response.data.drinks[0]
    setRecipe(drink);

    let ingredientsArray = [];
    for (let i = 1; i <= 15; i++) {
      if (drink[`strIngredient${i}`] !== null) {
        ingredientsArray.push(
          drink[`strIngredient${i}`] +
            " " +
            drink[`strMeasure${i}`]
        );
      }
    }
    setContent(ingredientsArray);
  };

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <div>
      {console.log(drink)}
      {console.log(content)}
      <div><img src={drink.strDrinkThumb} alt="Cocktail thumbnail"></img></div>
      <div><h3>{drink.strDrink}</h3></div>
      {content.map((ingredient) => (
        <div key={ingredient}>
          <li>{ingredient}</li>
        </div>
      ))}
      <div>{drink.strInstructions}</div>
    </div>
  );
}

export default Recipe;