/**
 * Root component of the Todo application.
 * Handles routing between Home and Main components.
 *
 * Routes:
 * - /: Home component (welcome page)
 * - /main: Main component (todo list interface)
 *
 * @component
 * @returns {JSX.Element} The rendered App component
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
