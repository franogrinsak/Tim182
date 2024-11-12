import React from "react";
import { Outlet } from "react-router-dom";
import TabNavigation from "./TabNavigation";
import { useUser } from "../auth/UserContext";
import { USER_ROLES } from "../../util/constants";
import ReturnButton from "../ReturnButton";

export default function CourtsLayout() {
  const { user } = useUser();

  return (
    <>
      {user?.roleId === USER_ROLES.PLAYER && (
        <ReturnButton link={"/app/courts/all"} text="Return to all courts" />
      )}
      <TabNavigation />
      <Outlet />
    </>
  );
}
