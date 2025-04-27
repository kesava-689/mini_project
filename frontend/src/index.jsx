import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Import the main App component
import "./index.css"; // Import global styles (optional)
import { BrowserRouter } from "react-router-dom"; // Ensure routing works

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
