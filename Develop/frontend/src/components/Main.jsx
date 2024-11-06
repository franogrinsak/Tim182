import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./pageLayout/Footer";
import Header from "./pageLayout/DashboardHeader";
import { useUser } from "./auth/UserContext";
import { resolveBackendPath } from "../util/paths";
import { USER_ROLES } from "../util/constants";

export default function Main() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  React.useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await fetch(resolveBackendPath("/logged"), {
          credentials: "include",
        });
        if (response.ok) {
          let data = await response.json();
          data = { ...data, firstName: "Lorem", lastName: "Ipsum" };
          setUser(data);

          // User signed in for the first time
          //if (data.roleId === USER_ROLES.NONE) navigate("/register");
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
        navigate("/login?message=Login to access this resource");
      }
    };

    checkUserSession();
  }, []);
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
