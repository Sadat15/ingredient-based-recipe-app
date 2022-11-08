// mock recipe-card-group.js
import { render, screen } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import RecipeCardGroup from "./recipe-card-group";
import { MemoryRouter } from "react-router-dom";
import { mockDrinksApi, mockSearchArray } from "../__mocks__/mockData";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: () => ({
    recipes: mockDrinksApi,
    setRecipes: jest.fn(),
    search: mockSearchArray,
    setSearchQuery: jest.fn(),
  }),
}));

jest.mock("axios");

const mockChildComponent = jest.fn();
jest.mock("./recipe-card", () => (props) => {
  mockChildComponent(props);
  return <mock-childComponent />;
});

test("RecipeCardGroup renders correctly", () => {
  // mock the axios call to return a list of ingredients
  act(() => {
    render(
      <MemoryRouter>
        <RecipeCardGroup />
      </MemoryRouter>
    );
  });
  // check that the recipe card group renders 3 cards
  expect(mockChildComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      recipe: mockDrinksApi[0],
    })
  );
  expect(mockChildComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      recipe: mockDrinksApi[1],
    })
  );
});
