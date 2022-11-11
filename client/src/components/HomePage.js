import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {cocktailIds} from './cocktail_ids'

function Recipe() {
  const [drink, setRecipe] = useState([]);
  const [content, setContent] = useState([]);

  const getRecipe = async () => {
    const id = Math.floor(Math.random() * 615);
    const cocktailId = cocktailIds[`${id}`].idDrink
    const response = await axios.get(`http://localhost:9000/recipe/${cocktailId}`);
    const drink = response.data.drinks[0];
    setRecipe(drink);

    let ingredientsArray = [];
    for (let i = 1; i <= 15; i++) {
      if (drink[`strIngredient${i}`] !== null) {
        const drinkPriceResponse = await getIngredientFromDb(
          drink[`strIngredient${i}`]
        );
        ingredientsArray.push([
          drink[`strIngredient${i}`],
          drink[`strMeasure${i}`],
          drinkPriceResponse.data.priceItem,
          drinkPriceResponse.data.trolleyLink,
          drinkPriceResponse.data.strDescription,
        ]);
      }
    }
    setContent(ingredientsArray);
  };

  useEffect(() => {
    getRecipe();
  }, []);

  const getIngredientFromDb = async (item) => {
    const response = await axios.get(
      `http://localhost:9000/api/ingredient/${item}`
    );
    return response;
  };

  return (
    <div className="background-gradient-grey">
      <div className="container">
      <div className="row pt-4">
          <div className="col"></div>
          <div className="col-11">
            <div className="card mb-3 shadow-lg p-3 mb-5 bg-white rounded" >
              <div className="row">
                <div className="col-md-4">
                  <img src={drink.strDrinkThumb} className="img-fluid rounded shadow-md bg-body" alt="..."></img>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h2 className="card-title recipe-dark-brown">{drink.strDrink}</h2>
                    <div className="card-text">                  
                      <table class="table">
                        <tbody>
                          {content.map((ingredient) => (
                            <tr>
                              <th scope="row">
                              {ingredient[0]}
                                {/* <button className="btn btn-recipe-primary" type="button" data-bs-toggle="collapse" data-bs-target={`#ingredientInfo-${ingredient[0]}`} aria-expanded="false" aria-controls="collapseExample">{ingredient[0]}</button> 
                                <div className="collapse" id={`ingredientInfo-${ingredient[0]}`}>
                                  <div className="card card-body">
                                    {ingredient[4]}
                                  </div>
                                </div> */}
                              </th>
                              <td>{ingredient[1]}</td>
                              <td>
                                {ingredient[2] !== null && <a className="recipe-dark-moss" href={`${ingredient[3]}`}>buy for £{ingredient[2]}</a>}                                
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div></div>
                    <h5 className="recipe-dark-brown">Method:</h5>
                    <div>{drink.strInstructions}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
