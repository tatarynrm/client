import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./redux/store";
const root = ReactDOM.createRoot(document.getElementById("ict"));
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
