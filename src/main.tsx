import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";

const rootElement = document.getElementById("root") as HTMLElement;

createRoot(rootElement).render(
  <App />
);
