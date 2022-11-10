import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import Recipe from "./Recipe";
import { MemoryRouter } from "react-router-dom";
import {
  mockDrinksApi,
  mockMargarita,
  mockSearchArray,
  mockIngredients,
} from "../__mocks__/mockData";
import axios from "axios";

jest.mock("axios");

test("RecipeCard renders correctly", async () => {
  // mock the axios call to return a list of ingredients
  axios.get.mockResolvedValueOnce({
    data: mockMargarita,
  });
  for (let i = 0; i < 4; i++) {
    axios.get.mockResolvedValueOnce({
      data: mockIngredients,
    });
  }
  act(() => {
    render(
      <MemoryRouter>
        <Recipe match={{ params: { id: "11007" } }} />
      </MemoryRouter>
    );
  });
  await waitFor(() => {
    expect(screen.getByText("Margarita")).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(
      screen.getByText(
        "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass."
      )
    ).toBeInTheDocument();
  });
  // test if href is www.testlink.com
  await waitFor(() => {
    expect(screen.getAllByText(/buy for £1/i)).toHaveLength(4);
  });
  await waitFor(() => {
    expect(screen.getAllByText(/buy for £1/i)[0]).toHaveAttribute(
      "href",
      "www.testlink.com"
    );
  });
});
