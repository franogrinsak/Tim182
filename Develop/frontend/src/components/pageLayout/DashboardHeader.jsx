import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../auth/UserContext";
import {
  APP,
  LOGGED,
  LOGIN,
  LOGOUT,
  resolveBackendPath,
} from "../../util/paths";

export default function Header() {
  const { user } = useUser();

  let name;
  if (user !== null && user.firstName !== null && user.last !== null) {
    name = `Signed in as: ${user.firstName} ${user.lastName}`;
  }
  return (
    <header>
      <Link to={APP}>
        <h1 className="header-text">PlayPadel</h1>
      </Link>
      <nav className="header-nav">
        <Link to={LOGIN}>Login</Link>
        <Link to={LOGGED}>Logged</Link>
        {user && <a href={resolveBackendPath(LOGOUT)}>Logout</a>}
        <div className="user-name">{name}</div>
      </nav>
    </header>
  );
}
