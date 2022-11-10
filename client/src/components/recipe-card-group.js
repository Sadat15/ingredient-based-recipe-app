import RecipeCard from "./recipe-card";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// import searchResult from './SearchResult';

function RecipeCardGroup() {
  const { recipes, setRecipes } = useOutletContext();
  const { search, setSearchQuery } = useOutletContext();
  const itemsPerPage = 20;
  const [hasMore, setHasMore] = useState(true);
  const [records, setrecords] = useState(itemsPerPage);

  useEffect(() => {
    setRecipes(recipes);
    setSearchQuery(search);
    // fetchData(setItems);
  }, [recipes, setRecipes, search, setSearchQuery]);

  const showItems = (posts) => {
    var items = [];
    if (recipes.length > 0) {
      for (var i = 0; i < records; i++) {
        if (recipes[i]) {
          items.push(
            <div
              className="col-9 col-md-6 col-lg-3"
              id={`${posts.idDrink}`}
              key={posts[i].idDrink}
            >
              <RecipeCard recipe={posts[i]} search={search} />
            </div>
          );
        }
      }
    }
    return items;
  };

  const loadMore = () => {
    if (records === recipes.length) {
      console.log("no more items");
      setHasMore(false);
    } else {
      setTimeout(() => {
        console.log("loading more items");
        setrecords(records + itemsPerPage);
      }, 2000);
    }
  };

  return (
    <div className="album py-5 background-gradient">
      <InfiniteScroll
        dataLength={records}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="container">
          <div className="row d-flex justify-content-center">
            {showItems(recipes)}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default RecipeCardGroup;
