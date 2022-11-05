import { render, screen, waitFor } from "@testing-library/react";
import RecipeCard from "./recipe-card";
import { MemoryRouter } from "react-router-dom";

const mockData = {
  drinks: {
    strDrink: "Margarita",
    strDrinkThumb:
      "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
    idDrink: "11007",
  },
};

test("Recipe contains a recipe card", async () => {
  render(
    <MemoryRouter>
      <RecipeCard
        name={mockData.drinks.strDrink}
        img={mockData.drinks.strDrinkThumb}
        id={mockData.drinks.idDrink}
      />
    </MemoryRouter>
  );
  // wait for image to load
  await waitFor(() => expect(screen.getByRole("img")).toBeInTheDocument());
  await waitFor(() =>
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg"
    )
  );
  await waitFor(() => expect(screen.getByRole("heading")).toBeInTheDocument());
  await waitFor(() =>
    expect(screen.getByRole("heading")).toHaveTextContent("Margarita")
  );
});
test("Recipe card contains a link to the recipe", async () => {
  render(
    <MemoryRouter>
      <RecipeCard
        name={mockData.drinks.strDrink}
        img={mockData.drinks.strDrinkThumb}
        id={mockData.drinks.idDrink}
      />
    </MemoryRouter>
  );
  await waitFor(() => expect(screen.getByRole("link")).toBeInTheDocument());
  await waitFor(() =>
    expect(screen.getByRole("link")).toHaveAttribute("href", "/recipe/11007")
  );
});
