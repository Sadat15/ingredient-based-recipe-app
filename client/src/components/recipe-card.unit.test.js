import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import RecipeCard from "./recipe-card";
import { MemoryRouter } from "react-router-dom";
import {
  mockDrinksApi,
  mockMargarita,
  mockSearchArray,
} from "../__mocks__/mockData";
import axios from "axios";

jest.mock("axios");

test("RecipeCard renders correctly", async () => {
  // mock the axios call to return a list of ingredients
  axios.get.mockResolvedValue({
    data: mockMargarita,
  });

  act(() => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={mockDrinksApi[0]} search={mockSearchArray} />
      </MemoryRouter>
    );
  });
  await waitFor(() => {
    expect(screen.getByText("Margarita")).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText(/3 ingredients missing/i)).toBeInTheDocument();
  });
});
