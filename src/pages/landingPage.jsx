import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="row landing justify-content-center">
      <div
        className="col-md-9  text-center"
        style={{ borderRight: "5px solid white" }}
      >
        <h3 style={{ color: "white", fontSize: "60px" }}>TIERS Limited</h3>
        <h1 style={{ color: "white", fontSize: "20px" }}>
          A Place Where Dreams Come True
        </h1>

        <Link to="/home">
          <button
            className="btn landingbtn"
            style={{ color: "black", backgroundColor: "white" }}
          >
            Let's Go
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
