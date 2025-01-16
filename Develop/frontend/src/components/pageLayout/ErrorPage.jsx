import React from "react";
import { Link, useRouteError } from "react-router-dom";
import { APP } from "../../util/paths";
import Header from "./DashboardHeader";
import Footer from "./Footer";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <Header />
      <main>
        <div className="not-found-container">
          <h2 className="not-found">Error</h2>
          <h3 className="not-found-text">Sorry, an error occured.</h3>
          <Link to={APP}>
            <button className="not-found-button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Back to dashboard
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
