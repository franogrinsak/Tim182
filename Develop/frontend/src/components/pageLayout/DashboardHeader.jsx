import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../auth/UserContext";
import { APP, NOTIFICATIONS } from "../../util/paths";
import { Badge } from "primereact/badge";
import { isPlayer } from "../../util/users";
import { getUnreadNotifications } from "../../util/api";
import DesktopDashboardHeader from "./DesktopDashboardHeader";
import MobileDashboardHeader from "./MobileDashboardHeader";

const CHECK_NOTIFICATIONS_TIME = 60000;

export default function Header() {
  const { user } = useUser();
  const location = useLocation();
  const [unread, setUnread] = React.useState(false);
  const [headerOpened, setHeaderOpened] = React.useState(false);
  const [size, setSize] = React.useState(0);

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

  React.useEffect(() => {
    setHeaderOpened(false);
  }, [location]);

  React.useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return (
    <>
      <header>
        <Link to={APP}>
          <h1 className="header-text">PlayPadel</h1>
        </Link>

        <nav className="header-nav">
          {user && isPlayer(user) && (
            <Link
              className="text-black hover:text-black"
              to={`${NOTIFICATIONS}/${user.userId}`}
            >
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
          {user &&
            (size > 1200 ? (
              <DesktopDashboardHeader user={user} name={name} />
            ) : (
              <MobileDashboardHeader
                headerOpened={headerOpened}
                setHeaderOpened={setHeaderOpened}
                user={user}
                name={name}
              />
            ))}
        </nav>
      </header>
    </>
  );
}
