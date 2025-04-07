import { render, screen } from "@testing-library/react";
import { vi, test, expect } from "vitest";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

test("renders content", () => {
  const blog = {
    title: "hello",
    author: "Waqas",
    url: "https://example.com",
    likes: 0,
    id: "123",
  };

  const setIsLikeAdded = vi.fn();

  const { container } = render(
    <Blog blog={blog} setIsLikeAdded={setIsLikeAdded} />
  );
  const div = container.querySelector(".title");
  expect(div).toHaveTextContent("title : hello");
});

test("check url ", async () => {
  const blog = {
    title: "hello",
    author: "Waqas",
    url: "https://example.com",
    likes: 0,
    id: "123",
  };

  const setIsLikeAdded = vi.fn();

  render(<Blog blog={blog} setIsLikeAdded={setIsLikeAdded} />);

  const user = userEvent.setup();
  const button = screen.getByText("Show");
  await user.click(button);

  expect(screen.getByText("https://example.com")).toBeDefined();
});
