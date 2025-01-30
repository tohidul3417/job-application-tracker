import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import ThemeProvider from "./contexts/ThemeContext";
import './index.css';

// Create the root element for the React app
const root = createRoot(document.getElementById("root"));

// Render the React app wrapped with Redux Provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
