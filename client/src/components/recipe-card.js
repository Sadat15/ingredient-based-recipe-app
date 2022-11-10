import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";

function RecipeCard({ recipe, search }) {
  return (
    <div className="card mb-4 grow" key={recipe.idDrink}>
      <Link to={`/recipe/${recipe.idDrink}`} style={{ textDecoration: "none" }}>
        <img
          src={recipe.strDrinkThumb}
          className="card-img-top"
          alt="..."
        ></img>
        <div className="card-body">
          <h5
            className="card-title Recipe-card-header"
            style={{ color: "#be1045" }}
          >
            {recipe.strDrink}
          </h5>
          <p className="card-text" style={{ color: "#21709c" }}>
            {recipe.missingIngredients} ingredients missing
          </p>
          <p className="card-text" style={{ color: "#21709c" }}>
            Buy missing ingredients for
          </p>
        </div>
        <div className="card-footer text-muted d-flex justify-content-between align-items-center">
          <div>Rating</div>
        </div>
        {/* </a> */}
      </Link>
    </div>
  );
}

export default RecipeCard;
