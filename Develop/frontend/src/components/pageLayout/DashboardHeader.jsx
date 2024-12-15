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
import { Badge } from "primereact/badge";
import { isPlayer } from "../../util/users";

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
        {user && isPlayer(user) && (
          <i
            className="pi pi-bell p-overlay-badge"
            style={{ fontSize: "1rem" }}
          >
            <Badge
              className="h-4 w-4 min-w-4"
              severity="danger"
              style={{
                fontSize: "0.5rem",
                lineHeight: "1rem",
              }}
            ></Badge>
          </i>
        )}
        <Link to={LOGIN}>Login</Link>
        <Link to={LOGGED}>Logged</Link>
        {user && <a href={resolveBackendPath(LOGOUT)}>Logout</a>}
        <div className="user-name">{name}</div>
      </nav>
    </header>
  );
}
