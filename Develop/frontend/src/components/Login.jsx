import React from "react";
import { resolveBackendPath } from "../util/paths";
import "../Button.css";

export default function Login() {
  return (
    <>
      <a href={resolveBackendPath("/oauth2/authorization/google")}>
        <button className="login-with-google-btn">Sign in with Google</button>
      </a>
    </>
  );
}
