import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import axios from "axios";

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

test("SearchBar contains a search input", async () => {
  render(
    <MemoryRouter>
      <SearchBar />
    </MemoryRouter>
  );
  await waitFor(() => expect(screen.getByRole("textbox")).toBeInTheDocument());
});

test("SearchBar contains a search button", async () => {
  render(
    <MemoryRouter>
      <SearchBar />
    </MemoryRouter>
  );
  // check for search button
  await waitFor(() => expect(screen.getAllByText("Search")).toHaveLength(1));
});
// check for add button
test("SearchBar contains an add button", async () => {
  render(
    <MemoryRouter>
      <SearchBar />
    </MemoryRouter>
  );
  await waitFor(() => expect(screen.getAllByText("Add")).toHaveLength(1));
});
// check if add button adds a new search input
test("SearchBar adds a new search input", async () => {
  render(
    <MemoryRouter>
      <SearchBar />
    </MemoryRouter>
  );
  await waitFor(() => expect(screen.getAllByRole("textbox")).toHaveLength(1));
  act(() => {
    userEvent.type(screen.getByRole("textbox"), "Margarita");
    userEvent.click(screen.getByText("Add"));
    userEvent.type(screen.getByRole("textbox"), "Vodka");
    userEvent.click(screen.getByText("Add"));
  });
  await waitFor(() =>
    expect(screen.getAllByText(/Margarita|Vodka/)).toHaveLength(2)
  );
});
// check if search button calls axios.get
test("SearchBar calls axios.get", async () => {
  axios.get.mockResolvedValue({ data: mockData });
  render(
    <MemoryRouter>
      <SearchBar />
    </MemoryRouter>
  );
  await waitFor(() => expect(screen.getAllByRole("textbox")).toHaveLength(1));
  userEvent.type(screen.getByRole("textbox"), "Margarita");
  userEvent.click(screen.getByText("Search"));
  await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
});
