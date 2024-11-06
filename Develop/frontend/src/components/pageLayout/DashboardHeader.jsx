import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../auth/UserContext";
import { resolveBackendPath } from "../../util/paths";

export default function Header() {
  const { user } = useUser();

  let name;
  if (user !== null && user.firstName !== null && user.last !== null) {
    name = `Signed in as: ${user.firstName} ${user.lastName}`;
  }
  return (
    <header>
      <Link to="/dashboard">
        <h1 className="header-text">PlayPadel</h1>
      </Link>
      <nav className="header-nav">
        <Link to="/login">Login</Link>
        <Link to="/dashboard/logged">Logged</Link>
        {user && <a href={resolveBackendPath("/logout")}>Logout</a>}
        <div className="user-name">{name}</div>
      </nav>
    </header>
  );
}
