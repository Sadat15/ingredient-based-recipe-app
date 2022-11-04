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
        const drinkPriceResponse = await getIngredientFromDb(drink[`strIngredient${i}`])
        console.log(drinkPriceResponse)
        ingredientsArray.push(`${drink[`strIngredient${i}`]} ${drink[`strMeasure${i}`]} ${drinkPriceResponse.data.strAlcohol}`);
      }
    }
    setContent(ingredientsArray);
  };

  useEffect(() => {
    getRecipe();
  }, []);

  const getIngredientFromDb = async (item) => {
    // console.log('hey')
    const response = await axios.get(`http://localhost:9000/ingredient/rum`)
    return response
  //   console.log("response is " + response)
  };

  // getIngredientFromDb("rum")
  return (
    <div>
      {console.log(drink)}
      {console.log(content)}
      <div><img src={drink.strDrinkThumb} alt="Cocktail thumbnail"></img></div>
      <div><h3>{drink.strDrink}</h3></div>
      {content.map((ingredient) => (
        <div key={ingredient}>
          {/* {getIngredientFromDb("rum")} */}
          <li>{ingredient} </li>
          
        </div>
      ))}
      <div>{drink.strInstructions}</div>
    </div>
  );
}

export default Recipe;
