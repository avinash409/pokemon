import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Pagination } from "./Pagination";

test("render previous and next buttons", async () => {
  const { getByText } = render(<Pagination />);
  await waitFor(() => getByText(/Previous/i));
  await waitFor(() => getByText(/Next/i));
  expect(screen.getAllByRole("button")).toHaveLength(2);
});

test("render page counters as per offset and limit", async () => {
  const props = {
    count: 20,
    offset: 0,
    limit: 20,
  };
  const { getByText } = render(<Pagination {...props} />);
  const results = await waitFor(() => getByText(/0 - 20 of 20/i));
  expect(results).toBeInTheDocument();
});

test("render 3 different pagination options", async () => {
  const { getByText } = render(<Pagination />);
  expect(screen.getAllByRole("option")).toHaveLength(3);
});

test("navigate page when previous and next buttons are clicked", async () => {
  const props = {
    count: 20,
    offset: 0,
    limit: 20,
    previous: "http://prev",
    next: "http://next",
    navigatePage: jest.fn(),
  };
  const { getByText } = render(<Pagination {...props} />);
  const nextButton = await waitFor(() => getByText(/Next/i));
  fireEvent.click(nextButton);
  expect(props.navigatePage).toHaveBeenCalled();
});

test("should disable buttons when their values are null", async () => {
  const props = {
    count: 20,
    offset: 0,
    limit: 20,
    previous: null,
    next: null,
    navigatePage: jest.fn(),
  };
  const { getByText } = render(<Pagination {...props} />);
  const prevButton = await waitFor(() => getByText(/Previous/i));
  const nextButton = await waitFor(() => getByText(/Next/i));
  expect(prevButton).toBeDisabled();
  expect(nextButton).toBeDisabled();
});

test("should call update limit when drop down value is updated", async () => {
  const props = {
    count: 20,
    offset: 0,
    limit: 20,
    previous: null,
    next: null,
    updateLimit: jest.fn(),
  };
  const { getByText } = render(<Pagination {...props} />);
  const limitDropDown = await waitFor(() => screen.getByRole("combobox"));
  await fireEvent.change(limitDropDown, { value: 20 });
  expect(props.updateLimit).toHaveBeenCalled();
});
