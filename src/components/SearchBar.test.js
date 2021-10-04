import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { SearchBar } from "./SearchBar";

test("render search box and sort drop down", async () => {
  const { getByRole } = render(<SearchBar />);
  const sortEle = await waitFor(() => getByRole("combobox"));
  const searchEle = await waitFor(() => getByRole("textbox"));
  expect(sortEle).toBeInTheDocument();
  expect(searchEle).toBeInTheDocument();
});

test("should have options to sort By Name, Weight, Height", async () => {
  render(<SearchBar />);
  const sortOptions = await waitFor(() => screen.getAllByRole("option"));
  expect(sortOptions).toHaveLength(4);
});

test("call sort method on change of sort drop down", async () => {
  const props = { sortList: jest.fn() };
  const { getByRole } = render(<SearchBar {...props} />);
  const sortEle = await waitFor(() => getByRole("combobox"));
  await fireEvent.change(sortEle, { value: "weight" });
  expect(props.sortList).toBeCalled();
});
