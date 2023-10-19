import ReactDom from "react-dom/client";
import App from "./App";
import React from "react";

//We do as HTMLElement coz getElementById can return null
const rootEl = document.getElementById("root") as HTMLElement;
const root = ReactDom.createRoot(rootEl);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);   