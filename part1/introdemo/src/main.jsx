import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App
      person={{ name: "Lin Lanying", imageId: "1bX5QH6" }}
      size={undefined}
    />
  </StrictMode>
);
