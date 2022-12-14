import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { mockIngredientSuggestions } from "../__mocks__/mockData";

jest.mock("axios");

const mockChildComponent = jest.fn();

jest.mock("./SearchItemButton", () => (props) => {
  mockChildComponent(props);
  return <mock-childComponent />;
});

jest.mock("./recipe-card-group", () => (props) => {
  mockChildComponent2(props);
  return <mock-childComponent />;
});

test("SearchBar renders correctly", async () => {
  axios.get.mockResolvedValue({
    data: mockIngredientSuggestions,
  });

  act(() => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );
  });

  await waitFor(() => {
    expect(
      screen.getByPlaceholderText("Start by typing your ingredients")
    ).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  // type in the search bar
  userEvent.type(
    screen.getByPlaceholderText("Start by typing your ingredients"),
    "vod"
  );

  // check that the search bar is updated
  await waitFor(() => {
    expect(
      screen.getByPlaceholderText("Start by typing your ingredients")
    ).toHaveValue("vod");
  });

  // check that the suggestions are rendered
  await waitFor(() => {
    expect(screen.getByText("Vodka")).toBeInTheDocument();
  });

  // click on the suggestion button
  userEvent.click(screen.getByText("Vodka"));

  // check that the mock child component is called with the correct props
  expect(mockChildComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      item: "Vodka",
    })
  );
});
