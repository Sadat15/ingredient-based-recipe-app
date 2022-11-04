import { render, screen, waitFor } from "@testing-library/react";
import Recipe from "./Recipe";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import userEvent from "@testing-library/user-event";

jest.mock("axios");

const mockData = {
  drinks: [
    {
      strDrink: "Margarita",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
      strInstructions:
        "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten..",
      strIngredient1: "Tequila",
      strIngredient2: "Triple sec",
      strIngredient3: "Lime juice",
      strIngredient4: "Salt",
      strMeasure1: "1 1/2 oz ",
      strMeasure2: "1/2 oz ",
      strMeasure3: "1 oz ",
      strMeasure4: null,
    },
  ],
};

test("Recipe contains a cocktail thumbnail", async () => {
  axios.get.mockResolvedValue({ data: mockData });
  render(
    <MemoryRouter>
      <Recipe match={{ params: { id: "11007" } }} id={"11007"} />
    </MemoryRouter>
  );
  // wait for axios.get to resolve
  await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
  // wait for image to load
  await waitFor(() => expect(screen.getByRole("img")).toBeInTheDocument());
  // wait for image to load
  await waitFor(() =>
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg"
    )
  );
});
test("Recipe contains a cocktail name", async () => {
  axios.get.mockResolvedValue({ data: mockData });
  render(
    <MemoryRouter>
      <Recipe match={{ params: { id: "11007" } }} />
    </MemoryRouter>
  );
  // wait for axios.get to resolve
  await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
  // wait for image to load
  await waitFor(() => expect(screen.getByRole("heading")).toBeInTheDocument());
  // wait for image to load
  await waitFor(() =>
    expect(screen.getByRole("heading")).toHaveTextContent("Margarita")
  );
});
test("Recipe contains a cocktail instructions", async () => {
  axios.get.mockResolvedValue({ data: mockData });
  render(
    <MemoryRouter>
      <Recipe match={{ params: { id: "11007" } }} />
    </MemoryRouter>
  );
  // wait for axios.get to resolve
  await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
  // wait instructions to load getRoleBy
  const instructions = await screen.findAllByText(/Rub the rim of/i);
  expect(instructions).toHaveLength(1);
});
test("Recipe contains a cocktail ingredients", async () => {
  axios.get.mockResolvedValue({ data: mockData });
  render(
    <MemoryRouter>
      <Recipe match={{ params: { id: "11007" } }} />
    </MemoryRouter>
  );
  // wait for axios.get to resolve
  await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
  // wait for ingredients to load
  const ingredients = await screen.findAllByText(/Tequila/i);
  expect(ingredients).toHaveLength(1);
});
