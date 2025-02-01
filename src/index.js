/**
 * Entry point of the React Todo application.
 *
 * This file is responsible for:
 * - Mounting the root React component to the DOM
 * - Importing global styles and dependencies
 * - Setting up the initial render
 *
 * Dependencies:
 * - React: Core library for building UI components
 * - ReactDOM: Library for DOM-specific methods
 * - Bootstrap: CSS framework for styling
 * - index.css: Global application styles
 *
 * @module index
 */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
