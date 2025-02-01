/**
 * Main App component that handles routing.
 * Sets up routes for Home and Main components.
 */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Main from "./components/Main/Main";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
