import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="justify-center ">
      <Link to="/">
        <h1 className="header-text landing-text">PlayPadel</h1>
      </Link>
    </header>
  );
}
