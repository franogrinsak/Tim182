import React from "react";
import { Link } from "react-router-dom";
import { HOME } from "../../util/paths";

export default function Header() {
  return (
    <header className="justify-center ">
      <Link to={HOME}>
        <h1 className="header-text landing-text">PlayPadel</h1>
      </Link>
    </header>
  );
}
