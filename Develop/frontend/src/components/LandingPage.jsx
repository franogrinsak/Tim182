import React from "react";
import Header from "./pageLayout/Header";
import Footer from "./pageLayout/Footer";
import { APP } from "../util/paths";

export default function LandingPage() {
  return (
    <>
      <h2 className="text-7xl">Welcome</h2>
      <a href={APP}>
        <button
          type="button"
          className="mt-10 scale-150 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Go to dashboard
        </button>
      </a>
    </>
  );
}
