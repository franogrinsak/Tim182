import React from "react";
import { Link } from "react-router-dom";

export default function NotFound({ link, returnText }) {
  return (
    <div className="not-found-container">
      <h2 className="not-found">404</h2>
      <h3 className="not-found-text">Sorry, we couldn't find this page.</h3>
      <Link to={link}>
        <button className="not-found-button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Back to {returnText}
        </button>
      </Link>
    </div>
  );
}
