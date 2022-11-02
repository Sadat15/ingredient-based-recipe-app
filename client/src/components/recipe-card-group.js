import RecipeCard from './recipe-card';
import searchResult from './SearchResult';

function RecipeCardGroup(drink) {
  return (
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row">
          
            {searchResult.drinks.map(drink => {
              return (
                <div className="col-md-3" key={drink.idDrink}>
                  <RecipeCard name={drink.strDrink} img={drink.strDrinkThumb} id={drink.idDrink}/>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  )
}

export default RecipeCardGroup


// const drinkElements = searchResult.drinks.map(drink => {
//   return (
//     <div className="album py-5 bg-light">
//       <div className="container">
//         <div className="row">
//           <div key={drink.idDrink}>
//             <RecipeCard name={drink.strDrink} img={drink.strDrinkThumb} id={drink.idDrink}/>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// })

// return (
//     <div>
//       {drinkElements}
//     </div>
//   )
