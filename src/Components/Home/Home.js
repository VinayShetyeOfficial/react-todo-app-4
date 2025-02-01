/**
 * Home component serves as the landing page for the Todo application.
 *
 * Features:
 * - Displays welcome message
 * - Provides navigation to the main todo interface
 * - Implements animated button text
 *
 * Props: None
 *
 * Hooks used:
 * - useNavigate: For programmatic navigation to the main todo interface
 *
 * Styling:
 * - Uses custom CSS from Home.css
 * - Implements Bootstrap Button component
 *
 * @component
 * @returns {JSX.Element} Rendered Home component
 */
import React from "react";
import "./Home.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Home() {
  // Initialize navigation hook
  const navigate = useNavigate();

  return (
    <div className="main_Home">
      <div className="container_Home">
        <h1 className="heading_Home">Welcome to our Todo list App</h1>
        {/* Navigation button with animated text */}
        <Button
          className="btn_Home btn1"
          variant="outline-primary"
          onClick={() => navigate("/main")}
        >
          <span className="back">
            <span>G</span>
            <span>e</span>
            <span>t</span>
            <span>&nbsp;</span>
            <span>S</span>
            <span>t</span>
            <span>a</span>
            <span>r</span>
            <span>t</span>
            <span>e</span>
            <span>d</span>
          </span>
        </Button>
      </div>
    </div>
  );
}

export default Home;
