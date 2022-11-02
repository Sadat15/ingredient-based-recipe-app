import './App.css';
import RecipeCardGroup from './components/recipe-card-group';

function App() {
  return (
    <div>
      <RecipeCardGroup />
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
