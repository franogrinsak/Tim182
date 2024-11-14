import React from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import Footer from "./pageLayout/Footer";
import Header from "./pageLayout/DashboardHeader";
import { useUser } from "./auth/UserContext";
import { USER_ROLES } from "../util/constants";
import { REGISTER } from "../util/paths";

export default function Main() {
  const { setUser } = useUser();
  const userData = useLoaderData();
  const navigate = useNavigate();

  // Call the use effect when user data from backend is updated.
  React.useEffect(() => {
    setUser(userData);
    if (
      userData.roleId === USER_ROLES.NONE ||
      userData.roleId === USER_ROLES.NEW_USER
    )
      navigate(REGISTER);
  }, [JSON.stringify(userData)]);

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
