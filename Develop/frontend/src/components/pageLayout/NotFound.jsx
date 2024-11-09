import React from "react";
import { Link } from "react-router-dom";

export default function NotFound({ link, returnText }) {
  return (
    <div className="not-found-container">
      <h2 className="not-found">404</h2>
      <h3 className="not-found-text">Sorry, we couldn't find this page.</h3>
      <Link to={link}>
        <button className="not-found-button">Back to {returnText}</button>
      </Link>
    </div>
  );
}
