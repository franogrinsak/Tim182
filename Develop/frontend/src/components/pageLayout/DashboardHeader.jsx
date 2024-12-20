import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../auth/UserContext";
import {
  APP,
  LOGGED,
  LOGIN,
  LOGOUT,
  NOTIFICATIONS,
  resolveBackendPath,
} from "../../util/paths";
import { Badge } from "primereact/badge";
import { isPlayer } from "../../util/users";
import { getUnreadNotifications } from "../../util/api";

const CHECK_NOTIFICATIONS_TIME = 60000;

export default function Header() {
  const { user } = useUser();
  const [unread, setUnread] = React.useState(false);

  React.useEffect(() => {
    async function getUnread() {
      const data = new URLSearchParams();
      data.append("userId", user.userId);
      const unreadResponse = await getUnreadNotifications(data);
      setUnread(unreadResponse);
    }

    if (user && isPlayer(user)) {
      getUnread();

      // Interval for checking if notifications arrive
      const interval = setInterval(() => {
        getUnread();
      }, CHECK_NOTIFICATIONS_TIME);
      return () => clearInterval(interval);
    }
  }, [JSON.stringify(user)]);

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
          <Link to={`${NOTIFICATIONS}/${user.userId}`}>
            <i
              className="pi pi-bell p-overlay-badge"
              style={{ fontSize: "1rem" }}
            >
              {unread && (
                <Badge
                  className="h-4 w-4 min-w-4"
                  severity="danger"
                  style={{
                    fontSize: "0.5rem",
                    lineHeight: "1rem",
                  }}
                ></Badge>
              )}
            </i>
          </Link>
        )}
        <Link to={LOGIN}>Login</Link>
        <Link to={LOGGED}>Logged</Link>
        {user && <a href={resolveBackendPath(LOGOUT)}>Logout</a>}
        <div className="user-name">{name}</div>
      </nav>
    </header>
  );
}
