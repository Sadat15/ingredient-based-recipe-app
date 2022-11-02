import 'bootstrap/dist/css/bootstrap.css'
import RecipeCardGroup from './components/recipe-card-group';
import NavbarDark from './components/navbar-dark';
import SearchBarBackground from './components/SearchBarBackground';

function App() {
  return (
    <div>
      <NavbarDark />
      <SearchBarBackground />
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
