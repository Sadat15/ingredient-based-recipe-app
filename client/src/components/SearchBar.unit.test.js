import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

test("SearchBar contains a search bar", () => {
  const { container } = render(<SearchBar />);
  const inputField = screen.getByRole("textbox", { name: "" });
  expect(inputField).toBeInTheDocument();
});
test("SearchBar contains a add button", () => {
  const { container } = render(<SearchBar />);
  const addBtn = container.getElementsByClassName("add-button");
  expect(addBtn).toHaveLength(1);
});
test("SearchBar contains a search button", () => {
  const { container } = render(<SearchBar />);
  const searchBtn = container.getElementsByClassName("search-button");
  expect(searchBtn).toHaveLength(1);
});
test("SearchBar contains a search item button after clicking add", () => {
  const { container } = render(<SearchBar />);
  //input to search bar
  const inputField = container.getElementsByClassName("input-field");
  inputField[0].value = "test";
  const button = container.getElementsByClassName("add-button");
  userEvent.click(button[0]);
  const searchItemBtn = container.getElementsByClassName("search-item-button");
  expect(searchItemBtn).toHaveLength(1);
});
test("SearchBar does not contain any search items if nothing has been added", () => {
  const { container } = render(<SearchBar />);
  //input to search bar
  const inputField = container.getElementsByClassName("input-field");
  inputField[0].value = "test";
  const button = container.getElementsByClassName("add-button");
  const searchItemBtn = container.getElementsByClassName("search-item-button");
  expect(searchItemBtn).toHaveLength(0);
});
test("SearchBar removes a SearchItem button if the user clicks on it", () => {
  const { container } = render(<SearchBar />);
  //input to search bar
  const inputField = container.getElementsByClassName("input-field");
  inputField[0].value = "test";
  const button = container.getElementsByClassName("add-button");
  userEvent.click(button[0]);
  const searchItemBtn = container.getElementsByClassName("search-item-button");
  userEvent.click(searchItemBtn[0]);
  expect(searchItemBtn).toHaveLength(0);
});
