// create multiple recipes
import { Link } from "react-router-dom";

function Recipes({ data, idToParent, recipesData }) {
  return (
    <div>
      {recipesData.drinks?.map((recipe) => (
        <div key={recipe.idDrink}>
          <h1>
            <Link
              to={`/recipe/${recipe.idDrink}`}
              onClick={idToParent(recipe.idDrink)}
            >
              {recipe.strDrink}
            </Link>
          </h1>
          <img src={recipe.strDrinkThumb} alt={recipe.strDrink} />
        </div>
      ))}
    </div>
  );
}

export default Recipes;
