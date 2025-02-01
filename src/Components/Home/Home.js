/**
 * Home component - Landing page for the Todo application
 * Displays welcome message and navigation button to main todo list
 */
import React from "react";
import "./Home.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="main_Home">
      <div className="container_Home">
        <h1 className="heading_Home">Welcome to our Todo list App</h1>
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
