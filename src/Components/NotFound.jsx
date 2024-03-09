import React from "react";
import { Link } from "react-router-dom";
import "../App.css"
import NotFoundImage from "../assets/notfound.webp";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>The infamous 404, not found.</h1>
      <img
        src={NotFoundImage}
        alt="Page not found. 404."
        className="not-found-image"
      />
      <p className="not-found-text">
        Ooops! The page you are looking for is hiding.{" "}
      </p>
    </div>
  );
};

export default NotFound;