import React from "react";
import { Outlet } from "react-router-dom";
import TabNavigation from "./TabNavigation";
import { useUser } from "../auth/UserContext";
import { USER_ROLES } from "../../util/constants";
import ReturnButton from "../ReturnButton";
import { COURTS } from "../../util/paths";

export default function CourtsLayout() {
  const { user } = useUser();

  return (
    <div className="h-full ">
      {user?.roleId === USER_ROLES.PLAYER && (
        <ReturnButton link={COURTS} text="Return to all courts" />
      )}
      <TabNavigation />
      <Outlet />
    </div>
  );
}
