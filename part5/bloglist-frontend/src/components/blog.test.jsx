import { render } from "@testing-library/react";
import { vi, test, expect } from "vitest";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "hello",
    author: "Waqas",
    url: "https://example.com",
    likes: 0,
    id: "123",
  };

  const setIsLikeAdded = vi.fn(); // ✅ mock function

  const { container } = render(
    <Blog blog={blog} setIsLikeAdded={setIsLikeAdded} />
  );
  const div = container.querySelector(".title");
  expect(div).toHaveTextContent("title : hello");
});
