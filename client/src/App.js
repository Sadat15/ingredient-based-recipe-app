import './App.css';
import RecipeCard from './components/recipe-card';
import searchResult from './SerchResult';

function App() {
  const drinkElements = searchResult.drinks.map(drink => {
    return (
    <div key={drink.idDrink}>
      <RecipeCard name={drink.strDrink} img={drink.strDrinkThumb} id={drink.idDrink}/>
    </div>
    )
  })

  return (
    <div>
      {drinkElements}
    </div>
  )

  // Alternative way to do it:
  // return (
  //   <div className="App">
  //       {searchResult.drinks.map(drink => <RecipeCard{...drink} />)}

  //       {/* <RecipeCard {...searchResult.drinks}/> */}
  //   </div>
  // );
}

export default App;
