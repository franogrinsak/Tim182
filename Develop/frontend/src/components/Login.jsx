import React from "react";
import { resolveBackendPath } from "../util/paths";
import "../Button.css";
import Header from "./pageLayout/DashboardHeader";
import Footer from "./pageLayout/Footer";

export default function Login() {
  return (
    <>
      <Header />
      <main>
        <a href={resolveBackendPath("/oauth2/authorization/google")}>
          <button className="login-with-google-btn">Sign in with Google</button>
        </a>
      </main>
      <Footer />
    </>
  );
}
